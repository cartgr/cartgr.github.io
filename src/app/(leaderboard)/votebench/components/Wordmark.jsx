import Image from 'next/image';
import { NAME } from '../lib/data';

// A simplified cartoon crystal-ball ballot box, with the requested white background preserved.
export default function Wordmark({ size = 'md' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/leaderboard/oracle-vote-v4.png" width={size === 'lg' ? 34 : 30} height={size === 'lg' ? 34 : 30} alt="" aria-hidden="true" unoptimized className="shrink-0" />
      <span className={`font-serif font-semibold leading-none tracking-[-0.01em] text-ink ${size === 'lg' ? 'text-[34px]' : 'text-[30px]'}`}>
        {NAME}
      </span>
    </span>
  );
}
