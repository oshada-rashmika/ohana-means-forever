"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const duration = 3500; // 3.5 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsReady(true);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const getStatusMessage = (prog: number) => {
    if (prog < 25) return "Gathering tropical hibiscus flowers... 🌺";
    if (prog < 50) return "Calling Experiment 626... 💙";
    if (prog < 75) return "Adding extra Barbie sparkle... ✨";
    if (prog < 100) return "Wrapping up the love story... 🌸";
    return "Aloha! Everything is ready! 🎉";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Centerpiece GIF */}
      <div className="max-w-xs w-full mb-8 flex justify-center">
        <img 
          src="/loading.gif" 
          alt="Cute Stitch Animation" 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Progress Bar & Status */}
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-600 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </div>
        
        <div className="flex justify-between w-full text-sm font-medium text-pink-600">
          <span>{getStatusMessage(progress)}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Entry Button */}
      <AnimatePresence>
        {isReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            onClick={onEnter}
            className="mt-12 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-full shadow-lg hover:shadow-pink-400/50 hover:scale-105 transition-transform animate-bounce"
          >
            Enter Our World 🌺
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
