"use client";

import Publications from '../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-8">
        <div className="text-center relative">
          <h1 className="text-3xl font-medium text-neutral-800 relative inline-block group" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Research
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
          </h1>
          <p className="text-neutral-600 text-sm mt-6 font-light tracking-wide max-w-md mx-auto" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Social Choice Theory • AI Alignment • Preference Elicitation • Generative Social Choice • Human-AI Interaction
          </p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4">
        <Publications />
      </main>
    </div>
  )
}