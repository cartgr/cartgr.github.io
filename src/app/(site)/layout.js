import React, { Suspense } from 'react';
import '../globals.css';
import Menu from '../components/menu';
import Link from 'next/link';
import { GoogleAnalytics } from '../components/Analytics';
import { Raleway, Cardo } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

const cardo = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-cardo',
})

export const metadata = {
  metadataBase: new URL('https://cartgr.github.io'),
  title: 'Carter Blair',
  description: 'I am a second-year PhD student in Computer Science at Harvard University, supervised by Ariel Procaccia and Milind Tambe in the EconCS group. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
  keywords: 'Carter Blair, AI research, reinforcement learning, human-AI interaction, AI alignment, University of Waterloo, computer science, machine learning, social choice',
  authors: [{ name: 'Carter Blair' }],
  creator: 'Carter Blair',
  publisher: 'Carter Blair',
  robots: 'index, follow',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cartgr.github.io',
    siteName: 'Carter Blair',
    title: 'Carter Blair',
    description: 'I am a second-year PhD student in Computer Science at Harvard University, supervised by Ariel Procaccia and Milind Tambe in the EconCS group. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
    images: [
      {
        url: '/headshot2025.jpg',
        width: 250,
        height: 250,
        alt: 'Carter Blair headshot',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Carter Blair',
    description: 'I am a second-year PhD student in Computer Science at Harvard University, supervised by Ariel Procaccia and Milind Tambe in the EconCS group. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
    images: ['/headshot2025.jpg'],
  },
  verification: {
    google: 'B-gvfVPP-dA2uc76SGu7dCj2uzPynmVTzeRsofUCkoU',
  },
}

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carter Blair",
    "jobTitle": "PhD Student in Computer Science",
    "affiliation": {
      "@type": "Organization",
      "name": "Harvard University",
      "url": "https://harvard.edu"
    },
    "url": "https://cartgr.github.io",
    "image": "/headshot2025.jpg",
    "alumniOf": {
      "@type": "Organization",
      "name": "University of Victoria"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning", 
      "Reinforcement Learning",
      "Human-AI Interaction",
      "AI Alignment",
      "Social Choice Theory"
    ],
    "description": "Computer Science PhD student researching collective decision making and AI at Harvard University",
    "sameAs": [
      "https://scholar.google.com/citations?user=aQ80XM8AAAAJ&hl=en",
      "https://www.linkedin.com/in/carter-blair-b70429200/",
      "https://github.com/cartgr"
    ]
  };

  return (
    <html lang="en" className={`${raleway.variable} ${cardo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-paper m-0 min-h-screen" suppressHydrationWarning={true}>
        {/* Scrolls away with the page, so nothing ever passes underneath it */}
        <div className="relative h-[100px] bg-paper flex items-center z-50">
          <div className="max-w-[52rem] mx-auto w-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Link href="/" className="no-underline text-stone-800">
                <img src="/icon.png" alt="Icon" className="h-9 w-9 mr-2" />
              </Link>
              {/* pointer-events-none while hidden, so the transparent box can't capture
                  hover or swallow clicks on the content beneath it. pt-2 is a hoverable
                  bridge from the icon to the tooltip, so travelling to the link can't flicker. */}
              <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-[60]">
                <div className="bg-stone-800 text-stone-100 text-[0.8rem] px-3 py-1.5 whitespace-nowrap">
                  The icon is <a href="https://fr.wikipedia.org/wiki/Disque_simultan%C3%A9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white underline underline-offset-2 decoration-stone-400">Disque simultané</a> by Robert Delaunay (one of my favourite paintings)
                </div>
              </div>
            </div>
            <Link href="/" className="no-underline text-stone-800">
              <span className="text-3xl" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>Carter Blair</span>
            </Link>
          </div>

          <Menu />
          </div>
        </div>

        {/* Add relative positioning to create a new stacking context */}
        <div className="p-4 bg-paper relative">
          {children}
        </div>
        
        {/* Google Analytics. It reads useSearchParams(), so it needs a Suspense boundary: without one Next 13.5
            deopts every page into client-side rendering and ships an empty body. */}
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID="G-6YC2KGF5B2" />
        </Suspense>
      </body>
    </html>
  )
}
