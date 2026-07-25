"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Manipal University Jaipur",
    score: "CGPA: 8.81/10",
    year: "2021 - 2025",
    highlight: "bg-white text-black"
  },
  {
    degree: "12th Standard (Higher Secondary)",
    institution: "Anupama Higher Secondary School",
    score: "Percentage: 88.4%",
    year: "2021",
    highlight: "bg-zinc-800 text-white border border-zinc-700"
  },
  {
    degree: "10th Standard (Secondary)",
    institution: "Christukula Mission Higher Secondary School",
    score: "Percentage: 89.6%",
    year: "2019",
    highlight: "bg-zinc-800 text-white border border-zinc-700"
  }
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers when the top of the card is 85% down the viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black text-white relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Education.</h2>
          <p className="text-xl text-gray-400">Academic background and qualifications</p>
        </div>

        <div className="space-y-8 relative">
          {/* Subtle vertical connecting line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-zinc-900 hidden md:block"></div>

          {educationData.map((item, i) => (
            <div 
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              {/* Timeline Indicator (Desktop only) */}
              <div className="hidden md:flex flex-col items-center mt-6 z-10">
                <div className="w-14 h-14 rounded-full bg-zinc-950 border-[4px] border-zinc-900 flex items-center justify-center shadow-xl">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Education Card */}
              <div className="w-full bg-zinc-950 border border-zinc-800 p-8 md:p-10 rounded-3xl hover:border-zinc-700 transition-colors shadow-2xl relative overflow-hidden group">
                
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.degree}</h3>
                    <p className="text-xl text-gray-400 font-medium">{item.institution}</p>
                  </div>
                  
                  <div className="shrink-0">
                    <span className="text-sm font-bold tracking-widest uppercase text-zinc-500">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className={`inline-block px-4 py-2 font-bold rounded-lg text-sm tracking-wide ${item.highlight}`}>
                  {item.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}