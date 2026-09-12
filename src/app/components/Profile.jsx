"use client";

import Image from 'next/image';
import { trackEvent } from './Analytics';

export default function Profile() {
  return (
    <div>
      {/* Floated so the bio wraps beneath the photo rather than leaving a void beside it */}
      <div className="relative group w-[177.5px] mx-auto mb-5 md:float-left md:mr-6 md:mb-0 md:mx-0">
        <Image
          src="/headshot2025.jpg"
          alt="Picture of the author"
          width={178}
          height={178}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
          <span className="text-white text-sm font-medium text-center">
            Taken at{' '}
            <a 
              href="https://en.wikipedia.org/wiki/Devils_Tower" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-100 hover:text-white underline underline-offset-2"
            >
              Bear Lodge
            </a>
            , Wyoming
          </span>
        </div>
      </div>
      <div className="text-stone-700 text-base">
        <Biography />
      </div>
      <div className="clear-both" />

      {/* Links sit below both columns, so the rule spans the full measure */}
      <hr className="border-stone-200 mt-[30.5px] mb-[28px]" />
      <SocialLinks />
    </div>
  );
}

function Biography() {
  const linkClass = "text-green-600 hover:underline";

  return (
    <>
      <p className='mb-4 text-stone-700'>
        I am a second-year PhD student in Computer Science at Harvard University. I am fortunate to be supervised by{' '}
        <a href="https://procaccia.info/" className={linkClass} target="_blank" rel="noopener noreferrer">Ariel Procaccia</a>
        {' '}and{' '}
        <a href="https://teamcore.seas.harvard.edu/tambe/" className={linkClass} target="_blank" rel="noopener noreferrer">Milind Tambe</a>
        {' '}in the{' '}
        <a href="https://econcs.seas.harvard.edu/" className={linkClass} target="_blank" rel="noopener noreferrer">EconCS group</a>.
        {' '}My work is supported by an NSERC CGS-D and the{' '}
        <a href="https://www.cooperativeai.com/post/announcing-the-2025-cooperative-ai-phd-scholars" className={linkClass} target="_blank" rel="noopener noreferrer">Cooperative AI PhD Fellowship</a>.
      </p>
      <p className='mb-4 text-stone-700'>
        I am broadly interested in AI and collective decision making, with applications to AI for social good. For example, I am interested in how AI can elicit rich verbal preferences, aggregate them fairly, and support deliberation that simultaneously accounts for the normative and epistemic aspects of collective decision making. See my{' '}
        <a href="/publications" className={linkClass}>publications</a>.
      </p>
      <p className='text-stone-700 md:clear-left'>
        Previously, I completed an M.Math in Computer Science at the University of Waterloo where I had a wonderful time being supervised by{' '}
        <a href="https://cs.uwaterloo.ca/~klarson/" className={linkClass} target="_blank" rel="noopener noreferrer">Kate Larson</a>
        {' '}and{' '}
        <a href="https://edithlaw.ca/" className={linkClass} target="_blank" rel="noopener noreferrer">Edith Law</a>.
        {' '}Before that, I completed my undergraduate degree at the University of Victoria in Computer Science and Psychology with a minor in Philosophy.
      </p>
    </>
  );
}

function SocialLinks() {
  const links = [
    { href: "https://scholar.google.com/citations?user=aQ80XM8AAAAJ&hl=en", icon: "/googleScholar.svg", alt: "Google Scholar Logo", trackLabel: "Google Scholar" },
    { href: "https://www.linkedin.com/in/carter-blair-b70429200/", icon: "/linkedin.svg", alt: "LinkedIn Logo", trackLabel: "LinkedIn" },
    { href: "https://github.com/cartgr", icon: "/github.svg", alt: "GitHub Logo", trackLabel: "GitHub" },
  ];

  const handleLinkClick = (trackLabel, href) => {
    if (href.endsWith('.pdf')) {
      trackEvent('download', 'cv', trackLabel);
    } else {
      trackEvent('click_social_link', 'profile', trackLabel);
    }
  };

  return (
    <div className="flex flex-row items-center">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mr-2 p-1"
          onClick={() => handleLinkClick(link.trackLabel, link.href)}
        >
          <span
            role="img"
            aria-label={link.alt}
            className="block w-8 h-8 bg-stone-700 group-hover:bg-stone-900 transition-colors duration-200"
            style={{
              maskImage: `url(${link.icon})`,
              WebkitMaskImage: `url(${link.icon})`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        </a>
      ))}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group mr-2 p-1"
        onClick={() => handleLinkClick('CV', '/cv.pdf')}
      >
        <span className="text-stone-700 font-medium text-2xl group-hover:text-stone-900 transition-colors duration-200 inline-block">CV</span>
      </a>
    </div>
  );
}