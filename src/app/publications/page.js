"use client";

import Publications from '../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-8">
        <div className="text-center relative">
          <h1 className="text-3xl font-medium text-neutral-800" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Research
          </h1>
          <p className="text-neutral-600 text-sm mt-6 font-light tracking-wide max-w-md mx-auto" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Social Choice Theory • AI Alignment • Preference Elicitation • Generative Social Choice • Human-AI Interaction
          </p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4 min-w-0 w-full">
        <Publications />
      </main>
    </div>
  )
}