import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 pb-28 md:pb-10 bg-black border-t border-zinc-900 text-zinc-500 relative z-10">
      {/* Added pb-28 on mobile to ensure the chatbot doesn't overlap the footer content */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright Section (Left aligned on desktop, centered on mobile) */}
        <div className="flex-1 text-center md:text-left text-sm font-medium">
          &copy; {currentYear} Shashwat Shrivastava. All rights reserved.
        </div>

        {/* Social Links (Perfectly centered) */}
        <div className="flex-1 flex justify-center items-center gap-6">
          <a 
            href="https://github.com/Shashwat2244"
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
          </a>
          <a 
            href="https://www.linkedin.com/in/shashwat-shrivastava-141044215/"
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} />
          </a>
          <a 
            href="https://www.instagram.com/shashwat.42/"
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={22} />
          </a>
        </div>

        {/* Empty block to balance the flex layout and leave room for the AI Chatbot on the right */}
        <div className="flex-1 hidden md:block"></div>

      </div>
    </footer>
  );
}