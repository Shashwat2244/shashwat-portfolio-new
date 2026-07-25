"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1.5, suffix: "+", label: "Years of Experience", isFloat: true },
  { value: 10, suffix: "+", label: "Technologies Mastered", isFloat: false },
  { value: 5, suffix: "+", label: "Major Projects Built", isFloat: false } // Feel free to change this to 3000+ Records Analyzed!
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      countersRef.current.forEach((counter, index) => {
        if (!counter) return;
        
        // We use an object to tween the value so we can handle decimals cleanly
        let countObj = { val: 0 };
        
        gsap.to(countObj, {
          val: stats[index].value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Animation starts when top of section hits 80% of viewport
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            // If it is a float (like 1.5), fix it to 1 decimal place. Otherwise, use whole numbers.
            counter.innerText = stats[index].isFloat 
              ? countObj.val.toFixed(1) 
              : Math.ceil(countObj.val).toString();
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-5xl md:text-7xl font-bold text-white mb-2 flex items-center">
              <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
              <span>{stat.suffix}</span>
            </div>
            <p className="text-gray-400 text-lg mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}