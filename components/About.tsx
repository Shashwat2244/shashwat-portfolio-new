"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      tl.fromTo(textRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
        .fromTo(buttonsRef.current?.children as HTMLCollection, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, 
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-5xl mx-auto min-h-[70vh] flex flex-col justify-center">
      <div ref={textRef} className="mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">About Me.</h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
          I am currently an Associate Technical Consultant at Mindsprint, where I focus on full-stack development using Java, React, and microservices architecture and data analysis using Python, Pandas and SQL. From optimizing frontend UI components to analyzing thousands of workforce records using Python and Pandas, my goal is always to build systems that are as efficient as they are impactful.        </p>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          My technical journey began with a B.Tech in Computer Science Engineering from Manipal University Jaipur. Since then, I have developed a deep expertise in cloud-native applications, REST APIs, and automated ELT pipelines, thriving in environments that require bridging the gap between raw data and seamless user experiences.
        </p>
      </div>

      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 mt-8">
        <a 
          href="https://drive.google.com/file/d/1M7nBGg9SLeCgR24ofGjeGmejjZjVW8Kq/view?usp=sharing" // Update with your actual path
          target="_blank"
          className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-center"
        >
          Download CV
        </a>
        <a 
          href="https://drive.google.com/file/d/1wg4hzPwd82z-mxYQiNsxlhNEnBO99Iaz/view" 
          target="_blank"
          className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors text-center"
        >
          Hackathon Highlights (Drive)
        </a>
      </div>
    </section>
  );
}