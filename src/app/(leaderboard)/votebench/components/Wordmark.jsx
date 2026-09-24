import Image from 'next/image';
import { STIX_Two_Text } from 'next/font/google';
import { NAME } from '../lib/data';

const wordmarkFont = STIX_Two_Text({ subsets: ['latin'], weight: '600', display: 'swap' });

// A simplified cartoon crystal-ball ballot box, with the requested white background preserved.
export default function Wordmark({ size = 'md' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/leaderboard/oracle-vote-v4.png" width={size === 'lg' ? 24 : 22} height={size === 'lg' ? 24 : 22} alt="" aria-hidden="true" unoptimized className="shrink-0" />
      <span className={`${wordmarkFont.className} font-semibold tracking-[-0.01em] text-ink ${size === 'lg' ? 'text-[22px]' : 'text-[19px]'}`}>
        {NAME}
      </span>
    </span>
  );
}
