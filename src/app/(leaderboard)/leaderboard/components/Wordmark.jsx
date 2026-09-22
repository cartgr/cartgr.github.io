import { NAME } from '../lib/data';

// A 3x3 grid of cells with one hollow: the unseen response the benchmark asks a system to predict.
const HOLLOW = [1, 2];

export default function Wordmark({ size = 'md' }) {
  const cell = 5;
  const gap = 1;
  const squares = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const x = c * (cell + gap);
      const y = r * (cell + gap);
      const hollow = r === HOLLOW[0] && c === HOLLOW[1];
      squares.push(
        hollow ? (
          <rect key={`${r}${c}`} x={x + 0.5} y={y + 0.5} width={cell - 1} height={cell - 1} className="fill-none stroke-ink" strokeWidth="1" />
        ) : (
          <rect key={`${r}${c}`} x={x} y={y} width={cell} height={cell} className="fill-ink" />
        ),
      );
    }
  }
  const dim = 3 * cell + 2 * gap;
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden="true" className="shrink-0">
        {squares}
      </svg>
      <span className={`font-serif font-semibold tracking-[-0.01em] text-ink ${size === 'lg' ? 'text-[22px]' : 'text-[19px]'}`}>
        {NAME}
      </span>
    </span>
  );
}
