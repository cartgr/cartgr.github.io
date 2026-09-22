// Pure data helpers for the PrefBench leaderboard, shared by server and client components.
// Every number shown on the page comes from data/leaderboard.json, which is exported from the frozen score
// artifacts by scripts/whole_study/export_leaderboard_v1.py in the benchmark repository.

export const NAME = 'PrefBench'; // Working name; change here to rename the benchmark everywhere.
export const VERSION = 'v0.1';
export const DESCRIPTOR = 'Predicting how real people respond in public deliberations';

export const TASKS = [
  { id: 'matrix_completion', label: 'Matrix completion', short: 'Completion' },
  { id: 'new_statement_prediction', label: 'New-statement prediction', short: 'New statements' },
];

export const SOURCE_LABELS = {
  polis: 'Polis',
  global_dialogues: 'Global Dialogues',
  remesh: 'Remesh',
  gsc: 'Generative Social Choice',
  makeorg: 'Make.org',
};

// Metrics shown per task in the main table, in the order the design brief specifies: lower-is-better first.
export const METRICS = [
  { key: 'log_loss', label: 'Log loss', better: 'lower', primary: true },
  { key: 'brier', label: 'Brier', better: 'lower' },
  { key: 'accuracy', label: 'Accuracy', better: 'higher', unit: '%' },
  { key: 'wins_log_loss', label: 'Won', better: 'higher', unit: 'of 32' },
];

// Families plotted as connected series in the scaling figure, smallest to largest. Ordering only, no values.
export const SERIES = [
  { family: 'GPT', kind: 'closed', points: [['gpt-5.6-luna', 'Luna'], ['gpt-5.6-terra', 'Terra'], ['gpt-5.6-sol', 'Sol'], ['gpt-6-astra', 'Astra']] },
  { family: 'Qwen3', kind: 'open', points: [['qwen3-30b-a3b', '30B'], ['qwen3-next-80b-a3b', 'Next 80B'], ['qwen3-235b-a22b', '235B']] },
  { family: 'Llama 4', kind: 'open', points: [['llama-4-scout', 'Scout'], ['llama-4-maverick', 'Maverick']] },
];

// Short category for a baseline's second line. Unknown methods fall back to "classical".
const BASELINE_CATEGORY = {
  categorical_mf: 'factorization', categorical_bias: 'bias model', feature_factorization_machine: 'factorization',
  shared_profile_bilinear_v2: 'factorization', shared_profile_tanh_v2: 'factorization', ordinal_factor: 'factorization',
  user_neighborhood: 'neighbourhood', item_neighborhood: 'neighbourhood',
  selected_prior: 'prior', row_prior_reference: 'prior', row_prior: 'prior', item_prior: 'prior', global_prior: 'prior',
  context_prior: 'prior', matched_input_prior: 'prior',
  text_ideal_point: 'text', ordinal_text_ideal_point: 'text', lexical_history: 'text', lexical_weighted_history: 'text',
  semantic_weighted_history: 'text', tfidf_conditional_logistic: 'text', embedding_conditional_logistic: 'text',
  histogram_gbdt_lexical: 'gradient boosting', histogram_gbdt_embedding: 'gradient boosting',
  ordinal_cumulative_regression: 'ordinal regression', stump_native_categorical_v2: 'STUMP', stump_native_ordinal_v2: 'STUMP',
};

export function subtitle(row) {
  if (row.kind === 'closed') return `${row.org} · API`;
  if (row.kind === 'open') return `${row.org} · open weights${row.params ? ` · ${row.params}` : ''}`;
  return `Baseline · ${BASELINE_CATEGORY[row.id] || 'classical'}`;
}

/** Normalize the exported JSON into one list of rows with per-task results and coverage. */
export function buildRows(data) {
  const studies = data.benchmark.studies;
  const normalize = (entry) => {
    const results = {};
    const coverage = {};
    const reference = {};
    for (const task of TASKS) {
      const r = entry.results ? entry.results[task.id] : null;
      results[task.id] = r || null;
      coverage[task.id] = !r ? 'none' : r.studies >= studies ? 'full' : 'partial';
      reference[task.id] = data.benchmark.reference[task.id] === entry.id;
    }
    return {
      id: entry.id, name: entry.name, kind: entry.kind, org: entry.org, params: entry.params || null,
      description: entry.description || null, status: entry.status, condition: entry.condition || null,
      cost: typeof entry.cost_usd === 'number' ? entry.cost_usd : null,
      subtitle: subtitle(entry), results, coverage, reference,
    };
  };
  return [...data.models, ...data.baselines].map(normalize);
}

