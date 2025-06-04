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
      <div className="md:col-span-2 text-gray-600 text-lg">
        <Biography />
        <SocialLinks />
      </div>
    </div>
  );
}

function Biography() {
  return (
    <>
      <p className='mb-4 text-neutral-800'>
        I am currently doing a Master of Math in Computer Science at UWaterloo where I&apos;m supervised by
        <a href="https://cs.uwaterloo.ca/~klarson/"
          className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
          style={{color: '#16a34a'}}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#16a34a';
            e.target.style.color = '#f0f5f0';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#16a34a';
          }}
          target="_blank"
          rel="noopener noreferrer">
          Kate Larson
        </a>
        and
        <a href="https://edithlaw.ca/"
          className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out ml-1"
          style={{color: '#16a34a'}}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#16a34a';
            e.target.style.color = '#f0f5f0';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#16a34a';
          }}
          target="_blank"
          rel="noopener noreferrer">  
          Edith Law
        </a>.
        My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.
      </p>
      <hr className="border-gray-300 mb-4" />
      <p className='text-neutral-800 mb-4'>
        You can reach me at cblair at uwaterloo dot ca.
      </p>
    </>
  );
}

function SocialLinks() {
  const links = [
    { href: "https://scholar.google.com/citations?user=aQ80XM8AAAAJ&hl=en", icon: "/googleScholar.svg", alt: "Google Scholar Logo", trackLabel: "Google Scholar" },
    { href: "https://www.linkedin.com/in/carter-blair-b70429200/", icon: "/linkedin.svg", alt: "LinkedIn Logo", trackLabel: "LinkedIn" },
    { href: "https://github.com/cartgr", icon: "/github.svg", alt: "GitHub Logo", trackLabel: "GitHub" },
    { href: "/cv.pdf", icon: "/cv_icon.png", alt: "CV Logo", trackLabel: "CV" },
  ];

  const handleLinkClick = (trackLabel, href) => {
    if (href.endsWith('.pdf')) {
      trackEvent('download', 'cv', trackLabel);
    } else {
      trackEvent('click_social_link', 'profile', trackLabel);
    }
  };

  return (
    <div className="mt-4 flex flex-row">
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
    </div>
  );
}