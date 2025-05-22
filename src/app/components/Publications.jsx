"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
              {/* Vertical line */}
              <div
                ref={(el) => (timelineRefs.current[year] = el)}
                className="absolute w-[1px] top-0 bottom-8 bg-neutral-300 left-1/2 transform -translate-x-1/2"
              />
              {/* Top dot */}
              <div className="absolute top-0 w-2 h-2 bg-neutral-400 rounded-full left-1/2 transform -translate-x-1/2" />
              {/* Bottom dot */}
              <div className="absolute bottom-8 w-2 h-2 bg-neutral-400 rounded-full left-1/2 transform -translate-x-1/2" />
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
  expanded,
  onToggle,
  paperLink,
  arxivLink,
  slidesLink,
  codeLink,
  notes,
}) {
  const handleLinkClick = (linkType, url) => {
    trackEvent('click_paper_link', 'publication', `${title} - ${linkType}`);
  };
  return (
    <div className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-start items-center w-full">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-medium">{title}</h2>
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
              {notes && (
                <p className="mt-3 text-sm text-neutral-700 italic">
                  {notes}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                {arxivLink && (
                  <a
                    href={arxivLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('ArXiv', arxivLink)}
                  >
                    <img
                      src="./arxiv-logomark-small.svg"
                      alt="ArXiv Logo"
                      className="grayscale mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                    ArXiv
                  </a>
                )}
                {paperLink && (
                  <a
                    href={paperLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('PDF', paperLink)}
                  >
                    <img
                      src="./pdf_icon.png"
                      alt="PDF Icon"
                      className="mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                    PDF
                  </a>
                )}
                {slidesLink && (
                  <a
                    href={slidesLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('Slides', slidesLink)}
                  >
                    <img
                      src="./slides_icon.png"
                      alt="Slides Icon"
                      className="mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Slides
                  </a>
                )}
                {codeLink && (
                  <a
                    href={codeLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('Code', codeLink)}
                  >
                    <img
                      src="./code_icon.png"
                      alt="Code Icon"
                      className="mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Code
                  </a>
                )}
              </div>
            </div>
            <div onClick={onToggle} className="shrink-0 cursor-pointer">
              {expanded ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div>
          <hr className="my-2" />
          <div>
            <p className="mt-2">
              <span className="font-semibold news-font">Abstract</span>: {abstract}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}