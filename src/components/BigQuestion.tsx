"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";

type Step = "question" | "sad" | "heartbroken" | "accepted";

export default function BigQuestion() {
  const [step, setStep] = useState<Step>("question");
  const [isDownloading, setIsDownloading] = useState(false);

  const agreementRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = async () => {
    if (!agreementRef.current) return;
    setIsDownloading(true);

    try {
      // Need a tiny delay to ensure button hover states aren't captured if we want them clean
      await new Promise(res => setTimeout(res, 100));

      const dataUrl = await toPng(agreementRef.current, {
        cacheBust: true,
        backgroundColor: "#FFE4E1",
        pixelRatio: 2
      });

      const link = document.createElement("a");
      link.download = "Our_Ohana_Agreement.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to capture agreement", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-pink-200 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(255,105,180,0.2)]"
      >
        <AnimatePresence mode="wait">
          {step === "question" && (
            <motion.div 
              key="question"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Left Side: GIF */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm">
                  <img src="/question.gif" alt="Please?" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              {/* Right Side: The Question */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF1493] leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  The Most Important Question 🥺
                </h2>
                <p className="text-xl text-zinc-700 font-medium leading-relaxed">
                  My Princess, you're the beautiful Angel to my Stitch, the melody to my heart, and my absolute favorite person in the world. Will you do me the honor of being my girlfriend?
                </p>

                <div className="flex items-center gap-6 mt-8 relative w-full justify-center md:justify-start min-h-[60px]">
                  <button
                    onClick={() => setStep("accepted")}
                    className="px-10 py-4 bg-gradient-to-r from-pink-500 to-[#FF1493] text-white font-bold text-xl rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-110 transition-all z-20"
                  >
                    YES! 🌺
                  </button>

                  <button
                    onClick={() => setStep("sad")}
                    className="px-10 py-4 bg-white text-zinc-400 font-bold text-xl rounded-full border-2 border-zinc-200 shadow-sm z-10 hover:bg-zinc-50 hover:text-zinc-600 transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "sad" && (
            <motion.div 
              key="sad"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Left Side: GIF */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm">
                  <img src="/hug.gif" alt="Sad Stitch" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
              
              {/* Right Side: The Sad Question */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#4A90E2] leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Are you sure...? 🥺
                </h2>
                <p className="text-xl text-zinc-600 font-medium leading-relaxed">
                  But... 'Ohana means family. And family means nobody gets left behind or forgotten. My heart feels so broken. Are you really, really sure you want to say no to your Stitch? 💔
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mt-8 relative w-full justify-center md:justify-start">
                  <button 
                    onClick={() => setStep("heartbroken")}
                    className="px-8 py-4 bg-white text-zinc-400 font-bold text-lg rounded-full border-2 border-zinc-200 shadow-sm hover:bg-zinc-50 transition-colors"
                  >
                    Yes, I'm sure.
                  </button>
                  
                  <button 
                    onClick={() => setStep("question")}
                    className="px-8 py-4 bg-gradient-to-r from-[#4A90E2] to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all"
                  >
                    No, I changed my mind! 💖
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "heartbroken" && (
            <motion.div 
              key="heartbroken"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-8 py-10"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-300 max-w-sm">
                <img src="/okay.gif" alt="Heartbroken Stitch" className="w-full h-auto object-cover grayscale opacity-80" />
              </div>
              
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-500 leading-tight mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Okay... I understand. 🌧️
                </h2>
                <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                  I guess some 'Ohanas just aren't meant to be. Stitch will just be alone... in the rain... with a broken heart. Goodbye, my Angel. 🥀
                </p>
                <button 
                  onClick={() => setStep("question")}
                  className="mt-10 px-8 py-4 bg-zinc-100 text-zinc-500 font-bold text-lg rounded-full border border-zinc-200 shadow-sm hover:bg-pink-50 hover:text-pink-500 hover:border-pink-200 transition-all"
                >
                  Wait... I was just kidding! 🥺👉👈
                </button>
              </div>
            </motion.div>
          )}

          {step === "accepted" && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* The actual certificate to capture */}
              <div
                ref={agreementRef}
                className="bg-[#fff9fa] w-full max-w-2xl p-8 md:p-12 rounded-3xl border-4 border-pink-300 shadow-xl relative overflow-hidden text-center"
              >
                {/* Decorative background corners */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-br-full opacity-30 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200 rounded-tl-full opacity-30 pointer-events-none"></div>

                {/* Certificate Content */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A90E2] mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Official 'Ohana Love Agreement
                </h2>
                <div className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-8">
                  Issued on: {todayDate}
                </div>

                <p className="text-lg text-zinc-700 italic mb-8 px-4 font-medium">
                  Let it be known across the galaxy that from this day forward, these two chaotic, loving souls belong together.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 mb-10 text-xl font-bold">
                  <div className="text-[#FF1493] flex flex-col items-center">
                    <span className="text-sm text-zinc-500 font-normal uppercase mb-1">The Boyfriend</span>
                    OSHADA RASHMIKA
                  </div>
                  <div className="text-3xl text-pink-300">❤️</div>
                  <div className="text-[#FF1493] flex flex-col items-center">
                    <span className="text-sm text-zinc-500 font-normal uppercase mb-1">The Girlfriend</span>
                    SENURI RUKSHANI
                  </div>
                </div>

                <div className="text-left bg-white/60 p-6 rounded-2xl border border-pink-100 shadow-sm mb-10 space-y-4">
                  <h3 className="font-bold text-lg text-[#4A90E2] border-b border-pink-200 pb-2 mb-4">The Official Rules of Us:</h3>
                  <p className="flex items-start gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400">1.</span> Stitch is hereby allowed to steal Angel's kisses at any given moment.
                  </p>
                  <p className="flex items-start gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400">2.</span> Unlimited cuddles and spontaneous adventures are absolutely mandatory.
                  </p>
                  <p className="flex items-start gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400">3.</span> 'Ohana means family. Family means nobody gets left behind or forgotten... ever.
                  </p>
                  <p className="flex items-start gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400">4.</span> We promise to support, protect, annoy, and fiercely love each other every single day.
                  </p>
                </div>

                {/* Signatures */}
                <div className="flex justify-between items-end px-4 mt-16 relative z-10">
                  <div className="w-[40%] text-center flex flex-col items-center">
                    <div className="text-4xl text-[#FF1493] mb-2 drop-shadow-sm" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Segoe Script', cursive", transform: "rotate(-5deg)" }}>Oshada</div>
                    <div className="w-full border-t-2 border-zinc-400 pt-2 text-sm font-semibold text-zinc-600 uppercase tracking-widest">
                      Oshada's Signature
                    </div>
                  </div>
                  <div className="w-[40%] text-center flex flex-col items-center">
                    <div className="text-4xl text-[#FF1493] mb-2 drop-shadow-sm" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Segoe Script', cursive", transform: "rotate(-2deg)" }}>Senuri</div>
                    <div className="w-full border-t-2 border-zinc-400 pt-2 text-sm font-semibold text-zinc-600 uppercase tracking-widest">
                      Senuri's Signature
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 text-4xl transform rotate-12 opacity-80 pointer-events-none">🌺</div>
                <div className="absolute bottom-10 left-6 text-4xl transform -rotate-12 opacity-80 pointer-events-none">🐾</div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="mt-10 px-8 py-4 bg-[#4A90E2] text-white font-bold text-lg rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-2"
              >
                {isDownloading ? "Capturing... 📸" : "Download Our Agreement 📥"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
