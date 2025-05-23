export default function News() {
    const newsItems = [
      {
        date: "December 2024",
        content: (
          <>
            Awarded the{" "}
            <a href="https://www.cooperativeai.com/post/announcing-the-2025-cooperative-ai-phd-scholars"
              className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              style={{color: '#16a34a'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#16a34a';
                e.target.style.color = '#f0f5f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#16a34a';
              }}
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
              className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              style={{color: '#16a34a'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#16a34a';
                e.target.style.color = '#f0f5f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#16a34a';
              }}
              target="_blank"
              rel="noopener noreferrer">
              Liquid Ensemble Selection for Continual Learning
            </a> at the
            <a href="https://sites.google.com/view/scala24/"
              className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              style={{color: '#16a34a'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#16a34a';
                e.target.style.color = '#f0f5f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#16a34a';
              }}
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
              className="hover:shadow-sm transition-all hover:px-1 hover:py-1 hover:rounded duration-300 ease-in-out mx-1"
              style={{color: '#16a34a'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#16a34a';
                e.target.style.color = '#f0f5f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#16a34a';
              }}
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
        <h2 className="text-2xl font-medium mb-4 text-neutral-800 font-['Gill_Sans']">News</h2>
        <ul className="list-disc pl-5 max-h-96 overflow-y-auto">
          {newsItems.map((item, index) => (
            <li key={index} className="mb-2 text-neutral-800">
              <span className="font-semibold news-font">{item.date}</span>: {item.content}
            </li>
          ))}
        </ul>
      </section>
    );
  }