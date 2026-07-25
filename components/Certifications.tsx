"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Data Analytics & Engineering Trainee",
    issuer: "PwC Launchpad",
    link: "https://drive.google.com/file/d/1py-s1Y-0MivOpqyN5qKqPoBhAH0abmn4/view" 
  },
  {
    title: "Full Stack Development",
    issuer: "Coding Ninjas",
    link: "https://drive.google.com/drive/u/1/folders/1zvC9Vomf8shDg-qb2UudkaCkN3DzMRe7" 
  },
  {
    title: "Core Java Specialization",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/WSLYG2E5TF9W"
  },
  {
    title: "CCNAv7 Enterprise Networking, Security, and Automation",
    issuer: "CISCO",
    link: "https://drive.google.com/file/d/1h8MEthTBRnM3idrF-0E649uzhw0_BrPI/view"
  },
  {
    title: "NPTEL Certificate",
    issuer: "IIT Madras",
    link: "https://drive.google.com/file/d/1Cg-cHbEnlyPUPoiWEAoDIiwOLxZKmbQV/view"
  },
  {
    title: "Data Structures in Java",
    issuer: "Coding Ninjas",
    link: "https://files.codingninjas.in/certificate17409157a0d3808814bf818b103ad54e0d6aa72.pdf"
  },
  {
    title: "Introduction to Java",
    issuer: "Coding Ninjas",
    link: "https://files.codingninjas.in/certificate1740914e084121ac1f23a1dae622345b71fd084.pdf"
  },
  {
    title: "Advanced Software Engineering Virtual Experience Program",
    issuer: "Walmart USA & Forage",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Walmart%20USA/oX6f9BbCL9kJDJzfg_Walmart%20USA_B538ZSaQKZCMfFzfA_1685966918202_completion_certificate.pdf"
  },{
    title: "Software Engineering Virtual Experience Program",
    issuer: "Hewlett Packard Enterprise & Forage",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Hewlett%20Packard%20Enterprise/da2T3WZCbMAJD7bNB_Hewlett%20Packard%20Enterprise_B538ZSaQKZCMfFzfA_1686057692567_completion_certificate.pdf"
  }
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1, // Creates a cascading stagger effect
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%", 
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-zinc-950 text-white border-t border-zinc-900 pb-48">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Certifications.</h2>
          <p className="text-xl text-gray-400">Professional training and specialized courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div 
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-black border border-zinc-800 p-8 rounded-3xl hover:border-zinc-600 transition-all duration-300 shadow-xl flex flex-col justify-between group h-full"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-zinc-400 font-medium mb-8">
                  {cert.issuer}
                </p>
              </div>
              
              <a 
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-5 py-3 rounded-full hover:bg-zinc-200 transition-colors w-max"
              >
                View Credential
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}