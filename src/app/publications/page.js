"use client";

import Publications from '../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-14">
        <div className="text-center relative">
          <h1 className="text-5xl font-medium text-neutral-800 relative inline-block group" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Research
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-[28rem] h-1 bg-gradient-to-r from-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(to right, transparent 20%, #447e3b 40%, #447e3b 60%, transparent 80%)`}}></div>
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
          </h1>
          <p className="text-neutral-600 text-sm mt-6 font-light tracking-wide max-w-md mx-auto" style={{fontFamily: 'Gill Sans, sans-serif'}}>
            Social choice theory • AI alignment • Preference elicitation • Generative social choice • Human-AI interaction
          </p>
        </div>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4">
        <Publications />
      </main>
    </div>
  )
}