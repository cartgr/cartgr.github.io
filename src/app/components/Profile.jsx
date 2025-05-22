"use client";

import Image from 'next/image';

export default function Profile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="md:col-span-1 relative group w-fit">
        <Image
          src="./headshot2025.png"
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
          className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
          target="_blank"
          rel="noopener noreferrer">
          Kate Larson
        </a>
        and
        <a href="https://edithlaw.ca/"
          className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out ml-1"
          target="_blank"
          rel="noopener noreferrer">  
          Edith Law
        </a>.
        My research mainly focuses on the intersection between social choice, reinforcement learning, and human-AI interaction. I am currently excited about participatory and pluralistic approaches to AI alignment.
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
    { href: "https://scholar.google.com/citations?user=aQ80XM8AAAAJ&hl=en", icon: "./googleScholar.svg", alt: "Google Scholar Logo" },
    { href: "https://www.linkedin.com/in/carter-blair-b70429200/", icon: "./linkedin.svg", alt: "LinkedIn Logo" },
    { href: "https://github.com/cartgr", icon: "./github.svg", alt: "GitHub Logo" },
    { href: "./cv.pdf", icon: "./cv.svg", alt: "CV Logo" },
  ];

  return (
    <div className="mt-4 flex flex-row">
      {links.map((link, index) => (
        <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="mr-2 relative group p-1">
          <img src={link.icon} alt={link.alt} className="w-8 h-8" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {link.alt.replace(' Logo', '')}
          </span>
        </a>
      ))}
    </div>
  );
}