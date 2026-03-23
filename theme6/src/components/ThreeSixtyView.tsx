"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ThreeSixtyViewProps {
  images?: string[];
}

const ThreeSixtyView: React.FC<ThreeSixtyViewProps> = ({ images = [] }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(false);
  const startX = useRef(0);

  const viewImages = images.length > 1 ? images : [images[0] || '/images/hero-shoe.png'];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotating(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotating) return;
    const dragDistance = e.clientX - startX.current;
    const threshold = 50;
    
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? -1 : 1;
      setIndex((prev) => (prev + direction + viewImages.length) % viewImages.length);
      startX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative aspect-square w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
    >
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent rounded-[40px]" />
      </div>

      <motion.img 
        key={index}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        src={viewImages[index]} 
        alt="Product View"
        className="w-full h-full object-contain relative z-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        <span className="text-[8px] uppercase tracking-[0.5em] font-display opacity-20">Drag to rotate 360°</span>
      </div>
    </div>
  );
};

export default ThreeSixtyView;
