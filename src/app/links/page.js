"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Links() {
    const [expandSection, setExpandSection] = useState({ 1: false, 2: false, 3: false });

    const linksq42023 = [
        {
            url: "https://example.com/link1",
            title: "Interesting Article 1",
            description: () => (
                <>
                    <p>This article provides insightful views on the topic.</p>
                    <p>Another paragraph about this article can go here.</p>
                </>
            )
        },
        {
            url: "https://example.com/link2",
            title: "Resource 2"
            // No description provided
        },
        {
            url: "https://example.com/link3",
            title: "Topic Discussion 3",
            description: () => (
                <>
                    <p>My thoughts on this discussion: It's very thought-provoking.</p>
                    <p>Additional commentary or quotes can be added here.</p>
                </>
            )
        }
        // Add more links as needed
    ];

    const toggleSection = (section) => {
        setExpandSection({ ...expandSection, [section]: !expandSection[section] });
    }

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Main content area */}
            <main className="flex-1 p-8">
                {/* Section 1 */}
                <section className="mb-4 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(1)}>
                        <div>
                            <h2 className="text-2xl font-medium">Tuning LLMs with Game Reward</h2>
                            <p className="mt-1 text-gray-500">December 26, 2023</p>
                        </div>
                        {expandSection[1] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>

                    <div>
                        {expandSection[1] &&
                            <div>
                                <hr className="mb-2 mt-4" />
                                <p className='mt-4 italic'>Coming soon</p>
                            </div>
                        }
                    </div>
                </section>

                <section className="mb-4 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(2)}>
                        <h2 className="text-2xl font-medium">2023 Q4 Links</h2>
                        {expandSection[2] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                    {expandSection[2] &&
                        <div>
                            <hr className="mb-2 mt-4" />
                            <ul className='list-disc list-inside mt-4'>
                                {linksq42023.map((link, index) => (
                                    <li key={index} className='my-2'>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer"
                                            className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out">
                                            {link.title}
                                        </a>
                                        {link.description && <div className="text-sm ml-5 mt-1">{link.description()}</div>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </section>

            </main>
        </div>
    )
}
