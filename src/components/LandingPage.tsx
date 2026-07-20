"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Heart } from "lucide-react";
import FloatingAccents from "./FloatingAccents";

export default function LandingPage() {
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const startDate = new Date('2026-04-19T00:00:00');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysSince(diffDays);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full font-sans overflow-x-hidden selection:bg-pink-200 text-zinc-800"
      style={{
        background: "linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 50%, #E6F3FF 100%)",
      }}
    >
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <FloatingAccents />

      {/* Navigation Bar */}
      <nav className="relative z-20 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-pink-500 drop-shadow-sm"
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
        >
          Our Aloha Story 🌺
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 md:gap-6"
        >
          <button className="text-pink-400 hover:text-pink-600 transition-colors">
            <Search size={28} />
          </button>
          <button className="relative w-12 h-12 hover:scale-110 transition-transform flex items-center justify-center">
            <img src="/stitch.png" alt="Menu" className="w-full h-full object-contain drop-shadow-sm" />
          </button>
        </motion.div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

        {/* Hero Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <span className="inline-block py-2 px-5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-500 font-bold text-sm mb-6 shadow-sm">
            💖 Our Story • April 19th, 2026 (and counting!) • ∞ Love
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-[#FF1493] mb-6 leading-tight drop-shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
            Aloha, My Dearest Senuri! 🌸
          </h1>

          <p className="text-lg sm:text-xl text-zinc-700 leading-relaxed mb-10 max-w-2xl bg-white/50 p-6 sm:p-8 rounded-[2rem] backdrop-blur-sm border border-white/60 shadow-[0_8px_32px_0_rgba(255,182,193,0.25)] font-medium">
            Life is just so much brighter with you, my darling! You're the beautiful Angel to my Stitch, the sweet sparkle in my day, and the very best 'Ohana' I could ever ask for. This little digital paradise is all about us; the laughter, the adventures, and the endless love we share. Get ready for some major cuteness and surprises, crafted just for you, with all my love! 🥰
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-pink-500 to-[#FF1493] text-white font-bold rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center gap-2 text-lg tracking-wide"
            >
              BEGIN OUR ADVENTURE ✨
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-white text-pink-500 flex items-center justify-center rounded-full shadow-xl shadow-pink-200/50 border border-pink-100 hover:text-[#FF1493] hover:bg-pink-50 transition-colors"
            >
              <Heart size={32} fill="currentColor" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Media Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
          className="flex-1 w-full max-w-md lg:max-w-lg relative mt-8 lg:mt-0"
        >
          {/* Decorative floating doodles around the image */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-6 text-6xl z-20 drop-shadow-lg"
          >
            🌺
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -right-4 text-7xl z-20 drop-shadow-lg"
          >
            💖
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 -right-10 text-5xl z-20 drop-shadow-lg"
          >
            ✨
          </motion.div>

          {/* Main Image Frame */}
          <div className="relative z-10 rounded-[3rem] p-4 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(255,105,180,0.25)] border-2 border-white overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="rounded-[2.5rem] overflow-hidden bg-white shadow-inner relative aspect-[4/5]">
              <img
                src="/heroo.png"
                alt="Our Adventure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>
          </div>

          {/* Soft background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2] to-[#FF1493] blur-[100px] opacity-20 -z-10 rounded-full scale-110"></div>
        </motion.div>
      </main>

      {/* Love in Numbers Grid */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-blue-400 drop-shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
        >
          Love in Numbers 💖
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Days of Magic ✨", value: `${daysSince} Days`, icon: "🗓️", desc: "Since April 19th, 2026; every single day brighter than the last!" },
            { title: "Dates Planned 🌺", value: "Infinite & Beyond", icon: "🗺️", desc: "From cozy movie nights to endless Barbie dream adventures." },
            { title: "Smiles Shared 🥰", value: "Countless", icon: "💌", desc: "Every text, call, and silly moment making my world a better place." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(255,182,193,0.4)] transition-all cursor-pointer group flex flex-col h-full items-center text-center"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform origin-center duration-300 drop-shadow-sm">{item.icon}</div>
              <h3 className="text-xl font-bold text-zinc-500 mb-2">{item.title}</h3>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-[#FF1493] mb-4 group-hover:scale-105 transition-transform">{item.value}</p>
              <p className="text-zinc-600 font-medium text-base leading-relaxed flex-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
