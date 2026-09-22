// PrefBench leaderboard. A server component: every number is read from data/leaderboard.json at build time and
// rendered into the static HTML. Only the table (sorting, mobile task switch), the theme toggle and the copy button
// run on the client.
import data from './data/leaderboard.json';
import LeaderboardTable from './components/LeaderboardTable';
import { ScalingFigure, DotPlot } from './components/Figures';
import Wordmark from './components/Wordmark';
import ThemeToggle from './components/ThemeToggle';
import CopyButton from './components/CopyButton';
import Marker from './components/Marker';
import {
  NAME, VERSION, DESCRIPTOR, TASKS, SOURCE_LABELS, buildRows, complete, running, value, ranks, floorRanks,
  referenceRow, headline, fmt3, fmtPct, fmtSigned,
} from './lib/data';

const rows = buildRows(data);
const done = complete(rows);
const pending = running(rows);
const asOf = new Date(data.generated_at_utc).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const ranked = (task) => done.filter((r) => value(r, task, 'log_loss') !== null)
  .sort((a, b) => value(a, task, 'log_loss') - value(b, task, 'log_loss'));

const CALIBRATION_INSTRUCTION =
  'CALIBRATION: report genuine uncertainty, not a single best guess. Across many such predictions, outcomes you assign probability p should occur about p of the time. Reserve a near-zero probability only for an outcome you would be astonished to see.';

const PLATFORMS = [
  { id: 'polis', classes: 'agree · disagree · pass' },
  { id: 'global_dialogues', classes: 'agree · disagree · neutral' },
  { id: 'remesh', classes: 'agree · disagree' },
  { id: 'gsc', classes: '5- and 7-point rating scales' },
  { id: 'makeorg', classes: 'agree · disagree · neutral' },
];

const BIBTEX = `@misc{prefbench2026,
  title  = {${NAME}: ${DESCRIPTOR}},
  author = {TODO},
  year   = {2026},
  note   = {Preliminary leaderboard, ${VERSION}},
  url    = {https://cartgr.github.io/leaderboard/}
}`;

function studiesPerSource() {
  const astra = done.find((r) => r.kind !== 'baseline' && r.results.matrix_completion);
  const out = {};
  if (astra) for (const [s, v] of Object.entries(astra.results.matrix_completion.by_source || {})) out[s] = v.studies;
  return out;
}

