import React from 'react';
import './globals.css';
import Menu from './components/menu';
import Link from 'next/link';
import { GoogleAnalytics } from './components/Analytics';
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
  description: 'I am currently doing a Master of Math in Computer Science at UWaterloo where I\'m supervised by Kate Larson and Edith Law. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
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
    description: 'I am currently doing a Master of Math in Computer Science at UWaterloo where I\'m supervised by Kate Larson and Edith Law. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
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
    description: 'I am currently doing a Master of Math in Computer Science at UWaterloo where I\'m supervised by Kate Larson and Edith Law. My research explores the bidirectional relationship between social choice theory and AI: applying social choice principles to pluralistic AI alignment, and leveraging AI (particularly LLMs) to improve collective decision-making by enabling nuanced preference elicitation and aggregation from open-ended verbal input.',
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
    "jobTitle": "Master's Student in Computer Science",
    "affiliation": {
      "@type": "Organization",
      "name": "University of Waterloo",
      "url": "https://uwaterloo.ca"
    },
    "url": "https://cartgr.github.io",
    "image": "/headshot2025.jpg",
    "email": "cblair@uwaterloo.ca",
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
    "description": "Computer Science Master's student researching AI alignment, reinforcement learning, and human-AI interaction at University of Waterloo",
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
      <body className="bg-neutral-50 m-0 min-h-screen" suppressHydrationWarning={true}>
        {/* Add z-50 to ensure top bar stays above everything */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-neutral-100 p-4 flex items-center justify-between border-b-2 border-neutral-300 z-50">
          <div className="flex items-center ml-2 space-x-4">
            <div className="relative group">
              <Link href="/" className="no-underline text-neutral-800">
                <img src="/icon.png" alt="Icon" className="h-9 w-9 mr-2" />
              </Link>
              <div className="absolute -bottom-10 left-0 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-auto z-[60]">
                The icon is <a href="https://fr.wikipedia.org/wiki/Disque_simultan%C3%A9" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">Disque simultané</a> by Robert Delaunay (my favourite painting)
              </div>
            </div>
            <Link href="/" className="no-underline text-neutral-800">
              <span className="text-3xl" style={{fontFamily: 'Gill Sans, var(--font-raleway), sans-serif'}}>Carter Blair</span>
            </Link>
          </div>

          <Menu />
        </div>

        {/* Add relative positioning to create a new stacking context */}
        <div className="pt-16 p-4 bg-neutral-50 relative">
          {children}
        </div>
        
        {/* Google Analytics */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-6YC2KGF5B2" />
      </body>
    </html>
  )
}
