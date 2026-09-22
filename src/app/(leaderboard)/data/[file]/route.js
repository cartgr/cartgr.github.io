// Static downloads of the leaderboard data, emitted at build time from the same file the page renders. The
// filenames derive from the benchmark name (lib/data.js DOWNLOADS), so renaming the benchmark renames them too.
import data from '../../leaderboard/data/leaderboard.json';
import { DOWNLOADS } from '../../leaderboard/lib/data';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: DOWNLOADS.json }, { file: DOWNLOADS.csv }];
}

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

function csv() {
  const lines = [COLUMNS.join(',')];
  for (const e of [...data.models, ...(data.ablations || []), ...data.baselines]) {
    for (const task of data.benchmark.tasks) {
      const r = e.results ? e.results[task] : null;
      if (!r && e.status === 'complete') continue;
      const row = {
        system_id: e.id, system: e.name, kind: e.kind, organization: e.org, status: e.status,
        condition: e.condition || (e.kind === 'baseline' ? '' : data.benchmark.condition), task,
        studies: r ? r.studies : '', is_reference: data.benchmark.reference[task] === e.id, cost_usd: e.cost_usd ?? '',
      };
      if (r) {
        for (const k of ['log_loss', 'brier', 'accuracy', 'ece', 'log_loss_floor', 'wins_log_loss', 'wins_accuracy']) row[k] = r[k];
        for (const s of SOURCES) row[`log_loss_${s}`] = r.by_source && r.by_source[s] ? r.by_source[s].log_loss : '';
      }
      lines.push(COLUMNS.map((c) => cell(row[c])).join(','));
    }
  }
  return `${lines.join('\n')}\n`;
}

export function GET(request, { params }) {
  if (params.file === DOWNLOADS.csv) {
    return new Response(csv(), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
  }
  return new Response(JSON.stringify(data, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