function Section({ id, title, children, lead }) {
  return (
    <section id={id} className="scroll-mt-6 pt-12 md:pt-16">
      <h2 className="font-serif text-[24px] font-semibold leading-[30px] tracking-[-0.005em] text-ink">{title}</h2>
      {lead && <p className="mt-2 max-w-prose text-[15px] leading-[24px] text-ink2">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Claim() {
  const { parts, beat } = headline(rows, data);
  const ns = ranked('new_statement_prediction');
  const nsTop = ns[0];
  const nsRef = referenceRow(rows, data, 'new_statement_prediction');
  const sentences = [];
  if (parts.length) sentences.push(<>In preliminary results, {parts[0]}.</>);
  if (beat) {
    sentences.push(
      <>
        {' '}{beat.top.name} ranks first on matrix completion, ahead of a {beat.ref.name.toLowerCase()} fitted on the entire
        visible vote matrix: log loss <span className="num">{fmt3(beat.x)}</span> against <span className="num">{fmt3(beat.y)}</span>,
        lower in <span className="num">{beat.won}</span> of 32 studies.
      </>,
    );
  }
  if (nsTop && nsRef && nsTop.kind !== 'baseline') {
    const w = nsTop.results.new_statement_prediction.wins_log_loss;
    // Only claim the prior is the best classical method while the data still shows it.
    const bestBaseline = ns.find((r) => r.kind === 'baseline');
    const priorLeads = bestBaseline && bestBaseline.id === nsRef.id && /prior/.test(nsRef.id);
    const who = beat && beat.top.id === nsTop.id ? 'it' : nsTop.name;
    sentences.push(
      <>
        {' '}On new statements{priorLeads ? ', where no classical method beats a response-frequency prior,' : ''} {who} beats
        the reference in <span className="num">{w}</span> of 32 studies.
      </>,
    );
  }
  return <p className="max-w-[46rem] font-serif text-[19px] leading-[28px] text-ink md:text-[22px] md:leading-[31px]">{sentences}</p>;
}

function Facts() {
  const b = data.benchmark;
  const models = done.filter((r) => r.kind !== 'baseline').length;
  const baselines = done.filter((r) => r.kind === 'baseline').length;
  const items = [
    `${b.studies} studies`,
    `${Object.keys(SOURCE_LABELS).length} platforms`,
    `${b.cells.toLocaleString('en-US')} held-out responses`,
    `${b.people.toLocaleString('en-US')} people`,
    `${TASKS.length} tasks`,
    `${models} models and ${baselines} baselines${pending.length ? `, ${pending.length} more running` : ''}`,
  ];
  return (
    <p className="num mt-5 text-[14px] text-ink2">
      {items.map((it, i) => (
        <span key={it}>
          {i > 0 && <span aria-hidden="true" className="px-2 text-ink3">·</span>}
          {it}
        </span>
      ))}
    </p>
  );
}

function SourceTable({ task }) {
  const list = ranked(task.id);
  const counts = studiesPerSource();
  const sources = Object.keys(SOURCE_LABELS).filter((s) => list.some((r) => r.results[task.id].by_source[s]));
  const best = Object.fromEntries(
    sources.map((s) => [s, Math.min(...list.map((r) => r.results[task.id].by_source[s]?.log_loss ?? Infinity))]),
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse border-y-[1.5px] border-ink text-[14px]">
        <caption className="caption-top pb-2 text-left text-[13px] text-ink2">
          <span className="font-semibold text-ink">{task.label}.</span> Mean log loss ↓ within each platform.
        </caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="px-3 py-2 text-left font-semibold">System</th>
            {sources.map((s) => (
              <th key={s} scope="col" className="px-3 py-2 text-right font-semibold">
                <span className="block whitespace-nowrap">{SOURCE_LABELS[s]}</span>
                <span className="num block text-[12px] font-normal text-ink3">{counts[s]} {counts[s] === 1 ? 'study' : 'studies'}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className={`border-b border-rule ${r.reference[task.id] ? 'bg-tint' : ''}`}>
              <th scope="row" className={`px-3 py-2 text-left font-normal ${r.kind === 'baseline' ? 'text-ink2' : 'text-ink'}`}>
                <span className="inline-flex items-center gap-2">
                  <Marker kind={r.kind} />
                  {r.name}
                  {r.reference[task.id] && <span className="text-[11px] uppercase tracking-[0.04em] text-ink3">reference</span>}
                </span>
              </th>
              {sources.map((s) => {
                const v = r.results[task.id].by_source[s]?.log_loss;
                return (
                  <td key={s} className={`num px-3 py-2 text-right ${v === best[s] ? 'font-semibold text-ink' : 'text-ink2'}`}>
                    {fmt3(v ?? null)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FloorTable({ task }) {
  const list = ranked(task.id);
  const raw = ranks(done, task.id);
  const fl = floorRanks(done, task.id);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse border-y-[1.5px] border-ink text-[14px]">
        <caption className="caption-top pb-2 text-left text-[13px] text-ink2">
          <span className="font-semibold text-ink">{task.label}.</span> Calibration error, and log loss with every
          probability floored at 0.01 and renormalized.
        </caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="px-3 py-2 text-left font-semibold">System</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">ECE ↓</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Log loss ↓</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Floored ↓</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Change</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Rank change</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => {
            const res = r.results[task.id];
            const d = typeof res.log_loss_floor === 'number' ? res.log_loss_floor - res.log_loss : null;
            const rc = fl[r.id] && raw[r.id] ? raw[r.id] - fl[r.id] : null;
            return (
              <tr key={r.id} className={`border-b border-rule ${r.reference[task.id] ? 'bg-tint' : ''}`}>
                <th scope="row" className={`px-3 py-2 text-left font-normal ${r.kind === 'baseline' ? 'text-ink2' : 'text-ink'}`}>
                  <span className="inline-flex items-center gap-2"><Marker kind={r.kind} />{r.name}</span>
                </th>
                <td className="num px-3 py-2 text-right text-ink2">{fmt3(res.ece)}</td>
                <td className="num px-3 py-2 text-right text-ink">{fmt3(res.log_loss)}</td>
                <td className="num px-3 py-2 text-right text-ink2">{fmt3(res.log_loss_floor ?? null)}</td>
                <td className="num px-3 py-2 text-right text-ink2">
                  {d === null ? '—' : `${d < 0 ? '−' : '+'}${Math.abs(d).toFixed(3)}`}
                </td>
                <td className="num px-3 py-2 text-right text-ink2">{rc === null ? '—' : fmtSigned(rc)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ConditionTable() {
  const base = (data.ablations || []).find((a) => a.condition === 'base' && a.status === 'complete');
  const cal = data.models.find((m) => m.id === 'gpt-5.6-luna' && m.status === 'complete');
  if (!base || !cal) return null;
  const pairs = [['Without instruction', base], ['With calibration instruction', cal]];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse border-y-[1.5px] border-ink text-[14px]">
        <caption className="caption-top pb-2 text-left text-[13px] text-ink2">
          <span className="font-semibold text-ink">GPT-5.6 Luna under both prompt conditions.</span> Identical evidence;
          the only difference is one appended instruction.
        </caption>
        <thead>
          <tr>
            <th scope="col" rowSpan={2} className="px-3 pb-2 pt-2 text-left align-bottom font-semibold">Condition</th>
            {TASKS.map((t) => (
              <th key={t.id} scope="colgroup" colSpan={3} className="px-3 pt-2 md:pl-6">
                <span className="block border-b border-ink pb-1 text-left font-semibold">{t.label}</span>
              </th>
            ))}
          </tr>
          <tr className="border-b border-ink">
            {TASKS.map((t) => ['Log loss ↓', 'Accuracy ↑', 'ECE ↓'].map((h, i) => (
              <th key={`${t.id}-${h}`} scope="col" className={`px-3 pb-2 pt-1 text-right text-[13px] font-semibold ${i === 0 ? 'md:pl-6' : ''}`}>{h}</th>
            )))}
          </tr>
        </thead>
        <tbody>
          {pairs.map(([label, m]) => (
            <tr key={label} className="border-b border-rule">
              <th scope="row" className="px-3 py-2 text-left font-normal text-ink">{label}</th>
              {TASKS.map((t) => {
                const r = m.results[t.id];
                return [
                  <td key={`${t.id}-ll`} className="num px-3 py-2 text-right text-ink md:pl-6">{fmt3(r.log_loss)}</td>,
                  <td key={`${t.id}-acc`} className="num px-3 py-2 text-right text-ink2">{fmtPct(r.accuracy)}</td>,
                  <td key={`${t.id}-ece`} className="num px-3 py-2 text-right text-ink2">{fmt3(r.ece)}</td>,
                ];
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const NAV = [['#results', 'Results'], ['#method', 'Method'], ['#limitations', 'Limitations'], ['#data', 'Data'], ['#cite', 'Cite']];

export default function LeaderboardPage() {
  const refMC = referenceRow(rows, data, 'matrix_completion');
  const refNS = referenceRow(rows, data, 'new_statement_prediction');
  const counts = studiesPerSource();
  return (
    <div className="mx-auto max-w-page px-4 pb-20 md:px-8">
      <header className="flex items-center justify-between gap-4 border-b border-rule py-4">
        <a href="#top" className="focus-ring rounded-sm" aria-label={`${NAME} leaderboard`}>
          <Wordmark />
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1 text-[14px] text-ink2 md:gap-3">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="focus-ring hidden rounded-sm px-1.5 py-1 hover:text-ink sm:inline">
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <div className="pt-10 md:pt-14">
          <h1 className="max-w-[40rem] font-serif text-[30px] font-semibold leading-[36px] tracking-[-0.01em] text-ink md:text-[40px] md:leading-[46px]">
            {DESCRIPTOR}
          </h1>
          <p className="mt-3 text-[13px] text-ink3">
            <span className="font-semibold uppercase tracking-[0.06em] text-ink2">Preliminary</span>
            <span aria-hidden="true" className="px-2">·</span>
            {NAME} {VERSION}
            <span aria-hidden="true" className="px-2">·</span>
            Results as of {asOf}
            <span aria-hidden="true" className="px-2">·</span>
            <a href="#changelog" className="focus-ring rounded-sm underline decoration-rule underline-offset-2 hover:text-ink">Changelog</a>
          </p>
          <div className="mt-8">
            <Claim />
            <Facts />
          </div>
        </div>

        <Section id="results" title="Leaderboard">
          <LeaderboardTable rows={rows} />
          <div className="prose-lb mt-4 max-w-prose space-y-1.5 text-[13px] leading-[20px] text-ink2">
            <p>
              <span className="inline-flex items-center gap-1.5 align-middle"><Marker kind="closed" /> API model</span>
              <span className="px-2 text-ink3">·</span>
              <span className="inline-flex items-center gap-1.5 align-middle"><Marker kind="open" /> open-weight model</span>
              <span className="px-2 text-ink3">·</span>
              <span className="inline-flex items-center gap-1.5 align-middle"><Marker kind="baseline" /> classical baseline</span>
            </p>
            <p>
              The reference for each task is fixed in advance as the classical baseline with the lowest log loss on that
              task: {refMC ? refMC.name.toLowerCase() : 'TODO'} for matrix completion and {refNS ? refNS.name.toLowerCase() : 'TODO'} for
              new-statement prediction. A reference row shows “—” under Won.
            </p>
            <p>
              Classical baselines are fitted on every visible response in a study. Language models see one shared study
              context, which for large studies is a random sample of participants (always including the person being
              predicted). “—” in a task’s columns means the method does not apply to that task.
            </p>
            <p>
              Cost is the list-price API spend for the full batch of {data.benchmark.cells.toLocaleString('en-US')} predictions,
              including retried requests. Open-weight models run on a university cluster and baselines on CPUs, so
              neither has an API cost.
            </p>
          </div>
        </Section>

        <Section
          id="scaling"
          title="Scaling"
          lead="Log loss for each model family, smallest to largest, against the task’s reference (dashed). Families are placed by size tier; the horizontal axis is not a parameter count."
        >
          <ScalingFigure rows={done} data={data} />
        </Section>

        <Section id="breakdowns" title="Breakdowns">
          <h3 className="text-[15px] font-semibold text-ink">All systems</h3>
          <p className="mt-1 max-w-prose text-[14px] leading-[22px] text-ink2">Log loss on each task, with the reference as a dashed line.</p>
          <div className="mt-4"><DotPlot rows={done} data={data} /></div>

          <h3 className="mt-12 text-[15px] font-semibold text-ink">By platform</h3>
          <p className="mt-1 max-w-prose text-[14px] leading-[22px] text-ink2">
            Platforms differ in their response scales, so their log losses are not comparable with each other; compare
            systems within a column.
          </p>
          <div className="mt-4 space-y-8">{TASKS.map((t) => <SourceTable key={t.id} task={t} />)}</div>

          <h3 className="mt-12 text-[15px] font-semibold text-ink">Calibration and the probability floor</h3>
          <p className="mt-1 max-w-prose text-[14px] leading-[22px] text-ink2">
            Log loss punishes a confident miss without limit. As a declared sensitivity analysis, every system’s
            probabilities are floored at 0.01 and renormalized, identically for models and baselines. Raw scores remain
            the primary result. A large change means the raw score was driven by a few near-certain wrong answers.
          </p>
          <div className="mt-4 space-y-8">{TASKS.map((t) => <FloorTable key={t.id} task={t} />)}</div>

          <h3 className="mt-12 text-[15px] font-semibold text-ink">Prompt condition</h3>
          <p className="mt-1 max-w-prose text-[14px] leading-[22px] text-ink2">
            Every model is evaluated under one declared prompt. It was chosen on GPT-5.6 Luna, before any other model ran,
            by a rule fixed in advance: adopt the calibration instruction only if it improved raw log loss by at least 0.02
            on a task and worsened neither.
          </p>
          <div className="mt-4"><ConditionTable /></div>
        </Section>

        <Section id="method" title="Method">
          <div className="prose-lb max-w-prose space-y-4 text-[16px] leading-[26px] text-ink2">
            <h3 className="text-[15px] font-semibold text-ink">Tasks</h3>
            <p>
              <span className="font-semibold text-ink">Matrix completion.</span> A participant’s recorded response to a
              statement is hidden, and the system predicts it from what else the study permits, including other
              participants’ responses to that statement.
            </p>
            <p>
              <span className="font-semibold text-ink">New-statement prediction.</span> A statement, together with its
              aliases, is hidden for everyone. The system sees the statement’s text but no responses to it, and predicts
              how each selected participant responded.
            </p>
            <p>
              Both tasks score a full probability distribution over the platform’s own response classes, not a single
              guess.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-ink">Data</h3>
          </div>
          <div className="mt-3 max-w-[40rem] overflow-x-auto">
            <table className="w-full border-collapse border-y-[1.5px] border-ink text-[14px]">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="px-3 py-2 text-left font-semibold">Platform</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">Studies</th>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">Response classes</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => (
                  <tr key={p.id} className="border-b border-rule">
                    <th scope="row" className="px-3 py-2 text-left font-normal text-ink">{SOURCE_LABELS[p.id]}</th>
                    <td className="num px-3 py-2 text-right text-ink2">{counts[p.id] ?? '—'}</td>
                    <td className="px-3 py-2 text-ink2">{p.classes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose-lb mt-4 max-w-prose space-y-4 text-[16px] leading-[26px] text-ink2">
            <p>
              For each study and task, up to 32 participants are drawn uniformly at random, and for each of them up to
              eight hidden responses to one question (every eligible response in the two Generative Social Choice studies).
              That gives {data.benchmark.cells.toLocaleString('en-US')} held-out responses from{' '}
              {data.benchmark.people.toLocaleString('en-US')} people across {data.benchmark.scopes} study–task pairs.
              The split, the sampling seed and every hidden response were fixed before any model was run.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-ink">Scoring</h3>
            <p>
              Each prediction is scored against the recorded response by <span className="text-ink">log loss</span>{' '}
              (negative log probability of the recorded class), the multi-class <span className="text-ink">Brier score</span>{' '}
              (squared error summed over classes, 0 to 2) and <span className="text-ink">accuracy</span> (whether the most
              probable class is the recorded one). Scores are averaged within each person’s question, then over that
              person’s questions, then over people within a study. The table reports the mean over studies, so every study
              counts equally regardless of size. Calibration error is the ten-bin, class-averaged expected calibration error.
            </p>
            <p>
              Across-study results are descriptive means and win counts. No confidence intervals are shown, because none
              have been declared for these summaries. <span className="text-ink">Won</span> is the number of studies in which
              a system’s log loss is below the reference’s.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-ink">How language models are evaluated</h3>
            <p>
              Each request is one user message: the whole study as JSON (every question, statement, visible response and
              authored text), followed by a short block naming the person and the statements to predict. Studies too large
              for the context window are represented by a seeded random sample of participants, and the person being
              predicted always has their own full record in the request. There is no system prompt, no worked example and
              no demographic information. The model returns one probability distribution per hidden statement. Every model
              receives the same inputs.
            </p>
            <p>The declared prompt appends one instruction to each request:</p>
            <blockquote className="border-l-2 border-rule pl-4 font-serif text-[16px] italic leading-[25px] text-ink">
              {CALIBRATION_INSTRUCTION}
            </blockquote>
            <p>
              API models run at low reasoning effort with the provider’s default temperature, open-weight models with their
              published default sampling settings, and each person is predicted once.
              A distribution whose probabilities sum to within 0.005 of one is renormalized and the repair recorded.
              A reply with no usable probabilities is re-sampled up to three times. A model is scored only when every one of
              its {data.benchmark.cells.toLocaleString('en-US')} predictions is valid.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-ink">Baselines</h3>
            <p>
              Classical methods are fitted separately to each study, on every visible response in it. They range from
              response-frequency priors through neighbourhood methods to a low-rank categorical matrix factorization.
              Fits that fail a size-aware convergence test are reported as missing rather than scored.
            </p>
          </div>
        </Section>

        <Section id="limitations" title="Limitations">
          <div className="prose-lb max-w-prose space-y-4 text-[16px] leading-[26px] text-ink2">
            <p>
              <span className="font-semibold text-ink">Pretraining contamination.</span> All 32 studies are public
              datasets, and the models may have seen them, including participants’ recorded responses, during pretraining.
              No check has yet been run to rule this out. Specifically, no evaluation has been restricted to studies
              released after each model’s training cutoff, and the benchmark’s held-out-study split has been built but not
              yet scored. If the models’ advantage over the classical baselines shrinks on post-cutoff studies or on
              held-out studies, the results here reflect recall of released data rather than prediction.
            </p>
            <p>
              <span className="font-semibold text-ink">Unequal evidence.</span> Classical baselines are fitted on every
              visible response in a study, while language models see a sample of participants in large studies. This
              favours the baselines; it does not favour the models.
            </p>
            <p>
              <span className="font-semibold text-ink">One prompt.</span> The prompt was selected on one model, so the
              comparison between models is like for like, but no result here should be read as any model’s best achievable score.
            </p>
            <p>
              <span className="font-semibold text-ink">Scope.</span> Results cover one fixed split of each study, and
              predictions within the same session. Who saw which statement was decided by each platform, not at random.
              Costs are list prices, not invoices.
            </p>
          </div>
        </Section>

        <Section id="data" title="Data">
          <div className="prose-lb max-w-prose space-y-3 text-[16px] leading-[26px] text-ink2">
            <p>
              Every number on this page is generated from the benchmark’s frozen score files. The same results can be
              downloaded as <a href="/data/prefbench-leaderboard.json" className="text-ink">JSON</a> or{' '}
              <a href="/data/prefbench-leaderboard.csv" className="text-ink">CSV</a>, including per-platform means and
              floored scores.
            </p>
            <p className="text-[14px] text-ink3">Licence: TODO. Code and paper: TODO.</p>
          </div>
        </Section>

        <Section id="cite" title="Cite">
          <div className="max-w-[40rem]">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <span className="text-[13px] text-ink3">BibTeX (authors to be confirmed)</span>
              <CopyButton text={BIBTEX} />
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-[20px] text-ink2">{BIBTEX}</pre>
          </div>
        </Section>

        <Section id="changelog" title="Changelog">
          <ul className="max-w-prose space-y-2 text-[15px] leading-[24px] text-ink2">
            <li>
              <span className="num font-semibold text-ink">{asOf}</span> · {VERSION}, preliminary.{' '}
              {done.filter((r) => r.kind !== 'baseline').length} models and {done.filter((r) => r.kind === 'baseline').length}{' '}
              classical baselines scored{pending.length ? `; ${pending.length} open-weight models in progress` : ''}.
            </li>
          </ul>
        </Section>
      </main>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-[13px] text-ink3">
        <Wordmark />
        <span>
          Hosted by <a href="/" className="focus-ring rounded-sm underline decoration-rule underline-offset-2 hover:text-ink">Carter Blair</a>
        </span>
      </footer>
    </div>
  );
}
