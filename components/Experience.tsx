"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Associate Software Consultant",
    company: "Mindsprint",
    location: "Bengaluru, India",
    date: "Jan 2025 - Present",
    description: [
      "Engineered the data pipelines (Apache Spark, Hadoop) and interactive Power BI dashboards for a centralized workforce platform supporting ~4,000 employees.",
      "Designed and deployed cloud-native web applications using Java, React, REST APIs, and a microservices architecture.",
      "Optimized backend architecture to reduce response latency by 25% across targeted workflows by implementing Redis caching, advanced database query tuning, and API-level enhancements."
      "Streamlined complex data extraction using Python, Pandas, and SQL, while championing Agile/SDLC practices and CI/CD pipelines to ensure consistent, reliable production releases."
    ]
  },
  {
    role: "Web Development Intern",
    company: "Baskethunt Pvt. Ltd.",
    location: "Remote, India",
    date: "Aug 2023 - Oct 2023",
    description: [
      "Led development of responsive user interface using React.JS and TailwindCSS, increasing mobile usability by 40%.",
      "Conducted rigorous testing and debugging, reducing UI/UX bugs in production by 35%.",
      "Refactored and optimized frontend codebase, improving Google Lighthouse scores from 72 to 91."
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate the vertical line drawing itself based on scroll position
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%", // Start drawing when section is 60% down the screen
            end: "bottom 80%", // Finish drawing before the section leaves
            scrub: 1, // Smoothly link animation to scroll progress
          }
        }
      );

      // Animate each experience card sliding in
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Trigger as the card enters the viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-zinc-950 text-white relative">
      <div className="max-w-4xl mx-auto px-6 relative">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">Experience.</h2>

        <div className="relative">
          {/* The vertical timeline line container */}
          <div className="absolute left-[15px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-white/10">
            {/* The actual line that animates */}
            <div 
              ref={lineRef} 
              className="absolute top-0 w-full h-full bg-white origin-top"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div 
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] md:left-1/2 md:-ml-[5px] top-6 w-[10px] h-[10px] rounded-full bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 p-6 md:px-12">
                  <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2 block">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-lg text-gray-300 mb-4">{exp.company} <span className="text-gray-500 text-sm ml-2">| {exp.location}</span></p>
                  
                  <ul className="space-y-3">
                    {exp.description.map((point, j) => (
                      <li key={j} className="text-gray-400 leading-relaxed flex gap-3">
                        <span className="text-white mt-1.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
