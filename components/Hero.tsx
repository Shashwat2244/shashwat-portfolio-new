"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A context ensures GSAP animations are cleaned up properly in React
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children as HTMLCollection,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
    >
      <div ref={textRef} className="z-10">
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 text-white">
          Shashwat Shrivastava
        </h1>
        <h2 className="text-xl md:text-3xl text-gray-400 font-light max-w-2xl mx-auto">
          Associate Software Consultant, Data Engineer & Full Stack Developer
        </h2>
      </div>
      
      {/* Subtle scroll indicator */}
      <div className="absolute bottom-10 animate-bounce text-gray-500 text-sm">
        Scroll to explore
      </div>
    </section>
  );
}