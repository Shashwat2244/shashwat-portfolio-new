"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const initialMessage: Message = { 
  role: "bot", 
  text: "Hi! I'm Shashwat's AI assistant. Ask me anything about his experience, projects, or skills!" 
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Function to manually reset the chat
  const clearChat = () => {
    setMessages([initialMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Oops, something went wrong on my end. Please try again." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "Connection error. Please check your network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-black border-b border-zinc-800 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                <p className="text-zinc-400 text-xs">Powered by Gemini</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  className="text-zinc-400 hover:text-white transition-colors p-1"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors p-1"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area - Added overscroll-contain and data-lenis-prevent */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50 overscroll-contain"
              data-lenis-prevent="true"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user" 
                        ? "bg-white text-black rounded-tr-sm" 
                        : "bg-zinc-800 text-white rounded-tl-sm border border-zinc-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 text-white border border-zinc-700 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-zinc-400" />
                    <span className="text-xs text-zinc-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSubmit} 
              className="p-4 bg-black border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Shashwat..."
                className="flex-1 bg-zinc-900 text-white border border-zinc-800 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-600 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-white text-black p-2.5 rounded-full hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-6 bg-white text-black rounded-full shadow-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors border border-zinc-200 font-semibold"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            <span>AI Assistant</span>
          </>
        )}
      </motion.button>
    </div>
  );
}