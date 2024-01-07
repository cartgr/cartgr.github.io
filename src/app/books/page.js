"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import GametheoryVSI from './reviews/gametheoryVSI.js';
import Wizardofearthsea from './reviews/wizardofearthsea.js';

export default function Books() {
    const [expandSection, setExpandSection] = useState({ 1: false, 2: false, 3: false });

    const toggleSection = (section) => {
        setExpandSection({ ...expandSection, [section]: !expandSection[section] });
    }

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Main content area */}
            <main className="flex-1 p-8">
                {/* Section 1 */}
                <section className="mb-12 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(1)}>
                        <h2 className="text-2xl font-medium">2023 Book Reviews</h2>
                        {expandSection[1] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="mb-2 mt-2 italic">A short review for each book I read in 2023. I definitely won't be entering these into any book review competitions, but writing some short reviews is something I've been wanting to do for a while. Also, I wrote all of these over the 2023 Christmas break, so the earlier reviews (closer to the bottom) are probably quite tinged by memory. <span className="text-green-600 cursor-pointer" onClick={() => toggleSection(1)}>See More</span></p>
                        {expandSection[1] &&
                            <div>
                                <hr className="mb-2 mt-4" />
                                <Wizardofearthsea />
                                <p className='mt-4'></p>
                                <GametheoryVSI />

                            </div>
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}
