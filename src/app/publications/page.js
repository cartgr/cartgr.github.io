"use client";

import Publications from '../components/Publications'

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-14">
        <h1 className="text-4xl text-neutral-800" style={{fontFamily: 'Gill Sans, sans-serif'}}>Research</h1>
      </div>
      <main className="flex-1 max-w-5xl mx-auto p-4">
        <Publications />
      </main>
    </div>
  )
}