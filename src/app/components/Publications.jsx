"use client";

import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import publicationsData from '../data/publications.json';
import { trackEvent } from './Analytics';

export default function Publications({ activeFilters = [], onToggleFilter }) {
  const [expandSection, setExpandSection] = useState({});

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
    if (onToggleFilter) {
      onToggleFilter(tag);
    }
  };

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
      <div className="mb-6">
        <h3 className="text-lg font-normal mb-4 text-neutral-800" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>Filter by Topic</h3>
        <div className="flex flex-wrap gap-2">
          {sortedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-4 py-2 rounded-md text-sm font-normal transition-all duration-200 border ${
                activeFilters.includes(tag)
                  ? 'bg-neutral-700 text-white border-neutral-700'
                  : 'bg-transparent text-neutral-600 border-neutral-300 hover:border-neutral-400 hover:text-neutral-800'
              }`}
              style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-neutral-200 mb-6" />

      {filteredWorkingPapers.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-normal mb-6 text-neutral-800" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>Working Papers</h2>
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
        <h2 className="text-2xl font-normal mb-6 text-neutral-800" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>Publications</h2>
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
                  className="absolute w-[1px] top-0 bottom-8 left-1/2 transform -translate-x-1/2"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, #d4d4d8 15%, #d4d4d8 85%, transparent 100%)'
                  }}
                />
                {/* Year label - sticky positioning */}
                <div className="sticky top-24 h-fit z-10">
                  <h3 className="text-xl font-medium text-neutral-600 px-3 py-3" style={{background: 'linear-gradient(to bottom, transparent, #f9fafb 25%, #f9fafb 75%, transparent)'}}>{year}</h3>
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
              <div className="bg-neutral-50 border-neutral-200 border rounded-lg p-8 text-center">
                <p className="text-neutral-600 text-lg" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>
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
  alphabeticalOrder,
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
    <div className={`${!isWorkingPaper ? 'mb-8' : ''} bg-neutral-50 border-neutral-200 border rounded-lg p-5 flex flex-col w-full overflow-hidden hover:border-neutral-400 transition-all duration-200 sm:cursor-pointer relative z-20`} onClick={() => {
      if (window.innerWidth >= 640) {
        onToggle();
      }
    }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-start items-center w-full">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-normal text-neutral-800 leading-tight" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}>{title}</h2>
              <p className="text-neutral-600 mt-1 text-sm">{alphabeticalOrder && <span className="text-neutral-400 mr-1">(α)</span>}{authors.join(", ")}</p>
              <div className="mt-2 flex gap-2">
                {venues.map((venue, index) => (
                  <span
                    key={index}
                    className="bg-neutral-200 text-neutral-800 text-xs font-normal px-2.5 py-0.5 rounded news-font"
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
                <div className="mt-3 mr-8 p-3 rounded-r-md hidden sm:block" style={{backgroundColor: '#e6efe6', borderLeft: '2px solid #447e3b'}}>
                  <p className="text-sm font-normal" style={{color: '#2d5a26'}}>
                    <span className="font-normal text-xs uppercase tracking-wider mr-2" style={{fontFamily: 'EB Garamond, var(--font-cardo), serif', color: '#447e3b'}}>TL;DR</span>
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
                    className="bg-transparent text-neutral-600 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 hover:border-neutral-400 hover:text-neutral-800 sm:min-w-0 min-w-fit transition-all duration-200"
                    style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
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
                    className="bg-transparent text-neutral-600 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 hover:border-neutral-400 hover:text-neutral-800 sm:min-w-0 min-w-fit transition-all duration-200"
                    style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
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
                    className="bg-transparent text-neutral-600 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 hover:border-neutral-400 hover:text-neutral-800 sm:min-w-0 min-w-fit transition-all duration-200"
                    style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
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
                    className="bg-transparent text-neutral-600 px-3 py-2 rounded-md text-sm font-normal flex items-center border border-neutral-300 hover:border-neutral-400 hover:text-neutral-800 sm:min-w-0 min-w-fit transition-all duration-200"
                    style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
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
          <div className="mt-2 whitespace-pre-line">{abstract}</div>
          {tags && tags.length > 0 && (
            <div className="mt-4">
              <span className="font-normal news-font mr-2">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-neutral-200 text-neutral-700 text-xs rounded-md"
                    style={{fontFamily: 'EB Garamond, var(--font-cardo), serif'}}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}