export const complete = (rows) => rows.filter((r) => r.status === 'complete');
export const running = (rows) => rows.filter((r) => r.status !== 'complete');

/** A value is comparable only on full coverage of the task: partial rows never enter ranks, bests or plots. */
export function value(row, task, key) {
  if (row.coverage[task] !== 'full') return null;
  const v = row.results[task] ? row.results[task][key] : null;
  return typeof v === 'number' ? v : null;
}

/** Plain order by log loss on one task (no shared ranks: across-study means are descriptive, not tested). */
export function ranks(rows, task) {
  const ordered = rows.filter((r) => value(r, task, 'log_loss') !== null)
    .sort((a, b) => value(a, task, 'log_loss') - value(b, task, 'log_loss'));
  const out = {};
  ordered.forEach((r, i) => { out[r.id] = i + 1; });
  return out;
}

/** Best value of each metric on each task among full-coverage rows, for bolding. */
export function bests(rows) {
  const out = {};
  for (const task of TASKS) {
    out[task.id] = {};
    for (const m of METRICS) {
      const vals = rows.map((r) => value(r, task.id, m.key)).filter((v) => v !== null);
      if (!vals.length) continue;
      out[task.id][m.key] = m.better === 'lower' ? Math.min(...vals) : Math.max(...vals);
    }
  }
  return out;
}

export const fmt3 = (v) => (v === null || v === undefined ? '—' : v.toFixed(3));
export const fmtPct = (v) => (v === null || v === undefined ? '—' : (v * 100).toFixed(1));
export const fmtInt = (v) => (v === null || v === undefined ? '—' : String(v));
export const fmtCost = (v) => (v === null || v === undefined ? '—' : v < 1 ? '<$1' : `$${Math.round(v).toLocaleString('en-US')}`);
export const fmtSigned = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0');

export function formatMetric(key, v) {
  if (key === 'accuracy') return fmtPct(v);
  if (key === 'wins_log_loss' || key === 'wins_accuracy' || key === 'wins_brier') return fmtInt(v);
  return fmt3(v);
}

export function referenceRow(rows, data, task) {
  return rows.find((r) => r.id === data.benchmark.reference[task]) || null;
}

/** Series points for the scaling figure: only complete models with full coverage of the task. */
export function seriesFor(rows, task) {
  const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
  return SERIES.map((s) => ({
    ...s,
    points: s.points
      .map(([id, label]) => ({ id, label, row: byId[id] }))
      .filter((p) => p.row && p.row.status === 'complete' && value(p.row, task, 'log_loss') !== null)
      .map((p) => ({ ...p, y: value(p.row, task, 'log_loss') })),
  })).filter((s) => s.points.length > 0);
}

/** The one-sentence claim, derived from the data so it cannot drift from the table. */
export function headline(rows, data) {
  const mc = 'matrix_completion';
  const gpt = seriesFor(rows, mc).find((s) => s.family === 'GPT');
  const parts = [];
  const monotone = (task) => {
    const s = seriesFor(rows, task).find((x) => x.family === 'GPT');
    return s && s.points.length > 1 && s.points.every((p, i) => i === 0 || p.y < s.points[i - 1].y);
  };
  if (gpt && monotone(mc) && monotone('new_statement_prediction')) {
    parts.push('each larger GPT model predicts held-out responses better on both tasks');
  }
  const ref = referenceRow(rows, data, mc);
  const rk = ranks(complete(rows), mc);
  const top = complete(rows).find((r) => rk[r.id] === 1);
  let beat = null;
  if (top && ref && top.kind !== 'baseline' && top.id !== ref.id) {
    beat = { top, ref, x: value(top, mc, 'log_loss'), y: value(ref, mc, 'log_loss'), won: top.results[mc].wins_log_loss };
  }
  return { parts, beat };
}

/** Per-row floored ranks, for the rank change under the declared probability floor. */
export function floorRanks(rows, task) {
  const ordered = rows.filter((r) => r.coverage[task] === 'full' && typeof r.results[task].log_loss_floor === 'number')
    .sort((a, b) => a.results[task].log_loss_floor - b.results[task].log_loss_floor);
  const out = {};
  ordered.forEach((r, i) => { out[r.id] = i + 1; });
  return out;
}
