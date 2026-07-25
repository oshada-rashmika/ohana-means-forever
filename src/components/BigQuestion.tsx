"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { CheckCircle2, ArrowLeft, Sparkles, Heart, Gift, Copy, Check } from "lucide-react";

type Step = "question" | "sad" | "heartbroken" | "accepted" | "nextStep";

export default function BigQuestion() {
  const [step, setStep] = useState<Step>("question");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCouponUnlocked, setIsCouponUnlocked] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const agreementRef = useRef<HTMLDivElement>(null);
  const secretCode = "OHANA-MYSTERY-2026";

  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toggleCoupon = () => {
    if (!isCouponUnlocked) {
      setIsCouponUnlocked(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(secretCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = async () => {
    if (!agreementRef.current) return;
    setIsDownloading(true);

    try {
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

  const sendNotification = async (answer: "YES" | "NO") => {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) return;

    const message = answer === "YES" 
      ? "She said YES! 🌺 Get ready for a lifetime of Ohana!" 
      : "She double-confirmed NO... 💔 The Stitch is heartbroken.";

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Senuri's Answer: ${answer}!`,
          message: message,
          from_name: "Ohana Means Forever App"
        }),
      });
    } catch (err) {
      console.error("Failed to send notification", err);
    }
  };

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-32 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-pink-200 rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(255,105,180,0.2)]"
      >
        <AnimatePresence mode="wait">
          {step === "question" && (
            <motion.div 
              key="question"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Left Side: GIF */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
                  <img src="/question.gif" alt="Please?" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

              {/* Right Side: The Question */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FF1493] leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  The Most Important Question 🥺
                </h2>
                <p className="text-lg sm:text-xl text-zinc-700 font-medium leading-relaxed">
                  My Princess, you're the beautiful Angel to my Stitch, the melody to my heart, and my absolute favorite person in the world. Will you do me the honor of being my girlfriend?
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 relative w-full justify-center md:justify-start min-h-[60px]">
                  <button
                    onClick={() => {
                      setStep("accepted");
                      sendNotification("YES");
                      fireConfetti();
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-pink-500 to-[#FF1493] text-white font-bold text-xl rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                  >
                    YES! 🌺
                  </button>

                  <button
                    onClick={() => setStep("sad")}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-zinc-400 font-bold text-xl rounded-full border-2 border-zinc-200 shadow-sm z-10 hover:bg-zinc-50 hover:text-zinc-600 transition-colors cursor-pointer"
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
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Left Side: GIF */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
                  <img src="/hug.gif" alt="Sad Stitch" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
              
              {/* Right Side: The Sad Question */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4A90E2] leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Are you sure...? 🥺
                </h2>
                <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed">
                  But... 'Ohana means family. And family means nobody gets left behind or forgotten. My heart feels so broken. Are you really, really sure you want to say no to your Stitch? 💔
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative w-full justify-center md:justify-start">
                  <button 
                    onClick={() => {
                      setStep("heartbroken");
                      sendNotification("NO");
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-400 font-bold text-lg rounded-full border-2 border-zinc-200 shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    Yes, I'm sure.
                  </button>
                  
                  <button 
                    onClick={() => setStep("question")}
                    className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-[#4A90E2] to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-300 max-w-sm w-full">
                <img src="/okay.gif" alt="Heartbroken Stitch" className="w-full h-auto object-cover grayscale opacity-80" />
              </div>
              
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-500 leading-tight mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Okay... I understand. 🌧️
                </h2>
                <p className="text-lg sm:text-xl text-zinc-500 font-medium leading-relaxed">
                  I guess some 'Ohanas just aren't meant to be. Stitch will just be alone... in the rain... with a broken heart. Goodbye, my Angel. 🥀
                </p>
                <button 
                  onClick={() => setStep("question")}
                  className="mt-10 px-8 py-4 bg-zinc-100 text-zinc-500 font-bold text-lg rounded-full border border-zinc-200 shadow-sm hover:bg-pink-50 hover:text-pink-500 hover:border-pink-200 transition-all cursor-pointer"
                >
                  Wait... I was just kidding! 🥺👉👈
                </button>
              </div>
            </motion.div>
          )}

          {step === "accepted" && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              {/* The actual certificate to capture */}
              <div
                ref={agreementRef}
                className="bg-[#fff9fa] w-full max-w-2xl p-5 sm:p-8 md:p-12 rounded-3xl border-4 border-pink-300 shadow-xl relative overflow-hidden text-center"
              >
                {/* Decorative background corners */}
                <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-pink-200 rounded-br-full opacity-30 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-pink-200 rounded-tl-full opacity-30 pointer-events-none"></div>

                {/* Certificate Content */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4A90E2] mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                  Official 'Ohana Love Agreement
                </h2>
                <div className="text-pink-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 sm:mb-8">
                  Issued on: {todayDate}
                </div>

                <p className="text-base sm:text-lg text-zinc-700 italic mb-6 sm:mb-8 px-2 sm:px-4 font-medium">
                  Let it be known across the galaxy that from this day forward, these two chaotic, loving souls belong together.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 md:gap-12 mb-8 sm:mb-10 text-lg sm:text-xl font-bold">
                  <div className="text-[#FF1493] flex flex-col items-center">
                    <span className="text-xs text-zinc-500 font-normal uppercase mb-1">The Boyfriend</span>
                    OSHADA RASHMIKA
                  </div>
                  <div className="text-2xl sm:text-3xl text-pink-300">❤️</div>
                  <div className="text-[#FF1493] flex flex-col items-center">
                    <span className="text-xs text-zinc-500 font-normal uppercase mb-1">The Girlfriend</span>
                    SENURI RUKSHANI
                  </div>
                </div>

                <div className="text-left bg-white/60 p-4 sm:p-6 rounded-2xl border border-pink-100 shadow-sm mb-8 sm:mb-10 space-y-3 sm:space-y-4 text-sm sm:text-base">
                  <h3 className="font-bold text-base sm:text-lg text-[#4A90E2] border-b border-pink-200 pb-2 mb-3 sm:mb-4">The Official Rules of Us:</h3>
                  <p className="flex items-start gap-2.5 sm:gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400 font-bold">1.</span> Stitch is hereby allowed to steal Angel's kisses at any given moment.
                  </p>
                  <p className="flex items-start gap-2.5 sm:gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400 font-bold">2.</span> Unlimited cuddles and spontaneous adventures are absolutely mandatory.
                  </p>
                  <p className="flex items-start gap-2.5 sm:gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400 font-bold">3.</span> 'Ohana means family. Family means nobody gets left behind or forgotten... ever.
                  </p>
                  <p className="flex items-start gap-2.5 sm:gap-3 text-zinc-700 font-medium">
                    <span className="text-pink-400 font-bold">4.</span> We promise to support, protect, annoy, and fiercely love each other every single day.
                  </p>
                </div>

                {/* Signatures */}
                <div className="flex justify-between items-end px-2 sm:px-4 mt-12 sm:mt-16 relative z-10">
                  <div className="w-[45%] text-center flex flex-col items-center">
                    <div className="text-2xl sm:text-4xl text-[#FF1493] mb-1 sm:mb-2 drop-shadow-sm" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Segoe Script', cursive", transform: "rotate(-5deg)" }}>Oshada</div>
                    <div className="w-full border-t-2 border-zinc-400 pt-1.5 sm:pt-2 text-[10px] sm:text-sm font-semibold text-zinc-600 uppercase tracking-wider sm:tracking-widest">
                      Oshada's Signature
                    </div>
                  </div>
                  <div className="w-[45%] text-center flex flex-col items-center">
                    <div className="text-2xl sm:text-4xl text-[#FF1493] mb-1 sm:mb-2 drop-shadow-sm" style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Segoe Script', cursive", transform: "rotate(-2deg)" }}>Senuri</div>
                    <div className="w-full border-t-2 border-zinc-400 pt-1.5 sm:pt-2 text-[10px] sm:text-sm font-semibold text-zinc-600 uppercase tracking-wider sm:tracking-widest">
                      Senuri's Signature
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl transform rotate-12 opacity-80 pointer-events-none">🌺</div>
                <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-6 text-3xl sm:text-4xl transform -rotate-12 opacity-80 pointer-events-none">🐾</div>
              </div>

              {/* Action Buttons Stack (Download Button & Continue Button right underneath) */}
              <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-md">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-4 px-6 sm:px-8 bg-[#4A90E2] text-white font-bold text-base sm:text-lg rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isDownloading ? "Capturing... 📸" : "Download Our Agreement 📥"}
                </button>

                <button
                  onClick={() => {
                    setStep("nextStep");
                    fireConfetti();
                  }}
                  className="w-full py-4 px-6 sm:px-8 bg-linear-to-r from-pink-500 via-rose-500 to-[#FF1493] text-white font-bold text-base sm:text-lg rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue to Next Step ✨
                </button>
              </div>
            </motion.div>
          )}

          {step === "nextStep" && (
            <motion.div
              key="nextStep"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center w-full max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-[#FF1493] font-bold text-xs sm:text-sm mb-4 shadow-sm"
                >
                  Step 2 • Mystery Gift 🎁✨
                </motion.span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-rose-500 to-[#FF1493] mb-4 drop-shadow-sm"
                  style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
                >
                  Your Secret Mystery Coupon! 💖
                </h2>
                <p className="text-zinc-600 font-medium text-base sm:text-lg max-w-xl mx-auto px-2">
                  Now that our agreement is official, tap the coupon below to reveal your secret mystery gift code! 🎁
                </p>
              </div>

              {/* Single Mystery Gift Coupon Card */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleCoupon}
                className={`relative w-full p-6 sm:p-8 rounded-3xl border-3 transition-all cursor-pointer select-none text-center mb-8 shadow-xl ${
                  isCouponUnlocked
                    ? "bg-gradient-to-br from-pink-500 via-rose-500 to-[#FF1493] text-white border-pink-300 shadow-pink-500/40"
                    : "bg-white/90 backdrop-blur-xl border-pink-200 text-zinc-800 hover:border-pink-400 hover:shadow-pink-300/30"
                }`}
              >
                <div className="text-5xl sm:text-6xl mb-4 drop-shadow-md">🎁</div>
                <h3 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${isCouponUnlocked ? "text-white" : "text-[#FF1493]"}`}>
                  Exclusive Mystery Gift Coupon
                </h3>
                <p className={`text-sm sm:text-base mb-6 font-medium ${isCouponUnlocked ? "text-pink-100" : "text-zinc-600"}`}>
                  {isCouponUnlocked
                    ? "Your secret gift code has been unlocked! 🎉"
                    : "Tap to reveal your secret mystery code!"}
                </p>

                {/* Unlocked Secret Code Section */}
                {isCouponUnlocked ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-inner"
                  >
                    <div className="text-xs uppercase font-bold tracking-widest text-pink-100">
                      Your Secret Gift Code:
                    </div>
                    
                    <div className="bg-white text-[#FF1493] font-mono font-extrabold text-xl sm:text-2xl px-6 py-3 rounded-xl shadow-md border-2 border-pink-200 tracking-wider flex items-center gap-3">
                      <span>{secretCode}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode();
                        }}
                        className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-lg transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                      </button>
                    </div>

                    {/* Instagram Notice */}
                    <div className="mt-2 bg-white/90 text-zinc-800 p-4 rounded-xl shadow-md border border-pink-200 flex items-center justify-center gap-3 text-sm sm:text-base font-semibold">
                      <svg className="w-6 h-6 text-pink-600 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Send this code to <strong>Oshada</strong> on Instagram to redeem your mystery gift! 📲✨</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-50 border border-pink-200 text-pink-600 font-bold text-sm shadow-sm">
                    <Sparkles size={16} /> Tap to Unlock Code 🎟️
                  </div>
                )}
              </motion.div>

              {/* Special Promise Note Card */}
              <div className="w-full bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-md text-center mb-8 sm:mb-10">
                <div className="text-3xl mb-2">🥰</div>
                <h3 className="text-2xl font-bold text-[#FF1493] mb-3 font-serif">
                  A Promise to My Forever Angel
                </h3>
                <p className="text-zinc-700 italic font-medium leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
                  "I promise to support your dreams, cherish every single moment with you, make you laugh when you're tired, and love you unconditionally today, tomorrow, and forever."
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setStep("accepted")}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-pink-500 font-bold text-base rounded-full border-2 border-pink-200 shadow-md hover:bg-pink-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={18} /> View Agreement 📜
                </button>
                <button
                  onClick={fireConfetti}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-pink-500 via-rose-500 to-[#FF1493] text-white font-bold text-base rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Celebrate Again! 🎉
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}


