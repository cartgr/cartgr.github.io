import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-start pt-12 bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 max-w-5xl mx-auto p-">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Profile Image */}
          <div className="md:col-span-1">
            <Image
              src="public/HEADSHOT.jpg" // Adjust the path to your image
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
              My research mainly focuses on the intersection between game theory, reinforcement learning, and human-AI interaction. Recently I have been working on reward design and augmenting RL with foundation models.
            </p>
            <hr className="border-gray-300 mb-4" />
            <p className='text-neutral-800 mb-4'>
              You can reach me at cblair at uwaterloo dot ca.
            </p>


          </div>

        </div>

        {/* News Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium mb-4 text-neutral-800">News</h2>
          <ul className="list-disc pl-5">
            {/* Example news item */}
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold">September 2023</span>: Started MMath CS at UWaterloo, supervised by Kate Larson and Edith Law.
            </li>
            <li className="mb-2 text-neutral-800">
              <span className="font-semibold">April 2021</span>: Awarded NSERC Undergraduate Student Research Award (USRA) Grant to do research with Dr. Charles Perin for the summer.
            </li>
            {/* Add more news items here */}
          </ul>
        </section>
      </main>
    </div>
  )
}
