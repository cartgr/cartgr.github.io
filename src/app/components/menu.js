"use client";

import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

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
                    <a href="/website2.0" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/website2.0/research" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Research
                    </a>
                </li>
                <li>
                    <a href="/website2.0/books" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Books
                    </a>
                </li>
                <li>
                    <a href="/website2.0/links" className="flex items-center px-4 py-2 bg-neutral-50 text-neutral-800 rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
                        Links & Posts
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Menu;
