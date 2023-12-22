import './globals.css'
import { HomeIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Carter Blair',
  description: 'Carter Blair\'s personal website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50">
        {/* Top bar */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-neutral-100 p-4 flex items-center justify-between border-b-2 border-neutral-300">
          {/* Name and icon */}
          <div className="flex items-center ml-2">
            {/* Replace with your actual icon */}
            <img src="./icon.png" alt="Icon" className="h-9 w-9 mr-4" />
            <span className="text-3xl text-neutral-800">Carter Blair</span>
          </div>

          {/* Navigation links as buttons */}
          <ul className="flex space-x-4 mr-8">
            <li>
              <a href="/" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow">
                {/* <HomeIcon className="h-5 w-5 mr-2" /> */}
                Home
              </a>
            </li>
            <li>
              <a href="/research" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow">
                {/* <CodeBracketSquareIcon className="h-5 w-5 mr-2" /> */}
                Research
              </a>
            </li>
            <li>
              <a href="/books" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow">
                {/* <CodeBracketSquareIcon className="h-5 w-5 mr-2" /> */}
                Books
              </a>
            </li>
            <li>
              <a href="/links" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow">
                {/* <CodeBracketSquareIcon className="h-5 w-5 mr-2" /> */}
                Links
              </a>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="pt-20 p-4 bg-neutral-50">
          {children}
        </div>
      </body>
    </html>
  )
}
