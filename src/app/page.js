"use client";

import Profile from './components/Profile'
import News from './components/News'

export default function Home() {
  return (
    <div className="pt-12 bg-gray-50">
      <main className="max-w-5xl mx-auto p-6">
        <Profile />
        <News />
      </main>
    </div>
  )
}