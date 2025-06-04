"use client";

import Profile from './components/Profile'
import News from './components/News'

export default function Home() {
  return (
    <div className="pt-4 md:pt-12 bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 md:p-6">
        <Profile />
        <News />
      </main>
    </div>
  )
}