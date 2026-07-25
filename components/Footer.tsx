import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 pb-28 md:pb-10 bg-black border-t border-zinc-900 text-zinc-500 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright and Email Section (Forced inline to prevent wrapping misalignments) */}
        <div className="flex-1 flex flex-wrap items-center justify-center md:justify-start gap-3 text-center md:text-left text-sm font-medium">
          <span>&copy; {currentYear} Shashwat Shrivastava.</span>
          <span className="hidden lg:inline text-zinc-700">|</span>
          <a 
            href="mailto:shashwatshrivastava04@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-300"
          >
            <HiOutlineMail size={18} />
            <span>shashwatshrivastava04@gmail.com</span>
          </a>
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