"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main Cursor (Hibiscus) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-9999 flex items-center justify-center text-3xl drop-shadow-md"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        🌺
      </motion.div>

      {/* Trailing Sparkle 1 */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-9998 flex items-center justify-center text-sm opacity-60"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      >
        ✨
      </motion.div>

      {/* Trailing Sparkle 2 */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-9997 flex items-center justify-center text-xs opacity-40"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 1,
        }}
      >
        💖
      </motion.div>
    </>
  );
}
