// Build-time SVG figures. No chart library ships: every coordinate is computed on the server from the same rows
// the table uses, and each figure is backed by Table 1.
import { markerShape } from './Marker';
import { TASKS, value, seriesFor, referenceRow, fmt3 } from '../lib/data';

const niceTicks = (lo, hi, step) => {
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Number(v.toFixed(4)));
  return out;
};

/** Figure 1: log loss by model size tier within each family, one panel per task, reference as a dashed line. */
export function ScalingFigure({ rows, data }) {
  const panels = TASKS.map((t) => ({ task: t, series: seriesFor(rows, t.id), ref: referenceRow(rows, data, t.id) }));
  const all = panels.flatMap((p) => [
    ...p.series.flatMap((s) => s.points.map((pt) => pt.y)),
    ...(p.ref ? [value(p.ref, p.task.id, 'log_loss')] : []),
  ]).filter((v) => v !== null);
  if (!all.length) return null;
  const lo = Math.floor((Math.min(...all) - 0.05) * 10) / 10;
  const hi = Math.ceil((Math.max(...all) + 0.05) * 10) / 10;
  const W = 340;
  const H = 230;
  const m = { l: 44, r: 16, t: 14, b: 40 };
  const maxPts = Math.max(...panels.flatMap((p) => p.series.map((s) => s.points.length)), 2);
  const x = (i) => m.l + (i * (W - m.l - m.r)) / (maxPts - 1);
  const y = (v) => m.t + ((v - lo) * (H - m.t - m.b)) / (hi - lo);
  const ticks = niceTicks(lo, hi, hi - lo > 0.6 ? 0.2 : 0.1);

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {panels.map((p) => {
        const refV = p.ref ? value(p.ref, p.task.id, 'log_loss') : null;
        const gpt = p.series.find((s) => s.family === 'GPT');
        const summary = gpt
          ? `${p.task.label}: ${gpt.points.map((pt) => `${pt.label} ${fmt3(pt.y)}`).join(', ')}${p.ref ? `; reference ${p.ref.name} ${fmt3(refV)}` : ''}.`
          : p.task.label;
        return (
          <figure key={p.task.id} className="m-0">
            <figcaption className="mb-2 text-[13px] font-semibold text-ink">{p.task.label}</figcaption>
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[420px]" role="img" aria-label={`Log loss by model tier. ${summary}`}>
              {ticks.map((tk) => (
                <g key={tk}>
                  <line x1={m.l} x2={W - m.r} y1={y(tk)} y2={y(tk)} className="stroke-rule" strokeWidth="1" />
                  <text x={m.l - 8} y={y(tk)} dy="0.32em" textAnchor="end" className="fill-ink3 num" fontSize="11">
                    {tk.toFixed(1)}
                  </text>
                </g>
              ))}
              <text x={10} y={m.t + (H - m.t - m.b) / 2} transform={`rotate(-90 10 ${m.t + (H - m.t - m.b) / 2})`} textAnchor="middle" className="fill-ink3" fontSize="11">
                Log loss ↓
              </text>
              {refV !== null && (
                <g>
                  <line x1={m.l} x2={W - m.r} y1={y(refV)} y2={y(refV)} className="stroke-ink2" strokeWidth="1" strokeDasharray="4 3" />
                  <text x={W - m.r} y={y(refV) - 5} textAnchor="end" className="fill-ink2" fontSize="11">
                    {p.ref.name} · {fmt3(refV)}
                  </text>
                </g>
              )}
              {p.series.map((s) => (
                <g key={s.family}>
                  <polyline
                    points={s.points.map((pt, i) => `${x(i)},${y(pt.y)}`).join(' ')}
                    fill="none"
                    className={s.kind === 'closed' ? 'stroke-api' : 'stroke-open'}
                    strokeWidth="1.5"
                  />
                  {s.points.map((pt, i) => (
                    <g key={pt.id}>
                      {markerShape(s.kind, x(i), y(pt.y), 4)}
                      <text
                        x={x(i)}
                        y={y(pt.y) + (i === s.points.length - 1 ? -9 : 15)}
                        textAnchor={i === 0 ? 'start' : i === s.points.length - 1 ? 'end' : 'middle'}
                        className="fill-ink2"
                        fontSize="10.5"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </g>
              ))}
              <text x={m.l} y={H - 8} className="fill-ink3" fontSize="11">
                smaller
              </text>
              <text x={W - m.r} y={H - 8} textAnchor="end" className="fill-ink3" fontSize="11">
                larger model →
              </text>
            </svg>
          </figure>
        );
      })}
    </div>
  );
}

/** Figure 2: every full-coverage system's log loss per task as a dot plot, reference as a vertical dashed line. */
export function DotPlot({ rows, data }) {
  const full = rows.filter((r) => r.status === 'complete');
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {TASKS.map((t) => {
        const pts = full
          .map((r) => ({ r, v: value(r, t.id, 'log_loss') }))
          .filter((p) => p.v !== null)
          .sort((a, b) => a.v - b.v);
        if (!pts.length) return null;
        const ref = referenceRow(rows, data, t.id);
        const refV = ref ? value(ref, t.id, 'log_loss') : null;
        const lo = Math.floor((pts[0].v - 0.03) * 10) / 10;
        const hi = Math.ceil((pts[pts.length - 1].v + 0.03) * 10) / 10;
        const W = 460;
        const rowH = 22;
        const m = { l: 150, r: 46, t: 8, b: 34 };
        const H = m.t + m.b + pts.length * rowH;
        const x = (v) => m.l + ((v - lo) * (W - m.l - m.r)) / (hi - lo);
        const ticks = niceTicks(lo, hi, hi - lo > 0.8 ? 0.2 : 0.1);
        return (
          <figure key={t.id} className="m-0">
            <figcaption className="mb-2 text-[13px] font-semibold text-ink">{t.label}</figcaption>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full"
              role="img"
              aria-label={`${t.label} log loss for ${pts.length} systems, best ${pts[0].r.name} at ${fmt3(pts[0].v)}.`}
            >
              {ticks.map((tk) => (
                <g key={tk}>
                  <line x1={x(tk)} x2={x(tk)} y1={m.t} y2={H - m.b + 4} className="stroke-rule" strokeWidth="1" />
                  <text x={x(tk)} y={H - m.b + 17} textAnchor="middle" className="fill-ink3 num" fontSize="11">
                    {tk.toFixed(1)}
                  </text>
                </g>
              ))}
              <text x={m.l} y={H - 4} className="fill-ink3" fontSize="11">
                ← better (log loss)
              </text>
              {refV !== null && (
                <line x1={x(refV)} x2={x(refV)} y1={m.t} y2={H - m.b + 4} className="stroke-ink2" strokeWidth="1" strokeDasharray="4 3" />
              )}
              {pts.map((p, i) => {
                const cy = m.t + i * rowH + rowH / 2;
                const isRef = ref && p.r.id === ref.id;
                return (
                  <g key={p.r.id}>
                    <text
                      x={m.l - 10}
                      y={cy}
                      dy="0.32em"
                      textAnchor="end"
                      fontSize="12"
                      className={p.r.kind === 'baseline' ? 'fill-ink2' : 'fill-ink'}
                      fontWeight={p.r.kind === 'baseline' ? 400 : 600}
                    >
                      {p.r.name}
                      {isRef ? ' (ref.)' : ''}
                    </text>
                    <line x1={m.l} x2={x(p.v)} y1={cy} y2={cy} className="stroke-rule" strokeWidth="1" />
                    {markerShape(p.r.kind, x(p.v), cy, 4.5)}
                    <text x={x(p.v) + 9} y={cy} dy="0.32em" className="fill-ink3 num" fontSize="11">
                      {fmt3(p.v)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </figure>
        );
      })}
    </div>
  );
}
