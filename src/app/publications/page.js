"use client";

import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Publications from '../components/Publications'

export default function PublicationsPage() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [blurbExpanded, setBlurbExpanded] = useState(false);

  const toggleFilter = (tag) => {
    setActiveFilters(prev => {
      if (prev.includes(tag)) {
        return prev.filter(f => f !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-8">
        <div className="text-center relative">
          <h1 className="text-3xl font-medium text-neutral-800" style={{ fontFamily: 'Gill Sans, Raleway, sans-serif' }}>
            Research
          </h1>
          <div className="text-neutral-600 text-sm mt-6 font-light tracking-wide max-w-2xl mx-auto" style={{ fontFamily: 'Gill Sans, Raleway, sans-serif' }}>
            <p>
              My research focuses on aligning AI with a plurality of human values and using AI to improve group decision-making.{' '}
              <button 
                onClick={() => setBlurbExpanded(!blurbExpanded)}
                className="text-green-600 hover:underline cursor-pointer font-medium"
              >
                {blurbExpanded ? 'Read less' : 'Read more'} <ChevronRightIcon className={`h-3 w-3 inline transition-transform duration-300 ease-out ${blurbExpanded ? 'transform rotate-90' : 'transform rotate-0'}`} />
              </button>
            </p>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${blurbExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="mt-3">
                Both of these directions benefit from obtaining high quality preference data. As such, I am interested in methods for <button onClick={() => toggleFilter('Preference Elicitation')} className="text-green-600 hover:underline cursor-pointer">eliciting nuanced and unconstrained preferences</button>, for example verbally with LLMs. This preference data informs my work in two ways. First, for <button onClick={() => toggleFilter('Alignment')} className="text-green-600 hover:underline cursor-pointer">alignment</button>, I am interested in applying ideas from <button onClick={() => toggleFilter('Social Choice')} className="text-green-600 hover:underline cursor-pointer">social choice</button> and reinforcement learning to help transform this (offline) preference data into normatively desirable policies. Second, for <button onClick={() => toggleFilter('Generative Social Choice')} className="text-green-600 hover:underline cursor-pointer">generative social choice</button>, I am interested in turning this verbal preference data into collective textual outputs such as consensus statements or representative slates of statements with theoretical guarantees.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4 min-w-0 w-full">
        <Publications activeFilters={activeFilters} onToggleFilter={toggleFilter} />
      </main>
    </div>
  )
}