"use client";

import { motion } from "framer-motion";

export default function FloatingAccents() {
  const floatingItems = [
    { id: 1, symbol: "🌺", left: "10%", delay: 0, duration: 15, size: "text-3xl" },
    { id: 2, symbol: "💖", left: "25%", delay: 2, duration: 12, size: "text-4xl" },
    { id: 3, symbol: "✨", left: "40%", delay: 4, duration: 18, size: "text-2xl" },
    { id: 4, symbol: "🌸", left: "55%", delay: 1, duration: 14, size: "text-3xl" },
    { id: 5, symbol: "💙", left: "70%", delay: 5, duration: 16, size: "text-5xl" },
    { id: 6, symbol: "✨", left: "85%", delay: 3, duration: 13, size: "text-2xl" },
    { id: 7, symbol: "💖", left: "95%", delay: 6, duration: 17, size: "text-3xl" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute bottom-[-10%] ${item.size} opacity-40`}
          style={{ left: item.left }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", "30px", "-30px", "0px"],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            },
            x: {
              duration: item.duration * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            },
            rotate: {
              duration: item.duration * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            }
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
}
