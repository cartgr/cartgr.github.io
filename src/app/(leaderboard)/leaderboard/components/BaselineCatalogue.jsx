// Baselines section: every classical method, grouped by family, from the curated descriptions in lib/baselines.js.
// A method the exporter adds without a curated entry falls back to the exporter's name and one-line description.
// No scores appear here; methods not yet in the exported data are described and marked as such.
import Marker from './Marker';
import { BASELINES, FAMILIES, FALLBACK_NAMES, anchorFor } from '../lib/baselines';
import { TASKS } from '../lib/data';

function status(row) {
  if (!row || row.status !== 'complete') return { label: 'Not yet in the leaderboard', tone: 'text-ink3' };
  const full = TASKS.filter((t) => row.coverage[t.id] === 'full').map((t) => t.label.toLowerCase());
  const partial = TASKS.filter((t) => row.coverage[t.id] === 'partial');
  const parts = [];
  if (full.length) parts.push(`In the leaderboard: ${full.join(' and ')}`);
  for (const t of partial) parts.push(`${t.label}: ${row.results[t.id].studies} of 32 studies`);
  return parts.length ? { label: parts.join(' · '), tone: 'text-ink2' } : { label: 'Not yet in the leaderboard', tone: 'text-ink3' };
}

function Entry({ id, info, row }) {
  const name = (row && row.name) || FALLBACK_NAMES[id] || id;
  const st = status(row);
  const refTasks = row ? TASKS.filter((t) => row.reference[t.id]) : [];
  return (
    <article id={anchorFor(id)} className="scroll-mt-6 border-t border-rule py-5 md:grid md:grid-cols-[15rem_1fr] md:gap-8">
      <div>
        <h4 className="flex items-start gap-2 text-[16px] font-semibold leading-snug text-ink">
          <span className="mt-[5px]"><Marker kind="baseline" /></span>
          <span>{name}</span>
        </h4>
        <p className="mt-1 font-mono text-[12px] text-ink3">{id}</p>
        {refTasks.map((t) => (
          <p key={t.id} className="mt-2">
            <span className="rounded-sm border border-rule px-1.5 text-[11px] uppercase tracking-[0.04em] text-ink3">
              reference · {t.short.toLowerCase()}
            </span>
          </p>
        ))}
      </div>
      <div className="mt-3 max-w-prose md:mt-0">
        {info ? (
          <>
            <p className="text-[13px] text-ink3">
              {info.evidence}
              <span aria-hidden="true" className="px-1.5">·</span>
              {info.tasks}
              {info.encoder && (
                <>
                  <span aria-hidden="true" className="px-1.5">·</span>
                  needs a sentence encoder
                </>
              )}
            </p>
            <p className="mt-2 text-[15px] leading-[24px] text-ink2">{info.what}</p>
            <p className="mt-2 text-[14px] leading-[22px] text-ink2">
              <span className="font-semibold text-ink">Fitting.</span> {info.fit}
            </p>
            {info.cite && info.cite.length > 0 && (
              <p className="mt-2 text-[13px] text-ink3">
                {info.cite.map((c, i) => (
                  <span key={c.href}>
                    {i > 0 && '; '}
                    <a href={c.href} className="underline decoration-rule underline-offset-2 hover:text-ink" rel="noopener noreferrer">
                      {c.label}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </>
        ) : (
          <p className="text-[15px] leading-[24px] text-ink2">{(row && row.description) || 'Description to follow.'}</p>
        )}
        <p className={`mt-2 text-[13px] ${st.tone}`}>{st.label}</p>
      </div>
    </article>
  );
}

export default function BaselineCatalogue({ rows }) {
  const baselineRows = Object.fromEntries(rows.filter((r) => r.kind === 'baseline').map((r) => [r.id, r]));
  const uncurated = Object.keys(baselineRows).filter((id) => !BASELINES[id]);
  const groups = FAMILIES.map((f) => ({ ...f, ids: Object.keys(BASELINES).filter((id) => BASELINES[id].family === f.id) }));
  if (uncurated.length) groups.push({ id: 'other', label: 'Other methods', blurb: '', ids: uncurated });
  return (
    <div>
      <div className="prose-lb max-w-prose space-y-3 text-[15px] leading-[24px] text-ink2">
        <p>
          Where a method has more than one candidate setting, such as two penalty strengths, the setting with the lower log
          loss on a validation split of the visible responses is chosen and the method is refitted on all of them. Factor
          models must pass a size-aware convergence test: the largest gradient component must fall below
          max(10⁻⁴, 10⁻⁸ × the number of visible responses), which is never looser than a fixed 10⁻⁴ below 10,000
          responses. A fit that fails it, even after warm restarts, is recorded as missing rather than scored. No method
          uses demographic information. Methods marked as needing a sentence encoder use fixed vectors from one pinned
          encoder, recorded with their results; no other method uses a pretrained model.
        </p>
      </div>
      <nav aria-label="Baseline families" className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink2">
        {groups.map((g) => (
          <a key={g.id} href={`#family-${g.id}`} className="underline decoration-rule underline-offset-2 hover:text-ink">
            {g.label}
          </a>
        ))}
      </nav>
      {groups.map((g) => (
        <section key={g.id} id={`family-${g.id}`} className="scroll-mt-6 pt-10">
          <h3 className="font-serif text-[19px] font-semibold text-ink">{g.label}</h3>
          {g.blurb && <p className="mt-1 max-w-prose text-[14px] leading-[22px] text-ink2">{g.blurb}</p>}
          <div className="mt-4 border-b border-rule">
            {g.ids.map((id) => (
              <Entry key={id} id={id} info={BASELINES[id]} row={baselineRows[id]} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
