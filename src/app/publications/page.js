"use client";

import { useState } from 'react';
import Publications from '../components/Publications'

export default function PublicationsPage() {
  const [activeFilters, setActiveFilters] = useState([]);

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
          <h1 className="text-3xl font-medium text-neutral-800" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Research
          </h1>
          <p className="text-neutral-600 text-sm mt-6 font-light tracking-wide max-w-2xl mx-auto" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            My research centres on pluralistic <button onClick={() => toggleFilter('AI Alignment')} className="text-green-600 hover:underline cursor-pointer">AI alignment</button> and <button onClick={() => toggleFilter('Generative Social Choice')} className="text-green-600 hover:underline cursor-pointer">generative social choice</button>. A component of this work is <button onClick={() => toggleFilter('Preference Elicitation')} className="text-green-600 hover:underline cursor-pointer">preference elicitation</button>, particularly through verbal interactions with large language models, to obtain nuanced human preference information. This preference data is then applied in two primary ways. First, in conjunction with ideas from <button onClick={() => toggleFilter('Social Choice Theory')} className="text-green-600 hover:underline cursor-pointer">social choice theory</button>, it informs approaches to pluralistic <button onClick={() => toggleFilter('AI Alignment')} className="text-green-600 hover:underline cursor-pointer">AI alignment</button>. Second, in <button onClick={() => toggleFilter('Generative Social Choice')} className="text-green-600 hover:underline cursor-pointer">generative social choice</button>, this elicited information, and other free-form input, allows for the generation of alternatives from individual expressions. This can help mitigate the agenda control limitations present in traditional <button onClick={() => toggleFilter('Social Choice Theory')} className="text-green-600 hover:underline cursor-pointer">social choice theory</button>, where alternatives are often predefined rather than derived from voter input.
          </p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4 min-w-0 w-full">
        <Publications activeFilters={activeFilters} onToggleFilter={toggleFilter} />
      </main>
    </div>
  )
}