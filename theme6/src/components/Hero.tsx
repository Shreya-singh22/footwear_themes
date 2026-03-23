"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, ArrowDown } from 'lucide-react';

interface HeroProps {
  customization?: {
    title?: string;
    subtitle?: string;
    verticalText?: string;
    ctaText?: string;
    image?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ customization }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const config = customization || {
    title: 'ELEGANT',
    subtitle: 'BLACK ○',
    verticalText: 'SIMPLE',
    ctaText: 'BUY NOW',
    image: '/images/hero-shoe.png'
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#000000] overflow-hidden flex items-center justify-center">
      {/* 🌌 High-Contrast "ELEGANT" Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="text-[25vw] font-display font-medium tracking-[-0.05em] text-white select-none whitespace-nowrap"
          style={{ 
            WebkitTextStroke: '2px rgba(255,255,255,0.8)',
            color: 'transparent',
          }}
        >
          {config.title}
        </motion.h1>
      </div>

      {/* 📐 Vertical "SIMPLE" Text - Right Side */}
      <div className="absolute right-12 top-0 h-full flex items-center pointer-events-none z-10">
        <motion.span 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="text-[8vw] font-display font-light uppercase tracking-[0.6em] transform rotate-90 origin-center text-white select-none whitespace-nowrap"
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.5)',
            color: 'transparent'
          }}
        >
          {config.verticalText}
        </motion.span>
      </div>

      {/* 🏺 The Hero Product Area */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        {/* Cinematic Spotlight */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div 
          style={{ y, rotate }}
          className="relative flex flex-col items-center justify-center"
        >
          {/* Main Shoe Image (Centric) */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.8, filter: 'brightness(0)' }}
            animate={{ opacity: 1, scale: 1, filter: 'brightness(1.1)' }}
            transition={{ duration: 2.5, ease: "circOut" }}
            src={config.image} 
            alt="Luxury Sneaker"
            className="w-[85vw] md:w-[800px] object-contain relative z-30 pointer-events-none select-none drop-shadow-[0_60px_60px_rgba(0,0,0,1)]"
          />

          {/* Deep Ambient Floor Shadow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-black blur-3xl rounded-[100%] z-10 opacity-90" />
        </motion.div>

        {/* Floating Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-20 flex flex-col items-center z-40"
        >
          <button className="group relative px-20 py-6 border border-white/20 bg-black/40 backdrop-blur-xl text-white font-display font-medium uppercase tracking-[0.6em] text-[12px] overflow-hidden rounded-full hover:border-white transition-all duration-700 shadow-2xl shadow-white/5 active:scale-95">
            <span className="relative z-10 flex items-center space-x-6">
              <ShoppingCart size={16} className="opacity-80" />
              <span>{config.ctaText}</span>
            </span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <style jsx>{`
              button:hover span { color: black; }
              button:hover { color: black; }
            `}</style>
          </button>
          
          <div className="mt-12 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group flex flex-col items-center">
             <span className="text-[10px] uppercase tracking-[0.5em] mb-4 font-display">Crafting Excellence</span>
             <ArrowDown size={18} className="animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* 🎞 Cinema Vignette Layer */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.9)_100%)] z-10" />
    </section>
  );
};

export default Hero;
