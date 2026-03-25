"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-4 w-4 rounded-full bg-primary mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 3 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-primary/30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
    </>
  );
}
