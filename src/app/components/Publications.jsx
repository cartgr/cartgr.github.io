"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import publicationsData from '../data/publications.json';
import { trackEvent } from './Analytics';

export default function Publications({ activeFilters = [], onToggleFilter }) {
  const [expandSection, setExpandSection] = useState({});
  const [yearPositions, setYearPositions] = useState({});
  const [isFiltering, setIsFiltering] = useState(false);

  const timelineRefs = useRef({});

  const { workingPapers, publications } = publicationsData;


  // Get all unique tags from all publications
  const allTags = new Set();
  workingPapers.forEach(paper => {
    if (paper.tags) paper.tags.forEach(tag => allTags.add(tag));
  });
  Object.values(publications).flat().forEach(pub => {
    if (pub.tags) pub.tags.forEach(tag => allTags.add(tag));
  });
  const sortedTags = Array.from(allTags).sort();

  // Filter publications based on active filters
  const filteredWorkingPapers = workingPapers.filter(paper => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every(filter => paper.tags?.includes(filter));
  });

  const filteredPublications = {};
  Object.keys(publications).forEach(year => {
    const filteredPubs = publications[year].filter(pub => {
      if (activeFilters.length === 0) return true;
      return activeFilters.every(filter => pub.tags?.includes(filter));
    });
    if (filteredPubs.length > 0) {
      filteredPublications[year] = filteredPubs;
    }
  });

  const toggleFilter = (tag) => {
    setIsFiltering(true);
    // Reset year positions immediately to prevent sliding from previous positions
    setYearPositions({});
    
    if (onToggleFilter) {
      onToggleFilter(tag);
    }
  };

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

  // Refresh year positions when filters change
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
      setIsFiltering(false);
    };

    // Small delay to ensure DOM has updated after filtering
    const timeoutId = setTimeout(updateYearPositions, 50);
    return () => clearTimeout(timeoutId);
  }, [filteredPublications]);

  const toggleSection = (id, title) => {
    const wasExpanded = expandSection[id];
    setExpandSection((prev) => ({ ...prev, [id]: !prev[id] }));
    
    // Track abstract expansion
    if (!wasExpanded) {
      trackEvent('expand_abstract', 'publication', title);
    }
  };

  return (
    <section className="w-full min-w-0">
      {/* Filter Interface */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-neutral-800" style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}>Filter by Topic</h3>
        <div className="flex flex-wrap gap-2">
          {sortedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilters.includes(tag)
                  ? 'bg-neutral-700 text-white shadow-md'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
              style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredWorkingPapers.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6 text-neutral-800" style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}>Working Papers</h2>
          <div className="flex flex-col space-y-8">
            {filteredWorkingPapers.map((paper) => (
              <PublicationCard
                key={paper.id}
                {...paper}
                expanded={expandSection[paper.id]}
                onToggle={() => toggleSection(paper.id, paper.title)}
                isWorkingPaper={true}
                onTagClick={toggleFilter}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Only show Publications header if there are publications or no filters active */}
      {(Object.keys(filteredPublications).length > 0 || activeFilters.length === 0) && (
        <h2 className="text-2xl font-medium mb-6 text-neutral-800" style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}>Publications</h2>
      )}
      
      {/* Always show at least one timeline row to maintain layout */}
      {Object.keys(filteredPublications).length > 0 ? (
        Object.keys(filteredPublications)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year} className="flex mb-16">
              {/* Timeline column */}
              <div className="w-8 sm:w-20 shrink-0 relative flex justify-center">
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
                  className={`absolute z-10 left-1/2 transform -translate-x-1/2 ${!isFiltering ? 'transition-all duration-300 ease-out' : ''}`}
                  style={{ top: yearPositions[year] || 0 }}
                >
                  <h3 className="text-xl font-medium text-neutral-600 px-3 py-3" style={{background: 'linear-gradient(to bottom, transparent, #f9fafb, #f9fafb, transparent)'}}>{year}</h3>
                </div>
              </div>
              {/* Publications container */}
              <div className="flex flex-col flex-1 ml-4">
                {filteredPublications[year].map((pub) => (
                  <PublicationCard
                    key={pub.id}
                    {...pub}
                    expanded={expandSection[pub.id]}
                    onToggle={() => toggleSection(pub.id, pub.title)}
                    onTagClick={toggleFilter}
                  />
                ))}
              </div>
            </div>
          ))
      ) : (
        filteredWorkingPapers.length === 0 && activeFilters.length > 0 && (
          <div className="flex mb-16">
            {/* Timeline column - always maintain for layout consistency */}
            <div className="w-8 sm:w-20 shrink-0 relative flex justify-center">
              {/* Empty space to maintain layout */}
            </div>
            {/* Content area - maintain same width as when publications are present */}
            <div className="flex flex-col flex-1 ml-4">
              <div className="bg-neutral-100 border-neutral-300 border-2 rounded-lg p-8 text-center">
                <p className="text-neutral-600 text-lg" style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}>
                  No publications found matching the selected filters.
                </p>
                <p className="text-neutral-500 text-sm mt-2">
                  Try removing some filters or selecting different topics.
                </p>
              </div>
            </div>
          </div>
        )
      )}
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
  tags,
  onTagClick,
  isWorkingPaper = false,
}) {
  const handleLinkClick = (linkType) => {
    trackEvent('click_paper_link', 'publication', `${title} - ${linkType}`);
  };
  return (
    <div className={`${!isWorkingPaper ? 'mb-8' : ''} bg-neutral-100 border-neutral-300 border-2 rounded-lg p-5 flex flex-col w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 sm:cursor-pointer relative z-20`} onClick={() => {
      if (window.innerWidth >= 640) {
        onToggle();
      }
    }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-start items-center w-full">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-normal text-neutral-800 leading-tight" style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}>{title}</h2>
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
                        src="/star_icon.png"
                        alt="Award"
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-sm text-neutral-700 font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              )}
              {tldr && (
                <div className="mt-3 mr-8 p-3 rounded-r-md hidden sm:block" style={{backgroundColor: '#e6efe6', borderLeft: '4px solid #447e3b'}}>
                  <p className="text-sm font-medium" style={{color: '#2d5a26'}}>
                    <span className="font-semibold text-xs uppercase tracking-wider mr-2" style={{fontFamily: 'Gill Sans, Raleway, sans-serif', color: '#447e3b'}}>TL;DR</span>
                    {tldr}
                  </p>
                </div>
              )}
              {information && information.length > 0 && (
                <div className="mt-3">
                  {information.map((info, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <img
                        src="/information_icon.png"
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
                    className="bg-neutral-50 hover:shadow-md text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit transition-shadow duration-200"
                    style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick('ArXiv', arxivLink);
                    }}
                  >
                    <img
                      src="/arxiv-logomark-small.svg"
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
                    className="bg-neutral-50 hover:shadow-md text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit transition-shadow duration-200"
                    style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick('PDF', paperLink);
                    }}
                  >
                    <img
                      src="/pdf_icon.png"
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
                    className="bg-neutral-50 hover:shadow-md text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit transition-shadow duration-200"
                    style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick('Presentation', presentationLink);
                    }}
                  >
                    <img
                      src="/slides_icon.png"
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
                    className="bg-neutral-50 hover:shadow-md text-neutral-800 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 sm:min-w-0 min-w-fit transition-shadow duration-200"
                    style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick('Code', codeLink);
                    }}
                  >
                    <img
                      src="/code_icon.png"
                      alt="Code Icon"
                      className="flex-shrink-0"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="ml-1 hidden sm:inline">Code</span>
                  </a>
                )}
              </div>
            </div>
            <div className="shrink-0 p-1 rounded-full hover:bg-neutral-200 transition-colors duration-150 hidden sm:block">
              <ChevronRightIcon className={`h-5 w-5 text-neutral-600 transition-transform duration-300 ease-out ${expanded ? 'transform rotate-90' : 'transform rotate-0'}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out hidden sm:block ${expanded ? 'sm:opacity-100' : 'sm:max-h-0 sm:opacity-0'}`}>
        <hr className="my-2" />
        <div>
          <div className="mt-2">
            <span className="font-semibold news-font">Abstract</span>: 
            <div className="mt-1 whitespace-pre-line">{abstract}</div>
          </div>
          {tags && tags.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold news-font mr-2">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag);
                    }}
                    className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs rounded-full transition-colors duration-150 cursor-pointer"
                    style={{fontFamily: 'Gill Sans, Raleway, sans-serif'}}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}