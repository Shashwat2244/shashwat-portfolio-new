"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The top-level floating skills
const floatingSkills = [
  "ReactJS", "TailwindCSS", "Java", "Python", "NodeJS", "Express.JS", 
  "MongoDB", "PostgreSQL", "Bootstrap", "AWS", "Microservices", 
  "MySQL", "Scikit-learn", "Pandas", "DuckDB", "Data Visualization"
];

// The detailed categories mapped exactly from your resume
const skillCategories = [
  {
    title: "Frontend",
    skills: ["React (ReactJS)", "HTML", "CSS", "TailwindCSS", "Bootstrap", "Javascript"]
  },
  {
    title: "Backend & APIs",
    skills: ["Java (OOP)", "Python", "C", "REST APIs", "Microservices Architecture", "NodeJS", "Express.JS", "Fast API"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "NoSQL databases", "Supabase"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "GCP", "Docker", "CI/CD Pipelines", "Git (Version Control)"]
  },
  {
    title: "Build & Tools",
    skills: ["Postman", "VSCode", "PowerBI", "Excel", "Github Actions", "Streamlit", "Apache Spark", "PySpark", "Snowflake"]
  },
  {
    title: "Architecture & Practices",
    skills: ["Distributed systems", "Redis", "Event-driven architecture (Kafka)", "Agile/SDLC", "System Design", "DSA", "Unit testing", "Data Visualization"]
  },
  {
    title: "Data & ML",
    skills: ["Pandas", "Scikit-learn", "Machine Learning Algorithms", "Numpy", "Seaborn", "Matplotlib"]
  },
  {
    title: "Core Fundamentals",
    skills: ["OOP", "Data Structures & Algorithms", "Design Patterns", "Database Design", "Software Architecture"]
  },
  {
    title: "Other Skills",
    skills: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Leadership", "Aptitude", "Adaptability", "Time Management", "Creativity", "Decision Making"]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance animation for floating pills
      gsap.fromTo(
        pillsRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Continuous floating animation for pills
      pillsRef.current.forEach((pill, i) => {
        if (!pill) return;
        gsap.to(pill, {
          y: i % 2 === 0 ? "-10px" : "10px",
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      // 3. Entrance animation for horizontal category cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Animates in as each card scrolls into view
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black text-white border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Floating Skills Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-10">Technical Arsenal.</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
            {floatingSkills.map((skill, i) => (
              <div
                key={i}
                ref={(el) => { pillsRef.current[i] = el; }}
                className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-lg font-medium text-gray-300 shadow-lg hover:border-white hover:text-white transition-colors cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Horizontal Category Cards */}
        <div className="mt-32 space-y-6">
          {skillCategories.map((category, i) => (
            <div 
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 bg-zinc-950 border border-zinc-800 p-8 md:p-10 rounded-3xl hover:border-zinc-600 transition-colors"
            >
              {/* Left Side: Category Title */}
              <div className="md:w-1/3 shrink-0">
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              </div>

              {/* Right Side: Skill Tags */}
              <div className="md:w-2/3 flex flex-wrap gap-3 items-center">
                {category.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="text-gray-300 text-lg md:text-xl font-light"
                  >
                    {skill}{j !== category.skills.length - 1 && <span className="text-zinc-600 ml-3">/</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}