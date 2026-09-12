"use client";

import Profile from './components/Profile'
import News from './components/News'

export default function Home() {
  return (
    <div className="bg-paper">
      <main className="max-w-[52rem] mx-auto p-4 pb-24">
        <Profile />
        <News />
      </main>
    </div>
  )
}