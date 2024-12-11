"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';

export default function Publications() {
  const [expandSection, setExpandSection] = useState({});
  const [yearPositions, setYearPositions] = useState({});

  const timelineRefs = useRef({});

  const publicationsData = {
    2024: [
      {
        id: 3,
        title: "Democratizing Reward Design for Personal and Representative Value-Alignment",
        authors: ["Carter Blair", "Kate Larson", "Edith Law"],
        venues: ["Under review for CHI 2025"],
        abstract: "Aligning AI agents with human values is challenging due to diverse and subjective notions of values. Standard alignment methods often aggregate crowd feedback, which can result in the suppression of unique or minority preferences. We introduce Interactive-Reflective Dialogue Alignment, a method that iteratively engages users in reflecting on and specifying their subjective value definitions. This system learns individual value definitions through language-model-based preference elicitation and constructs personalized reward models that can be used to align AI behaviour. We evaluated our system through two studies with 30 participants, one focusing on ``respect'' and the other on ethical decision-making in autonomous vehicles. Our findings demonstrate diverse definitions of value-aligned behaviour and show that our system can accurately capture each person's unique understanding. This approach enables personalized alignment and can inform more representative and interpretable collective alignment strategies.",
        paperLink: "./papers/democratizing_reward_design.pdf",
        arxivLink: "https://arxiv.org/abs/2410.22203",
      },
      {
        id: 4,
        title: "Altared Environments: The Role of Normative Infrastructure in AI Alignment",
        authors: ["Rakshit Trivedi", "Nikhil Chandak", "Carter Blair", "Atrisha Sarkar", "Tehilla Weltman", "Dylan Hadfield-Menell", "Gillian K Hadfield"],
        venues: ["Agentic Markets Workshop at ICML 2024"],
        abstract: "Cooperation is central to human life, distinguishing humans as ultra-cooperative among mammals. We form stable groups that enhance welfare through mutual protection, knowledge sharing, and economic exchanges. As artificial intelligence gains autonomy in shared environments, ensuring AI agents can engage in cooperative behaviors is crucial. Research in AI views this as an alignment challenge and frames it in terms of embedding norms and values in AI systems. Such an approach, while promising, neglects how humans achieve stable cooperation through normative infrastructure. This infrastructure establishes shared norms enforced by agents who recognize and sanction norm violations. Using multi-agent reinforcement learning (MARL), we investigate the impact of normative infrastructure on agents' learning dynamics and their cooperative abilities in mixed-motive games. We introduce the concept of an altar, an environmental feature that encodes actions deemed sanctionable by a group of agents. Comparing the performance of simple, independent learning agents in environments with and without the altar, we assess the potential of normative infrastructure in facilitating AI agent alignment to foster stable cooperation.",
        paperLink: "./papers/Altared_Environments.pdf",
      },
      {
        id: 5,
        title: "Normative Modules: A Generative Agent Architecture for Learning Norms that Supports Multi-Agent Cooperation",
        authors: ["Atrisha Sarkar", "Andrei Ioan Muresanu", "Carter Blair", "Aaryam Sharma", "Rakshit S Trivedi", "Gillian K Hadfield"],
        venues: ["Foundation Models and Game Theory Workshop at Economics and Computation 2024"],
        abstract: "Generative agents, which implement behaviors using a large language model (LLM) to interpret and evaluate an environment, has demonstrated the capacity to solve complex tasks across many social and technological domains. However, when these agents interact with other agents and humans in presence of social structures such as existing norms, fostering cooperation between them is a fundamental challenge. In this paper, we develop the framework of a 'Normative Module': an architecture designed to enhance cooperation by enabling agents to recognize and adapt to the normative infrastructure of a given environment. We focus on the equilibrium selection aspect of the cooperation problem and inform our agent design based on the existence of classification institutions that implement correlated equilibrium to provide effective resolution of the equilibrium selection problem. Specifically, the normative module enables agents to learn through peer interactions which of multiple candidate institutions in the environment, does a group treat as authoritative. By enabling normative competence in this sense, agents gain ability to coordinate their sanctioning behaviour; coordinated sanctioning behaviour in turn shapes primary behaviour within a social environment, leading to higher average welfare. We design a new environment that supports institutions and evaluate the proposed framework based on two",
        paperLink: "./papers/Normative_Modules.pdf",
        arxivLink: "https://arxiv.org/abs/2405.19328",
      },
      {
        id: 1,
        title: "Liquid Ensemble Selection For Continual Learning",
        authors: ["Carter Blair", "Ben Armstrong", "Kate Larson"],
        venues: ["AAMAS SCaLA Workshop 2024", "Canadian AI 2024"],
        abstract: "Continual learning aims to enable machine learning models to continually learn from a shifting data distribution without forgetting what has already been learned. Such shifting distributions can be broken into disjoint subsets of related examples; by training each member of an ensemble on a different subset it is possible for the ensemble as a whole to achieve much higher accuracy with less forgetting than a naive model. We address the problem of selecting which models within an ensemble should learn on any given data, and which should predict. By drawing on work from delegative voting we develop an algorithm for using delegation to dynamically select which models in an ensemble are active. We explore a variety of delegation methods and performance metrics, ultimately finding that delegation is able to provide a significant performance boost over naive learning in the face of distribution shifts.",
        paperLink: "./papers/SCaLA_AAMAS_Liquid_Ensembles.pdf",
        arxivLink: "https://arxiv.org/abs/2405.07327",
      },
      {
        id: 2,
        title: "Quantifying Emotional Responses to Immutable Data Characteristics and Designer Choices in Data Visualizations",
        authors: ["Carter Blair", "Xiyao Wang", "Charles Perin"],
        venues: ["IEEE VIS 2024"],
        abstract: "Emotion is an important factor to consider when designing visualizations as it can impact the amount of trust viewers place in a visualization, how well they can retrieve information and understand the underlying data, and how much they engage with or connect to a visualization. We conducted five crowdsourced experiments to quantify the effects of color, chart type, data trend, data variability and data density on emotion (measured through self-reported arousal and valence). Results from our experiments show that there are multiple design elements which influence the emotion induced by a visualization and, more surprisingly, that certain data characteristics influence the emotion of viewers even when the data has no meaning. In light of these findings, we offer guidelines on how to use color, scale, and chart type to counterbalance and emphasize the emotional impact of immutable data characteristics.",
        paperLink: "./papers/Quantifying_Emotional_Responses_to_Immutable_Data_Characteristics_and_Designer_Choices_in_Data_Visualizations.pdf",
        arxivLink: "https://arxiv.org/abs/2407.18427",
      }
    ]
  };

  useEffect(() => {
    const updateYearPositions = () => {
      const newPositions = {};

      Object.keys(timelineRefs.current).forEach((year) => {
        const ref = timelineRefs.current[year];
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleMiddle = (visibleTop + visibleBottom) / 2;
        const relativePosition = visibleMiddle - rect.top;

        newPositions[year] = relativePosition;
      });

      setYearPositions(newPositions);
    };

    const debouncedUpdate = debounce(updateYearPositions, 10);

    updateYearPositions();
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, []);

  const toggleSection = (id) => {
    setExpandSection((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-medium mb-4 text-neutral-800">Publications</h2>
      {Object.keys(publicationsData)
        .sort((a, b) => b - a)
        .map((year, index) => (
          <div key={year} className="flex mb-16">
            {/* Timeline column */}
            <div className="w-24 shrink-0 relative flex justify-center">
              {/* Vertical line */}
              <div
                ref={(el) => (timelineRefs.current[year] = el)}
                className="absolute w-[1px] top-0 bottom-8 bg-neutral-300"
              />
              {/* Year label */}
              <div
                className="absolute transition-all duration-300 ease-out"
                style={{ top: yearPositions[year] || 0 }}
              >
                <h3 className="text-xl font-medium text-neutral-600 bg-gray-50 px-3">{year}</h3>
              </div>
            </div>
            {/* Publications container */}
            <div className="flex flex-col flex-1">
              {publicationsData[year].map((pub) => (
                <PublicationCard
                  key={pub.id}
                  {...pub}
                  expanded={expandSection[pub.id]}
                  onToggle={() => toggleSection(pub.id)}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

function PublicationCard({
  id,
  title,
  authors,
  venues,
  abstract,
  expanded,
  onToggle,
  paperLink,
  arxivLink,
}) {
  return (
    <div className="mb-8 bg-neutral-100 border-neutral-300 border-2 rounded-md p-4 flex flex-col w-full">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex justify-start items-center w-full">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-medium">{title}</h2>
              <p className="text-neutral-600 mt-1 text-sm">{authors.join(", ")}</p>
              <div className="mt-2 flex gap-2">
                {venues.map((venue, index) => (
                  <span
                    key={index}
                    className="bg-neutral-200 text-neutral-800 text-xs font-semibold px-2.5 py-0.5 rounded news-font"
                  >
                    {venue}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {arxivLink && (
                  <a
                    href={arxivLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="./arxiv-logomark-small.svg"
                      alt="ArXiv Logo"
                      className="grayscale mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                    ArXiv
                  </a>
                )}
                {paperLink && (
                  <a
                    href={paperLink}
                    className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md text-sm font-medium flex items-center border border-neutral-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF
                  </a>
                )}
              </div>
            </div>
            <div onClick={onToggle} className="shrink-0 cursor-pointer">
              {expanded ? (
                <ChevronDownIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div>
          <hr className="my-2" />
          <div>
            <p className="mt-2">
              <span className="font-semibold news-font">Abstract</span>: {abstract}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}