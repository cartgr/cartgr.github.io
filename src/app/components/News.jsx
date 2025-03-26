export default function News() {
    const newsItems = [
      {
        date: "December 2024",
        content: (
          <>
            Awarded the{" "}
            <a href="https://www.cooperativeai.com/post/announcing-the-2025-cooperative-ai-phd-scholars"
              className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              target="_blank"
              rel="noopener noreferrer">
              Cooperative AI PhD Fellowship
            </a>{" "}
            from the Cooperative AI Foundation.
          </>
        )
      },
      {
        date: "May 2024",
        content: (
          <>
            I will be at AAMAS 2024 in Auckland, New Zealand presenting our paper{" "}
            <a href="https://drive.google.com/file/d/1v3IQ6gzELfhqocp9Wc4rcEMeNYHKEnEo/view"
              className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              target="_blank"
              rel="noopener noreferrer">
              Liquid Ensemble Selection for Continual Learning
            </a> at the
            <a href="https://sites.google.com/view/scala24/"
              className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              target="_blank"
              rel="noopener noreferrer">
              SCaLA workshop.
            </a>
          </>
        )
      },
      {
        date: "April 2024",
        content: (
          <>
            Our paper{" "}
            <a href="https://drive.google.com/file/d/1v3IQ6gzELfhqocp9Wc4rcEMeNYHKEnEo/view"
              className="text-green-600 hover:bg-green-600 hover:text-neutral-100 hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              target="_blank"
              rel="noopener noreferrer">
              Liquid Ensemble Selection for Continual Learning
            </a> (with Ben Armstrong and Kate Larson) was accepted to Canadian AI 2024.
          </>
        )
      },
      {
        date: "September 2023",
        content: "Started MMath CS at UWaterloo, supervised by Kate Larson and Edith Law."
      },
      {
        date: "April 2021",
        content: "Awarded NSERC Undergraduate Student Research Award (USRA) Grant to do research with Dr. Charles Perin for the summer."
      }
    ];
  
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-medium mb-4 text-neutral-800">News</h2>
        <ul className="list-disc pl-5 max-h-30 overflow-y-auto hide-scrollbar">
          {newsItems.map((item, index) => (
            <li key={index} className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">{item.date}</span>: {item.content}
            </li>
          ))}
        </ul>
      </section>
    );
  }