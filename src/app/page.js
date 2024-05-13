"use client";

import Image from 'next/image'
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


export default function Home() {

  const [expandSection, setExpandSection] = useState({ 1: false, 2: false, 3: false });

  const toggleSection = (section) => {
    setExpandSection({ ...expandSection, [section]: !expandSection[section] });
  }

  return (
    <div className="flex flex-col min-h-screen justify-center pt-12 bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 max-w-5xl mx-auto p-">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Profile Image */}
          <div className="md:col-span-1">
            <Image
              src="./newHead.JPG" // Adjust the path to your image
              alt="Picture of the author"
              width={250} // Adjusted width
              height={250} // Adjusted height to maintain aspect ratio
              className="rounded-sm" // Rounded image
            />
          </div>

          {/* Bio Section */}
          <div className="md:col-span-2 text-gray-600 text-lg">
            <p className='mb-4 text-neutral-800'>
              I am currently doing a Master of Math in Computer Science at UWaterloo where I&apos;m supervised by
              <a
                href="https://cs.uwaterloo.ca/~klarson/"
                className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kate Larson
              </a>
              and
              <a
                href="https://edithlaw.ca/"
                className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Edith Law
              </a>.
              My research mainly focuses on the intersection between social choice, reinforcement learning, and human-AI interaction. I'm currently working on increasing the granularity of alignment.
            </p>
            <hr className="border-gray-300 mb-4" />
            <p className='text-neutral-800 mb-4'>
              You can reach me at cblair at uwaterloo dot ca.
            </p>
            <div className="mt-4 flex flex-row">

              <a
                href="https://scholar.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <img
                  src="./googleScholar.svg"
                  alt="Google Scholar Logo"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/carter-blair-b70429200/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <img
                  src="./linkedin.svg"
                  alt="LinkedIn Logo"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://github.com/cartgr"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <img
                  src="./github.svg"
                  alt="GitHub Logo"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="./cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <img
                  src="./cv.svg"
                  alt="CV Logo"
                  className="w-8 h-8"
                />
              </a>


            </div>



          </div>

        </div>

        {/* News Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium mb-4 text-neutral-800 ">News</h2>
          <ul className="list-disc pl-5 max-h-30 overflow-y-auto hide-scrollbar">
            {/* Example news item */}
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">May 2024</span>: I will be at AAMAS 2024 in Auckland, New Zealand presenting our paper <a
                href="https://drive.google.com/file/d/1v3IQ6gzELfhqocp9Wc4rcEMeNYHKEnEo/view"
                className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Liquid Ensemble Selection for Continual Learning
              </a> at the
              <a
                href="https://sites.google.com/view/scala24/"
                className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                SCaLA workshop.
              </a>
            </li>
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">April 2024</span>: Our paper <a
                href="https://drive.google.com/file/d/1v3IQ6gzELfhqocp9Wc4rcEMeNYHKEnEo/view"
                className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Liquid Ensemble Selection for Continual Learning
              </a> (with Ben Armstrong and Kate Larson) was accepted to Canadian AI 2024.
            </li>
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">September 2023</span>: Started MMath CS at UWaterloo, supervised by Kate Larson and Edith Law.
            </li>
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">April 2021</span>: Awarded NSERC Undergraduate Student Research Award (USRA) Grant to do research with Dr. Charles Perin for the summer.
            </li>
          </ul>
        </section>

        {/* Publications Section */}
        <section className="mt-12">

          <h2 className="text-2xl font-medium mb-4 text-neutral-800">Publications</h2>

          <div className='flex flex-col'>
            <div className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col w-full">
              <div className="grid grid-cols-3 items-center">
                <div className='mr-12'>
                  <img
                    src="./liquid_ensemble_selection.png" // Adjust the path to your image
                    alt="Icon"
                    className="w-full h-auto" // Adjust to maintain aspect ratio while filling the column
                  />
                </div>
                <div className="col-span-2 flex items-center justify-between pl-4">
                  <div className="flex-1">
                    <div className="flex justify-start items-center w-full">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-medium">Liquid Ensemble Selection For Continual Learning</h2>
                        {/* <p className="mt-1 text-gray-500">SCaLA Workshop 2024 and Canadian AI Conference 2024</p> */}
                        <div className="mt-2 flex gap-2">
                          <span className="bg-neutral-200 text-neutral-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded news-font">AAMAS SCaLA Workshop 2024</span>
                          <span className="bg-neutral-200 text-neutral-800 text-xs font-semibold px-2.5 py-0.5 rounded news-font">Canadian AI 2024</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <a
                            href="https://arxiv.org/abs/your-paper-id"
                            className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src="./arxiv-logomark-small.svg" alt="ArXiv Logo" className="grayscale mr-1" style={{ width: '20px', height: '20px' }} />
                            ArXiv
                          </a>
                          <a
                            href="./papers/SCaLA_AAMAS_Liquid_Ensembles.pdf"
                            className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            PDF
                          </a>
                        </div>
                      </div>
                      <div onClick={() => toggleSection(1)} className="shrink-0 cursor-pointer">
                        {expandSection[1] ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {expandSection[1] && (
                <div>
                  <hr className="my-2" />
                  <div>

                    <p className="mt-2"> <span className="font-semibold news-font">Abstract</span>: Continual learning aims to enable machine learning models to continually learn from a shifting data distribution without forgetting
                      what has already been learned. Such shifting distributions can be
                      broken into disjoint subsets of related examples; by training each
                      member of an ensemble on a different subset it is possible for the
                      ensemble as a whole to achieve much higher accuracy with less
                      forgetting than a naive model. We address the problem of selecting
                      which models within an ensemble should learn on any given data,
                      and which should predict. By drawing on work from delegative
                      voting we develop an algorithm for using delegation to dynamically
                      select which models in an ensemble are active. We explore a variety
                      of delegation methods and performance metrics, ultimately finding
                      that delegation is able to provide a significant performance boost
                      over naive learning in the face of distribution shifts.</p>
                  </div>
                </div>
              )}
            </div>
          </div>


        </section>
      </main>
    </div >
  )
}
