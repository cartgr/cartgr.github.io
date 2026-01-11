"use client";

import Image from 'next/image';
import { trackEvent } from './Analytics';

export default function Profile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="md:col-span-1 relative group w-fit mx-auto md:mx-0 mb-2 md:mb-0">
        <Image
          src="/headshot2025.jpg"
          alt="Picture of the author"
          width={250}
          height={250}
          className="rounded-sm"
        />
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-sm">
          <span className="text-white text-sm font-medium text-center">
            Taken at{' '}
            <a 
              href="https://en.wikipedia.org/wiki/Devils_Tower" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Bear Lodge
            </a>
            , Wyoming
          </span>
        </div>
      </div>
      <div className="md:col-span-2 text-gray-600 text-base">
        <Biography />
        <SocialLinks />
      </div>
    </div>
  );
}

function Biography() {
  const linkClass = "text-green-600 hover:underline";

  return (
    <>
      <p className='mb-3 text-neutral-800'>
        I am a first-year PhD student in Computer Science at Harvard University. I am fortunate to be supervised by{' '}
        <a href="https://procaccia.info/" className={linkClass} target="_blank" rel="noopener noreferrer">Ariel Procaccia</a>
        {' '}and{' '}
        <a href="https://teamcore.seas.harvard.edu/tambe/" className={linkClass} target="_blank" rel="noopener noreferrer">Milind Tambe</a>
        {' '}in the{' '}
        <a href="https://econcs.seas.harvard.edu/" className={linkClass} target="_blank" rel="noopener noreferrer">EconCS group</a>.
        {' '}My work is supported by an NSERC CGS-D and the{' '}
        <a href="https://www.cooperativeai.com/post/announcing-the-2025-cooperative-ai-phd-scholars" className={linkClass} target="_blank" rel="noopener noreferrer">Cooperative AI PhD Fellowship</a>.
      </p>
      <p className='mb-3 text-neutral-800 mt-0.5'>
        I am broadly interested in AI and collective decision making, with applications to AI for social good. For example, I am interested in how AI can elicit rich verbal preferences, aggregate them fairly, and support deliberation that simultaneously accounts for the normative and epistemic aspects of collective decision making. See my{' '}
        <a href="/publications" className={linkClass}>publications</a>.
      </p>
      <p className='text-neutral-800 mb-3'>
        Previously, I completed an M.Math in Computer Science at the University of Waterloo where I had a wonderful time being supervised by{' '}
        <a href="https://cs.uwaterloo.ca/~klarson/" className={linkClass} target="_blank" rel="noopener noreferrer">Kate Larson</a>
        {' '}and{' '}
        <a href="https://edithlaw.ca/" className={linkClass} target="_blank" rel="noopener noreferrer">Edith Law</a>.
        {' '}Before that, I completed my undergraduate degree at the University of Victoria in Computer Science and Psychology with a minor in Philosophy.
      </p>
      <hr className="border-gray-300 mb-4" />
      <p className='text-neutral-800 mb-4'>
        You can reach me at carterblair at g dot harvard dot edu.
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
    <div className="mt-4 flex flex-row items-center">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 p-1"
          onClick={() => handleLinkClick(link.trackLabel, link.href)}
        >
          <img src={link.icon} alt={link.alt} className="w-8 h-8 hover:scale-110 transition-transform duration-200" />
        </a>
      ))}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-2 p-1"
        onClick={() => handleLinkClick('CV', '/cv.pdf')}
      >
        <span className="text-neutral-800 font-medium text-2xl hover:scale-110 transition-transform duration-200 inline-block">CV</span>
      </a>
    </div>
  );
}