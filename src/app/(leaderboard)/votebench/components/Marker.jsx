// Category marker: filled circle = API model, hollow circle = open weights, square = classical baseline.
// Shape carries the category so colour is never the only cue.
export function markerShape(kind, cx, cy, r = 4) {
  if (kind === 'closed') return <circle cx={cx} cy={cy} r={r} className="fill-api" />;
  if (kind === 'open') {
    return <circle cx={cx} cy={cy} r={r - 0.75} className="fill-paper stroke-open" strokeWidth="1.5" />;
  }
  return <rect x={cx - r + 0.5} y={cy - r + 0.5} width={2 * r - 1} height={2 * r - 1} className="fill-ink3" />;
}

export default function Marker({ kind }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="inline-block shrink-0">
      {markerShape(kind, 5, 5, 4)}
    </svg>
  );
}

export const KIND_LABEL = { closed: 'API model', open: 'Open-weight model', baseline: 'Classical baseline' };
