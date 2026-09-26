'use client';

import { useMemo, useState } from 'react';
import Marker, { KIND_LABEL } from './Marker';
import { TASKS, METRICS, value, ranks, bests, formatMetric, fmtCost } from '../lib/data';
import { anchorFor } from '../lib/baselines';

const DIR = Object.fromEntries(METRICS.map((m) => [m.key, m.better]));
DIR.cost = 'lower';

const FEATURED_BASELINES = new Set([
  'selected_prior',
  'categorical_mf',
  'embedding_conditional_logistic',
  'stump_native_categorical_v2',
]);

function sortRows(list, sort, rank) {
  const read = (r) => (sort.key === 'cost' ? r.cost : value(r, sort.task, sort.key));
  const ascending = (DIR[sort.key] === 'lower') === (sort.dir === 'best');
  return [...list].sort((a, b) => {
    const va = read(a);
    const vb = read(b);
    if (va === null && vb === null) return (rank[a.id] || 1e9) - (rank[b.id] || 1e9);
    if (va === null) return 1;
    if (vb === null) return -1;
    if (va !== vb) return ascending ? va - vb : vb - va;
    return (rank[a.id] || 1e9) - (rank[b.id] || 1e9);
  });
}

function MetricCell({ row, task, metric, best, hideOnMobile, first }) {
  const cov = row.coverage[task];
  const r = row.results[task];
  const isRef = row.reference[task];
  const base = `num px-3 py-2.5 text-right align-top ${first ? 'pl-6 md:pl-8' : ''} ${hideOnMobile ? 'hidden md:table-cell' : ''}`;
  if (metric.key === 'wins_log_loss' && isRef) {
    return <td className={`${base} text-ink3`}>—</td>;
  }
  if (!r || r[metric.key] === undefined || r[metric.key] === null) {
    return <td className={`${base} text-ink3`}>—</td>;
  }
  const v = r[metric.key];
  const text = formatMetric(metric.key, v);
  const isBest = cov === 'full' && best !== undefined && v === best;
  // A best value is bold and full ink even in a secondary column; otherwise primary metrics are ink, the rest ink-2.
  const tone = isBest ? 'font-semibold text-ink' : metric.primary ? 'text-ink' : 'text-ink2';
  return (
    <td className={`${base} ${tone}`}>
      {text}
      {cov === 'partial' && (
        <span className="ml-1 text-[11px] text-ink3" title={`Evaluated on ${r.studies} of 32 studies`}>
          {r.studies}/32
        </span>
      )}
    </td>
  );
}

function ModelCell({ row, sticky, rowBg, activeTask }) {
  const refTasks = TASKS.filter((t) => row.reference[t.id]);
  return (
    <td className={`min-w-[10.5rem] px-3 py-2.5 align-top md:min-w-0 ${sticky} ${rowBg}`}>
      <div className="flex items-start gap-2">
        <span className="mt-[7px]" title={KIND_LABEL[row.kind]}>
          <Marker kind={row.kind} />
        </span>
        <div className="min-w-0">
          <div className={`leading-snug ${row.kind === 'baseline' ? 'text-ink2' : 'font-semibold text-ink'}`}>
            {row.kind === 'baseline' ? (
              <a href={`#${anchorFor(row.id)}`} className="focus-ring rounded-sm hover:text-ink hover:underline">
                {row.name}
              </a>
            ) : (
              row.name
            )}
            {refTasks.map((t) => (
              <span
                key={t.id}
                className={`ml-2 rounded-sm border border-rule px-1.5 align-[1px] text-[11px] font-normal uppercase tracking-[0.04em] text-ink3 ${
                  t.id === activeTask ? 'inline-block' : 'hidden md:inline-block'
                }`}
              >
                reference<span className="hidden md:inline"> · {t.short.toLowerCase()}</span>
              </span>
            ))}
          </div>
          <div className="text-[12px] leading-snug text-ink3">
            <span className="sr-only">{KIND_LABEL[row.kind]}. </span>
            <span className="md:hidden">{row.subtitleShort}</span>
            <span className="hidden md:inline">{row.subtitle}</span>
          </div>
        </div>
      </div>
    </td>
  );
}

