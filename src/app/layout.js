import React from 'react';
import './globals.css';
import Menu from './components/menu';
import Link from 'next/link';

export const metadata = {
  title: 'Carter Blair',
  description: 'Carter Blair\'s personal website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50">
        {/* Add z-50 to ensure top bar stays above everything */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-neutral-100 p-4 flex items-center justify-between border-b-2 border-neutral-300 z-50">
          <Link href="/" className="flex items-center ml-2 space-x-4 no-underline text-neutral-800">
            <img src="./icon.png" alt="Icon" className="h-9 w-9 mr-2" />
            <span className="text-3xl">Carter Blair</span>
          </Link>

          <Menu />
        </div>

        {/* Add relative positioning to create a new stacking context */}
        <div className="pt-20 p-4 bg-neutral-50 relative">
          {children}
        </div>
      </body>
    </html>
  )
}
