"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Research() {
    const [expandSection, setExpandSection] = useState({ 1: false, 2: false, 3: false });

    const toggleSection = (section) => {
        setExpandSection({ ...expandSection, [section]: !expandSection[section] });
    }

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Main content area */}
            <main className="flex-1 p-8">
                {/* Section 1 */}
                <section className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(1)}>
                        <div>
                            <h2 className="text-2xl font-medium">Language to Rewards for Value Alignment</h2>
                            <p className="mt-1 text-gray-500">2023 - Present</p>
                        </div>
                        {expandSection[1] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="mb-2 mt-2 italic">How can language help guide AI towards human values and objectives. <span className="text-green-600 cursor-pointer" onClick={() => toggleSection(1)}>See More</span></p>
                        {expandSection[1] && <div><hr className="mb-2 mt-4" /><p className='mt-2'>Content for section 1 goes here...</p></div>}
                    </div>
                </section>

                {/* Section 2 */}
                <section className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(2)}>
                        <div>
                            <h2 className="text-2xl font-medium">Game-Theoretic Multi-Objective RL</h2>
                            <p className="mt-1 text-gray-500">2023 - Present</p>
                        </div>
                        {expandSection[2] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="mb-2 mt-2 italic">Exploring how game theoretic concepts like Nash-bargaining can be used to balance multiple objectives in multi-objective RL. <span className="text-green-600 cursor-pointer" onClick={() => toggleSection(2)}>See More</span></p>
                        {expandSection[2] && <div><hr className="my-2" /><p>Content for section 2 goes here...</p></div>}
                    </div>
                </section>

                {/* Section 3 */}
                <section className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(3)}>
                        <div>
                            <h2 className="text-2xl font-medium">RL Mechanism Design, Social Planning & Social Choice</h2>
                            <p className="mt-1 text-gray-500">2023 - Present</p>
                        </div>
                        {expandSection[3] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                    </div>
                    <hr className="my-2" />
                    <div>
                        <p className="mb-2 mt-2 italic">Using RL to design mechanisms. <span className="text-green-600 cursor-pointer" onClick={() => toggleSection(3)}>See More</span></p>
                        {expandSection[3] && <div><hr className="my-2" /><p>Content for section 3 goes here...</p></div>}
                    </div>
                </section>
                
            </main>
        </div>
    )
}