export default function LeaderboardTable({ rows }) {
  const [showAllBaselines, setShowAllBaselines] = useState(false);
  const [rankTask, setRankTask] = useState(TASKS[0].id);
  const [sort, setSort] = useState({ key: 'log_loss', task: TASKS[0].id, dir: 'best' });

  const done = useMemo(() => rows.filter((r) => r.status === 'complete'), [rows]);
  const pending = useMemo(() => rows.filter((r) => r.status !== 'complete'), [rows]);
  const rank = useMemo(() => ranks(done, rankTask), [done, rankTask]);
  const best = useMemo(() => bests(done), [done]);
  const ranked = done.filter((r) => TASKS.some((t) => r.coverage[t.id] === 'full'));
  const visible = ranked.filter((r) => showAllBaselines || r.kind !== 'baseline' || FEATURED_BASELINES.has(r.id));
  const ordered = sortRows(visible, sort, rank);

  const onSort = (task, key) => {
    const same = sort.key === key && sort.task === task;
    if (key === 'log_loss' && task) setRankTask(task);
    setSort({ key, task, dir: same && sort.dir === 'best' ? 'worst' : 'best' });
  };
  const chooseTask = (task) => {
    setRankTask(task);
    setSort({ key: 'log_loss', task, dir: 'best' });
  };
  const ariaSort = (task, key) => {
    if (sort.key !== key || sort.task !== task) return 'none';
    const ascending = (DIR[key] === 'lower') === (sort.dir === 'best');
    return ascending ? 'ascending' : 'descending';
  };
  const hideTask = (task) => task !== rankTask;
  const captionText = `Equal-study mean over the 32 studies of each task. ↓ lower is better, ↑ higher is better. Won counts studies where a system’s log loss is below the task’s reference. Rank orders systems by log loss on ${TASKS.find((t) => t.id === rankTask).label.toLowerCase()}; select any header to sort. Ranks and bold values use all eligible systems, including hidden baselines.`;
  const colCount = 3 + TASKS.length * METRICS.length;

  const header = (task, m, i) => (
    <th
      key={`${task}-${m.key}`}
      scope="col"
      aria-sort={ariaSort(task, m.key)}
      className={`px-3 pb-2 pt-1 text-right align-bottom font-semibold ${i === 0 ? 'pl-6 md:pl-8' : ''} ${hideTask(task) ? 'hidden md:table-cell' : ''}`}
    >
      <button
        type="button"
        onClick={() => onSort(task, m.key)}
        className="focus-ring ml-auto inline-flex flex-col items-end rounded-sm text-[13px] text-ink hover:text-ink2"
      >
        <span className="whitespace-nowrap">
          {m.label}
          <span aria-hidden="true" className="ml-0.5 text-ink3">{m.better === 'lower' ? '↓' : '↑'}</span>
          <span className="sr-only">{m.better === 'lower' ? ', lower is better' : ', higher is better'}</span>
        </span>
        <span className="text-[12px] font-normal text-ink3">{m.unit || ' '}</span>
      </button>
    </th>
  );

  const row = (r, group) => {
    const tinted = r.reference[rankTask];
    const rowBg = tinted ? 'bg-tint' : 'bg-paper';
    const rk = group === 'ranked' ? rank[r.id] : null;
    return (
      <tr key={r.id} data-system-id={r.id} className={`border-b border-rule text-[15px] transition-colors duration-100 hover:bg-tint ${tinted ? 'bg-tint' : ''}`}>
        <td className={`num sticky left-0 w-12 px-3 py-2.5 text-right align-top text-ink3 md:static ${rowBg}`}>
          {rk || '—'}
        </td>
        <ModelCell row={r} sticky="sticky left-12 md:static" rowBg={rowBg} activeTask={rankTask} />
        {group === 'pending' ? (
          <td colSpan={colCount - 3} className="px-3 py-2.5 align-top text-[14px] text-ink3">
            Running · results pending
          </td>
        ) : (
          <>
            {TASKS.map((t) =>
              METRICS.map((m, i) => (
                <MetricCell
                  key={`${t.id}-${m.key}`}
                  row={r}
                  task={t.id}
                  metric={m}
                  best={best[t.id] ? best[t.id][m.key] : undefined}
                  hideOnMobile={hideTask(t.id)}
                  first={i === 0}
                />
              )),
            )}
            <td className="num px-3 py-2.5 pl-6 text-right align-top text-ink2 md:pl-8">{fmtCost(r.cost)}</td>
          </>
        )}
      </tr>
    );
  };

  const groupHeader = (label, note) => (
    <tr key={`group-${label}`}>
      <th scope="rowgroup" colSpan={colCount} className="border-b border-rule px-3 pb-2 pt-6 text-left text-[13px] font-semibold text-ink">
        {label}
        {note && <span className="ml-2 font-normal text-ink3">{note}</span>}
      </th>
    </tr>
  );

  return (
    <div>
      <div className="mb-4 inline-flex rounded-sm border border-rule p-0.5 md:hidden" role="group" aria-label="Task">
        {TASKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => chooseTask(t.id)}
            aria-pressed={rankTask === t.id}
            className={`focus-ring rounded-sm px-3 py-1.5 text-[13px] ${rankTask === t.id ? 'bg-ink text-paper' : 'text-ink2'}`}
          >
            {t.short}
          </button>
        ))}
      </div>
      <p className="pb-3 text-[13px] leading-relaxed text-ink2" aria-hidden="true">
        <span className="font-semibold text-ink">Table 1.</span> {captionText}
      </p>
      <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-[13px] leading-relaxed text-ink2">
          Featured baselines: response prior, matrix factorization, embedding logistic, and STUMP.
          Matrix factorization and embedding logistic were selected for their observed performance on the two tasks;
          response prior is a simple reference, and STUMP is a published-method comparison.
          The breakdown figures include all full-coverage baselines; downloads also include partial-coverage results.
        </p>
        <button
          type="button"
          aria-expanded={showAllBaselines}
          aria-controls="leaderboard-table"
          onClick={() => setShowAllBaselines((show) => !show)}
          className="focus-ring shrink-0 rounded-sm border border-rule px-3 py-2 text-[13px] text-ink hover:bg-tint"
        >
          {showAllBaselines ? 'Show featured baselines' : 'Show all baselines'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table id="leaderboard-table" className="w-full border-collapse border-y-[1.5px] border-ink text-left">
          <caption className="sr-only">Table 1. {captionText}</caption>
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className="sticky left-0 w-12 bg-paper px-3 pb-2 pt-3 text-right align-bottom text-[13px] font-semibold md:static">
                Rank
              </th>
              <th scope="col" rowSpan={2} className="sticky left-12 bg-paper px-3 pb-2 pt-3 align-bottom text-[13px] font-semibold md:static">
                System
              </th>
              {TASKS.map((t) => (
                <th
                  key={t.id}
                  scope="colgroup"
                  colSpan={METRICS.length}
                  className={`px-3 pl-6 pt-3 md:pl-8 ${hideTask(t.id) ? 'hidden md:table-cell' : ''}`}
                >
                  <span className="block border-b border-ink pb-1 text-left text-[13px] font-semibold text-ink">{t.label}</span>
                </th>
              ))}
              <th
                scope="col"
                rowSpan={2}
                aria-sort={sort.key === 'cost' ? (sort.dir === 'best' ? 'ascending' : 'descending') : 'none'}
                className="px-3 pb-2 pl-6 pt-3 text-right align-bottom text-[13px] font-semibold md:pl-8"
              >
                <button
                  type="button"
                  onClick={() => onSort(null, 'cost')}
                  className="focus-ring ml-auto inline-flex flex-col items-end rounded-sm hover:text-ink2"
                >
                  <span>Cost</span>
                  <span className="text-[12px] font-normal text-ink3">USD</span>
                </button>
              </th>
            </tr>
            <tr className="border-b border-ink">{TASKS.map((t) => METRICS.map((m, i) => header(t.id, m, i)))}</tr>
          </thead>
          <tbody>
            {ordered.map((r) => row(r, 'ranked'))}
            {pending.length > 0 && groupHeader('In progress', `${pending.length} model${pending.length === 1 ? '' : 's'}`)}
            {pending.map((r) => row(r, 'pending'))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
