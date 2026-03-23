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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[30vw] font-display font-black tracking-[-0.05em] text-white select-none whitespace-nowrap"
          style={{ 
            WebkitTextStroke: '2px rgba(255,255,255,0.2)',
            color: 'transparent'
          }}
        >
          {config.title}
        </motion.h1>
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 h-full flex flex-col justify-center pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-[12vw] font-display font-bold uppercase tracking-[0.2em] transform rotate-90 origin-center text-white select-none"
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
            color: 'transparent'
          }}
        >
          {config.verticalText}
        </motion.span>
      </div>

      <div className="absolute bottom-12 left-12 flex flex-col items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center space-x-4 mb-4"
        >
          <span className="w-8 h-[1px] bg-white opacity-20" />
          <span className="text-xs font-display font-bold tracking-[0.5em] text-white uppercase">{config.subtitle}</span>
        </motion.div>
        <p className="text-[10px] text-white/30 font-display uppercase tracking-[0.3em] max-w-[200px] leading-relaxed">
          Premium aesthetics meets performance engineering.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center">
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-t from-white/5 to-transparent blur-3xl opacity-30" />
        
        <motion.div 
          style={{ y, rotate }}
          className="relative group cursor-grab active:cursor-grabbing"
        >
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/80 blur-xl rounded-full opacity-60" />
          
          <img 
            src={config.image} 
            alt="Luxury Sneaker"
            className="w-[80vw] md:w-[600px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] relative z-20"
          />

          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[240px] h-[60px] bg-white/5 border-t border-white/10 rounded-[100%] z-10 shadow-[0_20px_50px_rgba(0,0,0,1)]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 flex flex-col items-center"
        >
          <button className="group relative px-12 py-5 bg-white text-black font-display font-bold uppercase tracking-[0.4em] text-[10px] overflow-hidden rounded-full hover:scale-110 transition-transform duration-700 active:scale-95">
            <span className="relative z-10 flex items-center space-x-3">
              <ShoppingCart size={14} />
              <span>{config.ctaText}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <div className="mt-8 flex flex-col items-center opacity-20 group cursor-pointer hover:opacity-100 transition-opacity">
            <span className="text-[8px] uppercase tracking-[0.4em] mb-2 font-display">Scroll to Explore</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-white/5 via-transparent to-transparent opacity-40" />
    </section>
  );
};

export default Hero;
