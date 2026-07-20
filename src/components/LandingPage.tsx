"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingAccents from "./FloatingAccents";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] w-full bg-white text-zinc-800 font-sans">
      <FloatingAccents />
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Parallax Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="z-10 text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 pb-2 drop-shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
            Aloha, My Favorite Person 🌺
          </h1>
          <p className="mt-4 text-xl text-pink-400 font-medium tracking-wide">
            Welcome to our little world
          </p>
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          style={{ y: cardY }}
          className="z-10 bg-white/80 backdrop-blur-md border border-pink-200 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Subtle shine effect */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-shine" />
          
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">
            A Special Surprise
          </h2>
          <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
            Something beautiful is blooming. Take your time, enjoy the vibes, and get ready for the next chapter.
          </p>
          
          <div className="inline-block py-3 px-6 bg-pink-50 rounded-2xl border border-pink-100 text-pink-500 font-semibold shadow-inner">
            Proposal Section Placeholder<br/>
            <span className="text-sm font-normal text-pink-400">— Coming in Phase 2 —</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
