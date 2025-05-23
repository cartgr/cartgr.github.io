"use client";

import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
// use the next Link component to navigate between pages
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isMenuOpen) {
            setShowMenu(true);
        } else {
            // Delay the hiding of the menu to allow for the fade-out effect
            const timer = setTimeout(() => {
                setShowMenu(false);
            }, 300); // This duration should match the CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* Hamburger menu for smaller screens */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md focus:outline-none focus:ring"
                    aria-label="Open menu"
                >
                    <Bars3Icon className="h-6 w-6 text-neutral-800" />
                </button>
            </div>

            {/* Navigation links as buttons */}
            <ul className={`absolute md:relative bg-neutral-100 md:bg-transparent w-full md:w-auto transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'} ${showMenu ? 'visible' : 'invisible'} md:opacity-100 md:visible ${showMenu ? 'top-16' : ''} left-0 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mr-8 py-4 md:py-0 px-4 md:px-0`}>
                <li>
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className={`flex items-center px-4 py-2 ${pathname === '/' ? 'bg-neutral-200 cursor-default' : 'bg-neutral-50'} text-neutral-800 rounded-md shadow ${pathname === '/' ? '' : 'hover:shadow-lg'} transition duration-300 ease-in-out`} style={{fontFamily: 'Gill Sans, sans-serif'}}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/publications" onClick={() => setIsMenuOpen(false)} className={`flex items-center px-4 py-2 ${pathname === '/publications' ? 'bg-neutral-200 cursor-default' : 'bg-neutral-50'} text-neutral-800 rounded-md shadow ${pathname === '/publications' ? '' : 'hover:shadow-lg'} transition duration-300 ease-in-out`} style={{fontFamily: 'Gill Sans, sans-serif'}}>
                        Research
                    </Link>
                </li>
                {/* <li>
                    <Link href="/research" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Research
                    </Link>
                </li>
                <li>
                    <Link href="/books" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Books
                    </Link>
                </li>
                <li>
                    <Link href="/links" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Links & Posts
                    </Link>
                </li> */}
            </ul>
        </>
    );
};

export default Menu;
