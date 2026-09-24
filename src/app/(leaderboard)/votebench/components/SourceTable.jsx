'use client';

import { useMemo, useState } from 'react';
import Marker from './Marker';
import { SOURCE_LABELS, fmt3 } from '../lib/data';
import { anchorFor } from '../lib/baselines';

/**
 * One platform breakdown table. Rows arrive in the page's ranked order, which is the default sort; clicking a platform
 * column sorts by that platform's log loss (best first, then worst), and clicking System sorts by name. A system with
 * no score for a platform always sorts last, whichever direction is chosen.
 */
export default function SourceTable({ task, rows, sources, counts }) {
  const [sort, setSort] = useState(null);

  const onSort = (key) =>
    setSort((s) => (s && s.key === key ? { key, dir: s.dir === 'best' ? 'worst' : 'best' } : { key, dir: 'best' }));

  const ordered = useMemo(() => {
    if (!sort) return rows;
    const list = [...rows];
    if (sort.key === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
      if (sort.dir === 'worst') list.reverse();
      return list;
    }
    const read = (r) => r.results[task.id].by_source[sort.key]?.log_loss ?? null;
    return list.sort((a, b) => {
      const va = read(a);
      const vb = read(b);
      if (va === null && vb === null) return 0;
      if (va === null) return 1;
      if (vb === null) return -1;
      return sort.dir === 'best' ? va - vb : vb - va;
    });
  }, [rows, sort, task.id]);

  const best = Object.fromEntries(
    sources.map((s) => [s, Math.min(...rows.map((r) => r.results[task.id].by_source[s]?.log_loss ?? Infinity))]),
  );
  const ariaSort = (key) => (sort && sort.key === key ? (sort.dir === 'best' ? 'ascending' : 'descending') : 'none');
  const arrow = (key) => (sort && sort.key === key ? (sort.dir === 'best' ? '↓' : '↑') : '');

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse border-y-[1.5px] border-ink text-[14px]">
        <caption className="caption-top pb-2 text-left text-[13px] text-ink2">
          <span className="font-semibold text-ink">{task.label}.</span> Mean log loss ↓ within each platform. Select any
          header to sort.
        </caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" aria-sort={ariaSort('name')} className="px-3 py-2 text-left font-semibold">
              <button
                type="button"
                onClick={() => onSort('name')}
                className="focus-ring inline-flex items-center gap-1 rounded-sm text-ink hover:text-ink2"
              >
                System
                <span aria-hidden="true" className="text-ink3">{arrow('name')}</span>
              </button>
            </th>
            {sources.map((s) => (
              <th key={s} scope="col" aria-sort={ariaSort(s)} className="px-3 py-2 text-right font-semibold">
                <button
                  type="button"
                  onClick={() => onSort(s)}
                  className="focus-ring ml-auto inline-flex flex-col items-end rounded-sm text-ink hover:text-ink2"
                >
                  <span className="block whitespace-nowrap">
                    {SOURCE_LABELS[s]}
                    <span aria-hidden="true" className="ml-0.5 text-ink3">{arrow(s)}</span>
                  </span>
                  <span className="num block text-[12px] font-normal text-ink3">
                    {counts[s]} {counts[s] === 1 ? 'study' : 'studies'}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ordered.map((r) => (
            <tr key={r.id} className={`border-b border-rule ${r.reference[task.id] ? 'bg-tint' : ''}`}>
              <th scope="row" className={`px-3 py-2 text-left font-normal ${r.kind === 'baseline' ? 'text-ink2' : 'text-ink'}`}>
                <span className="inline-flex items-center gap-2">
                  <Marker kind={r.kind} />
                  {r.kind === 'baseline' ? <a href={`#${anchorFor(r.id)}`} className="hover:underline">{r.name}</a> : r.name}
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
