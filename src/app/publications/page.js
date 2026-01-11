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
      <main className="flex-1 max-w-6xl mx-auto p-4 min-w-0 w-full pt-8">
        <Publications activeFilters={activeFilters} onToggleFilter={toggleFilter} />
      </main>
    </div>
  )
}