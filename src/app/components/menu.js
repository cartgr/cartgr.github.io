"use client";

import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
// use the next Link component to navigate between pages
import Link from 'next/link';

const basePath = process.env.PUBLIC_URL || '';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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
            <div className="sm:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md focus:outline-none focus:ring"
                    aria-label="Open menu"
                >
                    <Bars3Icon className="h-6 w-6 text-neutral-800" />
                </button>
            </div>

            {/* Navigation links as buttons */}
            <ul className={`absolute sm:relative bg-neutral-100 sm:bg-transparent w-full sm:w-auto transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'} ${showMenu ? 'visible' : 'invisible'} sm:opacity-100 sm:visible ${showMenu ? 'top-16' : ''} left-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mr-8 py-4 sm:py-0 px-4 sm:px-0`}>
                <li>
                    <Link href="/" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Home
                    </Link>
                </li>
                <li>
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
                </li>
            </ul>
        </>
    );
};

export default Menu;
