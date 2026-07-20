"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg"],
      loop: true,
      volume: 0.3,
      html5: true,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const toggleMute = () => {
    if (soundRef.current) {
      const newMuteState = !isMuted;
      soundRef.current.mute(newMuteState);
      setIsMuted(newMuteState);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white selection:bg-pink-200">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <LoadingScreen key="loading" onEnter={handleEnter} />
        ) : (
          <div key="landing" className="relative w-full h-full">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleMute}
              className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg border border-pink-100 text-pink-500 hover:bg-white/80 transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <LandingPage />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
