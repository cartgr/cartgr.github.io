"use client";

import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
// use the next Link component to navigate between pages
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const serif = { fontFamily: 'EB Garamond, var(--font-cardo), serif' };

const NAV = [
    { href: '/', label: 'Home', isActive: (p) => p === '/' },
    { href: '/publications', label: 'Publications', isActive: (p) => p.startsWith('/publications') },
];

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

    // The masthead scrolls away, so an open sheet should close rather than drift off-screen
    useEffect(() => {
        if (!isMenuOpen) return;
        const close = () => setIsMenuOpen(false);
        window.addEventListener('scroll', close, { passive: true });
        return () => window.removeEventListener('scroll', close);
    }, [isMenuOpen]);

    const fade = `transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'} ${showMenu ? 'visible' : 'invisible'}`;

    return (
        <>
            {/* Hamburger menu for smaller screens */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-stone-500 hover:text-stone-900 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400"
                    aria-label="Open menu"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* Scrim: sits the open sheet above the page instead of appearing to clip it */}
            <div
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
                className={`md:hidden fixed inset-x-0 top-[100px] bottom-0 bg-stone-900/10 ${fade} ${isMenuOpen ? '' : 'pointer-events-none'}`}
            />

            {/* Navigation links */}
            <ul
                className={`absolute md:relative z-10 bg-paper md:bg-transparent border-b border-stone-200 md:border-0 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.5)] md:shadow-none w-full md:w-auto ${fade} md:opacity-100 md:visible ${showMenu ? 'top-full' : ''} left-0 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0 px-4 md:px-0`}
                style={serif}
            >
                {NAV.map(({ href, label, isActive }) => {
                    const active = isActive(pathname);
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                                aria-current={active ? 'page' : undefined}
                                className={`text-[1.05rem] transition-colors duration-200 ${
                                    active
                                        ? 'text-stone-900 underline decoration-1 decoration-stone-400 underline-offset-[7px] cursor-default'
                                        : 'text-stone-500 hover:text-stone-900'
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Menu;
