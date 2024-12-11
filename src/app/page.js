"use client";

import Profile from './components/Profile'
import News from './components/News'
import Publications from './components/Publications'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center pt-12 bg-gray-50">
      <main className="flex-1 max-w-5xl mx-auto p-">
        <Profile />
        <News />
        <Publications />
      </main>
    </div>
  )
}