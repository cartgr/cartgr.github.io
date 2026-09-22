// Static CSV of the leaderboard: one row per system and task, generated at build time from the page's data file.
import data from '../../leaderboard/data/leaderboard.json';

export const dynamic = 'force-static';

const SOURCES = ['polis', 'global_dialogues', 'remesh', 'gsc', 'makeorg'];
const COLUMNS = [
  'system_id', 'system', 'kind', 'organization', 'status', 'condition', 'task', 'studies', 'is_reference',
  'log_loss', 'brier', 'accuracy', 'ece', 'log_loss_floor', 'wins_log_loss', 'wins_accuracy', 'cost_usd',
  ...SOURCES.map((s) => `log_loss_${s}`),
];

const cell = (v) => {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function GET() {
  const lines = [COLUMNS.join(',')];
  const entries = [...data.models, ...(data.ablations || []), ...data.baselines];
  for (const e of entries) {
    for (const task of data.benchmark.tasks) {
      const r = e.results ? e.results[task] : null;
      if (!r && e.status === 'complete') continue;
      const row = {
        system_id: e.id, system: e.name, kind: e.kind, organization: e.org, status: e.status,
        condition: e.condition || (e.kind === 'baseline' ? '' : data.benchmark.condition), task,
        studies: r ? r.studies : '', is_reference: data.benchmark.reference[task] === e.id,
        cost_usd: e.cost_usd ?? '',
      };
      if (r) {
        for (const k of ['log_loss', 'brier', 'accuracy', 'ece', 'log_loss_floor', 'wins_log_loss', 'wins_accuracy']) row[k] = r[k];
        for (const s of SOURCES) row[`log_loss_${s}`] = r.by_source && r.by_source[s] ? r.by_source[s].log_loss : '';
      }
      lines.push(COLUMNS.map((c) => cell(row[c])).join(','));
    }
  }
  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
}
