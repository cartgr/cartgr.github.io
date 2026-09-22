// Root layout for the PrefBench leaderboard. It is a separate root from the personal site's app/(site)/layout.js,
// so the two share no fonts, stylesheet or navigation; moving between them is a full page load.
import { Source_Serif_4, Source_Sans_3, Source_Code_Pro } from 'next/font/google';
import './leaderboard.css';
import { NAME, DESCRIPTOR } from './leaderboard/lib/data';

const serif = Source_Serif_4({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-lb-serif', display: 'swap' });
const sans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-lb-sans', display: 'swap' });
const mono = Source_Code_Pro({ subsets: ['latin'], weight: ['400'], variable: '--font-lb-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://cartgr.github.io'),
  title: `${NAME} leaderboard · ${DESCRIPTOR}`,
  description:
    'A benchmark for predicting how real participants respond in public deliberations: 32 studies from Polis, Global Dialogues, Remesh, Generative Social Choice and Make.org. Preliminary results.',
  alternates: { canonical: '/leaderboard/' },
  openGraph: {
    title: `${NAME} leaderboard`,
    description: DESCRIPTOR,
    url: '/leaderboard/',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#111315' },
  ],
};

// Runs before paint: an explicit choice wins, otherwise follow the operating system.
const NO_FLASH = `(function(){try{var s=localStorage.getItem('lb-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function LeaderboardLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className="min-h-screen bg-paper font-sans text-[17px] leading-[27px] text-ink">{children}</body>
    </html>
  );
}
