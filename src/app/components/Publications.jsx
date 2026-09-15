"use client";

import { useState } from 'react';
import publicationsData from '../data/publications.json';
import { trackEvent } from './Analytics';

const serif = { fontFamily: 'EB Garamond, var(--font-cardo), serif' };
const oldstyle = { ...serif, fontFeatureSettings: '"onum" 1' };

export default function Publications() {
  const { workingPapers, publications } = publicationsData;
  const years = Object.keys(publications).sort((a, b) => b - a);

  return (
    <section className="w-full min-w-0">
      <h1 className="sr-only">Publications</h1>

      {workingPapers.length > 0 && (
        <div className="mb-20 last:mb-0">
          <SectionLabel>Working Papers</SectionLabel>
          <div className="space-y-12">
            {workingPapers.map((paper) => (
              <Publication key={paper.id} {...paper} />
            ))}
          </div>
        </div>
      )}

      {years.map((year) => (
        <div key={year} className="mb-20 last:mb-0">
          <SectionLabel>{year}</SectionLabel>
          <div className="space-y-12">
            {publications[year].map((pub) => (
              <Publication key={pub.id} {...pub} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* Section heading: small tracked label with a hairline running to the margin */
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2
        className="text-[1.05rem] text-stone-500 shrink-0"
        style={oldstyle}
      >
        {children}
      </h2>
      <div className="h-px flex-1 bg-stone-200" />
    </div>
  );
}

const LINKS = [
  ['paperLink', 'PDF'],
  ['arxivLink', 'arXiv'],
  ['codeLink', 'Code'],
  ['presentationLink', 'Slides'],
  ['modelLink', 'Model'],
];

function Publication(pub) {
  const {
    title,
    authors,
    alphabeticalOrder,
    venues,
    abstract,
    tldr,
    awards,
    information,
  } = pub;

  const [expanded, setExpanded] = useState(false);

  const toggleAbstract = () => {
    if (!expanded) trackEvent('expand_abstract', 'publication', title);
    setExpanded((v) => !v);
  };

  const links = LINKS.filter(([key]) => pub[key]);

  return (
    <article>
      <h3 className="text-[1.3rem] text-stone-900 leading-snug" style={serif}>
        {title}
      </h3>

      <p className="text-[0.9rem] text-stone-500 mt-2 leading-snug" style={serif}>
        {alphabeticalOrder && (
          <span className="relative group inline-block mr-1">
            <span className="text-stone-400 cursor-help">(α-β)</span>
            <span
              className="absolute left-0 top-full pt-1.5 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50"
              aria-hidden="true"
            >
              <span className="block bg-stone-800 text-stone-100 text-[0.8rem] px-3 py-1.5 whitespace-nowrap">
                alphabetical author order
              </span>
            </span>
          </span>
        )}
        {authors.map((author, i) => (
          <span key={author}>
            <span className={author === 'Carter Blair' ? 'text-stone-800' : undefined}>
              {author}
            </span>
            {i < authors.length - 1 && <span className="text-stone-400">, </span>}
          </span>
        ))}
      </p>

      {venues && venues.length > 0 && (
        <p className="text-[0.85rem] text-stone-600 mt-2" style={serif}>
          {venues.join(' · ')}
        </p>
      )}

      {awards && awards.length > 0 && (
        <div className="mt-2">
          {awards.map((award) => (
            <p
              key={award}
              className="text-[0.8rem] uppercase tracking-[0.12em] text-stone-600"
              style={serif}
            >
              {award}
            </p>
          ))}
        </div>
      )}

      {tldr && (
        <p
          className="mt-4 text-[0.95rem] text-stone-600 leading-relaxed"
          style={serif}
        >
          {tldr}
        </p>
      )}

      {information && information.length > 0 && (
        <div className="mt-4">
          {information.map((info) => (
            <p key={info} className="text-[0.85rem] text-stone-400 leading-snug" style={serif}>
              {info}
            </p>
          ))}
        </div>
      )}

      <div
        className="mt-4 flex items-center flex-wrap text-[0.85rem] text-stone-500"
        style={serif}
      >
        {links.map(([key, label], i) => (
          <span key={key} className="flex items-center">
            {i > 0 && <span className="text-stone-300 mx-2">·</span>}
            <a
              href={pub[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 hover:underline underline-offset-[3px] decoration-stone-300"
              onClick={() => trackEvent('click_paper_link', 'publication', `${title} - ${label}`)}
            >
              {label}
            </a>
          </span>
        ))}
        {abstract && (
          <span className="flex items-center">
            {links.length > 0 && <span className="text-stone-300 mx-2">·</span>}
            <button
              onClick={toggleAbstract}
              aria-expanded={expanded}
              className="hover:text-stone-900 hover:underline underline-offset-[3px] decoration-stone-300 flex items-center gap-1"
            >
              Abstract
              <span
                className="text-[0.7rem] text-stone-400 transition-transform duration-200 inline-block"
                style={{ transform: expanded ? 'rotate(90deg)' : 'none' }}
              >
                ›
              </span>
            </button>
          </span>
        )}
      </div>

      {abstract && (
        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? '1fr' : '0fr', opacity: expanded ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <p
              className="mt-4 pl-4 border-l border-stone-200 text-[0.925rem] text-stone-600 leading-relaxed whitespace-pre-line"
              style={serif}
            >
              {abstract}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
