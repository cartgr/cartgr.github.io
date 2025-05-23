"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import publicationsData from '../data/publications.json';
import { trackEvent } from './Analytics';

export default function Publications() {
  const [expandSection, setExpandSection] = useState({});
  const [yearPositions, setYearPositions] = useState({});

  const timelineRefs = useRef({});

  const { workingPapers, publications } = publicationsData;

  useEffect(() => {
    const updateYearPositions = () => {
      const newPositions = {};

      Object.keys(timelineRefs.current).forEach((year) => {
        const ref = timelineRefs.current[year];
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleMiddle = (visibleTop + visibleBottom) / 2;
        const relativePosition = visibleMiddle - rect.top;

        newPositions[year] = relativePosition;
      });

      setYearPositions(newPositions);
    };

    const debouncedUpdate = debounce(updateYearPositions, 10);

    updateYearPositions();
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, []);

  const toggleSection = (id, title) => {
    const wasExpanded = expandSection[id];
    setExpandSection((prev) => ({ ...prev, [id]: !prev[id] }));
    
    // Track abstract expansion
    if (!wasExpanded) {
      trackEvent('expand_abstract', 'publication', title);
    }
  };

  return (
    <section>
      {workingPapers.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6 text-neutral-800" style={{fontFamily: 'Gill Sans, sans-serif'}}>Working Papers</h2>
          <div className="flex flex-col space-y-8">
            {workingPapers.map((paper) => (
              <PublicationCard
                key={paper.id}
                {...paper}
                expanded={expandSection[paper.id]}
                onToggle={() => toggleSection(paper.id, paper.title)}
              />
            ))}
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-medium mb-6 text-neutral-800" style={{fontFamily: 'Gill Sans, sans-serif'}}>Publications</h2>
      {Object.keys(publications)
        .sort((a, b) => b - a)
        .map((year) => (
          <div key={year} className="flex mb-16">
            {/* Timeline column */}
            <div className="w-24 shrink-0 relative flex justify-center">
              {/* Vertical line with fade */}
              <div
                ref={(el) => (timelineRefs.current[year] = el)}
                className="absolute w-[1px] top-0 bottom-8 left-1/2 transform -translate-x-1/2"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, #d4d4d8 15%, #d4d4d8 85%, transparent 100%)'
                }}
              />
              {/* Year label */}
              <div
                className="absolute transition-all duration-300 ease-out"
                style={{ top: yearPositions[year] || 0 }}
              >
                <h3 className="text-xl font-medium text-neutral-600 bg-gray-50 px-3">{year}</h3>
              </div>
            </div>
            {/* Publications container */}
            <div className="flex flex-col flex-1">
              {publications[year].map((pub) => (
                <PublicationCard
                  key={pub.id}
                  {...pub}
                  expanded={expandSection[pub.id]}
                  onToggle={() => toggleSection(pub.id, pub.title)}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

function PublicationCard({
  title,
  authors,
  venues,
  abstract,
  tldr,
  expanded,
  onToggle,
  paperLink,
  arxivLink,
  presentationLink,
  codeLink,
  awards,
  information,
}) {
  const handleLinkClick = (linkType) => {
    trackEvent('click_paper_link', 'publication', `${title} - ${linkType}`);
  };
  return (
    <div className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-lg p-5 flex flex-col w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onToggle}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-start items-center w-full">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-normal text-neutral-800 leading-tight" style={{fontFamily: 'Gill Sans, sans-serif'}}>{title}</h2>
              <p className="text-neutral-600 mt-1 text-sm">{authors.join(", ")}</p>
              <div className="mt-2 flex gap-2">
                {venues.map((venue, index) => (
                  <span
                    key={index}
                    className="bg-neutral-200 text-neutral-800 text-xs font-semibold px-2.5 py-0.5 rounded news-font"
                  >
                    {venue}
                  </span>
                ))}
              </div>
              {awards && awards.length > 0 && (
                <div className="mt-3">
                  {awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <img
                        src="./star_icon.png"
                        alt="Award"
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-sm text-neutral-700 font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              )}
              {tldr && (
                <div className="mt-3 mr-8 p-3 rounded-r-md" style={{backgroundColor: '#e6efe6', borderLeft: '4px solid #447e3b'}}>
                  <p className="text-sm font-medium" style={{color: '#2d5a26'}}>
                    <span className="font-semibold text-xs uppercase tracking-wider mr-2" style={{fontFamily: 'Gill Sans, sans-serif', color: '#447e3b'}}>TL;DR</span>
                    {tldr}
                  </p>
                </div>
              )}
              {information && information.length > 0 && (
                <div className="mt-3">
                  {information.map((info, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <img
                        src="./information_icon.png"
                        alt="Information"
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-neutral-700">{info}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {arxivLink && (
                  <a
                    href={arxivLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit"
                    style={{fontFamily: 'Gill Sans, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('ArXiv', arxivLink)}
                  >
                    <img
                      src="./arxiv-logomark-small.svg"
                      alt="ArXiv Logo"
                      className="grayscale flex-shrink-0"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="ml-1 hidden sm:inline">ArXiv</span>
                  </a>
                )}
                {paperLink && (
                  <a
                    href={paperLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit"
                    style={{fontFamily: 'Gill Sans, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('PDF', paperLink)}
                  >
                    <img
                      src="./pdf_icon.png"
                      alt="PDF Icon"
                      className="flex-shrink-0"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="ml-1 hidden sm:inline">PDF</span>
                  </a>
                )}
                {presentationLink && (
                  <a
                    href={presentationLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit"
                    style={{fontFamily: 'Gill Sans, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('Presentation', presentationLink)}
                  >
                    <img
                      src="./slides_icon.png"
                      alt="Presentation Icon"
                      className="flex-shrink-0"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="ml-1 hidden sm:inline">Presentation</span>
                  </a>
                )}
                {codeLink && (
                  <a
                    href={codeLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit"
                    style={{fontFamily: 'Gill Sans, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('Code', codeLink)}
                  >
                    <img
                      src="./code_icon.png"
                      alt="Code Icon"
                      className="flex-shrink-0"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="ml-1 hidden sm:inline">Code</span>
                  </a>
                )}
              </div>
            </div>
            <div className="shrink-0 p-1 rounded-full hover:bg-neutral-200 transition-colors duration-150">
              <ChevronRightIcon className={`h-5 w-5 text-neutral-600 transition-transform duration-300 ease-out ${expanded ? 'transform rotate-90' : 'transform rotate-0'}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <hr className="my-2" />
        <div>
          <p className="mt-2">
            <span className="font-semibold news-font">Abstract</span>: {abstract}
          </p>
        </div>
      </div>
    </div>
  );
}