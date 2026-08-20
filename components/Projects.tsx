"use client";
import React, { useRef } from "react";

const projects = [
  {
    title: "SocioArcade",
    category: "Full Stack Web Application",
    description: "A distributed, multi-tiered social media platform with a microservices backend. Reduced API latency by 28% through optimized MongoDB schema design.",
    tech: ["NodeJS", "Express", "MongoDB", "Bootstrap"],
    link: "https://github.com/Shashwat2244/Social_Media", 
    color: "bg-blue-900",
  },{
    title: "Financial Settlements & Reconciliation Engine",
    category: "Data Engineering",
    description: "A cloud-based automated reconciliation engine that detects revenue leakage, financial anomalies, and orphaned payments to recover lost funds.",
    tech: ["Python", "SQL", "Snowflake", "AWS", "DuckDB", "Streamlit", "Docker", "PySpark"],
    link: "https://github.com/Shashwat2244/Financial-Reconciliation-Engine",
    color: "bg-lime-500",
  },
  {
    title: "Credit Card Fraud Detection",
    category: "Machine Learning & Data Pipeline",
    description: "Built a real-time data pipeline for fraud signal processing. Trained ML models with SMOTE resampling, achieving 94% accuracy and 90% recall.",
    tech: ["FastAPI", "React", "Python", "Scikit-learn"],
    link: "https://github.com/Shashwat2244",
    color: "bg-emerald-900",
  },
  {
    title: "SportsFit",
    category: "Full Stack Web Application",
    description: "A scalable e-commerce platform for sports equipments and sportswear with dynamic product listings, cart, and admin/customer modules, supporting CRUD operations on 200+ product entries.",
    tech: ["Javascript", "Bootstrap", "MySQL", "PHP"],
    link: "https://github.com/Shashwat2244/SportsFit", 
    color: "bg-purple-900",
  },
  {
    title: "Football Value Tracker",
    category: "Automated Data Engineering",
    description: "Engineered a 100% automated batch ELT pipeline extracting 500+ data points weekly across the Premier League, bypassing enterprise bot-defenses.",
    tech: ["Python", "DuckDB", "GitHub Actions", "Streamlit"],
    link: "https://github.com/Shashwat2244/football_value_tracker",
    color: "bg-rose-900",
  },
  {
    title: "Online Job Portal",
    category: "Full Stack Web Application",
    description: "Built a complete job portal with login, job listing, and recruiter dashboard; onboarded 20 mock users in testing.",
    tech: ["NodeJs", "Express", "MongoDB", "ReactJS", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Shashwat2244/Online-Job-Portal",
    color: "bg-indigo-900",
  },
  {
    title: "Distributed Real-Time Fan-Out Engine",
    category: "Backend Development",
    description: " Engineered a horizontally scalable real-time chat architecture using Spring Boot, WebSockets, and Apache Kafka, decoupling message ingress from egress to increase theoretical concurrent connection limits from 10k to 100k+.",
    tech: ["Java", "Spring Boot", "Redis", "Kafka", "Docker", "WebSockets"],
    link: "https://github.com/Shashwat2244/Broadcast-Chat",
    color: "bg-yellow-600",
  },
  {
    title: "Ping Pong Game",
    category: "Game Development",
    description: "Developed a 2D ping pong game with scoring, collision detection, and sound effects using JavaScript and HTML5 Canvas.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    link: "https://github.com/Shashwat2244/Ping-Pong-Game-Using-HTML-CSS-JavaScript",
    color: "bg-cyan-900",
  },
  {
    title: "Driver Face Recognition Prototype",
    category: "Computer Vision & Deep Learning",
    description: "Developed a real-time driver face recognition system prototype for incode 2023 hackathon finals using javascript.",
    tech: ["Javascript"],
    link: "https://github.com/Shashwat2244/inCode-Project",
    color: "bg-yellow-900",
  }
];
export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Determines how far to scroll (roughly the width of one card + gap)
      const scrollAmount = window.innerWidth > 768 ? 640 : 320; 
      const currentScroll = scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-32 bg-black flex flex-col justify-center min-h-screen">
      <div className="pl-6 md:pl-24 mb-12 flex flex-col md:flex-row md:items-end justify-between pr-6 md:pr-24">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Featured Work.</h2>
          <p className="text-gray-400 mt-4 text-xl">Swipe or use arrows to explore</p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory px-6 md:px-24 gap-8 md:gap-16 pb-12 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
      >
        {projects.map((project, i) => (
          <div 
            key={i} 
            className={`w-[85vw] md:w-[600px] h-[500px] rounded-3xl p-10 flex flex-col justify-between ${project.color} border border-white/10 shrink-0 shadow-2xl snap-center`}
          >
            <div>
              <p className="text-white/70 uppercase tracking-widest text-sm font-semibold mb-2">
                {project.category}
              </p>
              <h3 className="text-4xl font-bold text-white mb-6">{project.title}</h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, j) => (
                  <span key={j} className="px-4 py-2 rounded-full bg-black/30 text-white text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a 
              href={project.link} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold hover:opacity-70 transition-opacity mt-8 w-max"
            >
              View Project 
              <span className="text-xl">↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
