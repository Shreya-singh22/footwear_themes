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
      {/* 🌌 Background "ELEGANT" Text */}
      <div className="absolute top-[10%] left-0 w-full flex justify-center pointer-events-none z-0">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[18vw] font-display font-medium tracking-[0.2em] text-white select-none whitespace-nowrap"
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.4)',
            color: 'transparent',
            lineHeight: '0.8'
          }}
        >
          {config.title}
        </motion.h1>
      </div>

      {/* 📐 Vertical "SIMPLE" Text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex flex-col justify-center pointer-events-none z-0">
        <motion.span 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-[12vw] font-display font-light uppercase tracking-[0.4em] transform rotate-90 origin-center text-white select-none whitespace-nowrap"
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
            color: 'transparent'
          }}
        >
          {config.verticalText}
        </motion.span>
      </div>

      {/* 🏺 The Pedestal Area */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Spotlight Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] opacity-40" />
        
        <motion.div 
          style={{ y, rotate }}
          className="relative flex flex-col items-center"
        >
          {/* Main Shoe Image */}
          <img 
            src={config.image} 
            alt="Luxury Sneaker"
            className="w-[70vw] md:w-[650px] object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,1)] relative z-20 pointer-events-none select-none"
          />

          {/* 🌑 3D Cylinder Pedestal */}
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[100px] md:h-[180px] z-10">
            {/* Pedestal Top Surface */}
            <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[100%] border-t border-white/10 shadow-[inner_0_4px_10px_rgba(255,255,255,0.1)]" />
            
            {/* Pedestal Body Side */}
            <div className="absolute top-[30px] left-0 w-full h-full bg-gradient-to-r from-[#050505] via-[#111] to-[#050505] border-x border-white/5" />
            
            {/* Pedestal Base Shadow */}
            <div className="absolute -bottom-10 left-[-10%] w-[120%] h-20 bg-black/90 blur-3xl opacity-80" />
          </div>

          {/* Shoe Shadow on Pedestal */}
          <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[60%] h-12 bg-black/95 blur-2xl rounded-[100%] z-10" />
        </motion.div>

        {/* CTA Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-40 flex flex-col items-center"
        >
          <button className="group relative px-16 py-6 border border-white/10 bg-black text-white font-display font-medium uppercase tracking-[0.5em] text-[11px] overflow-hidden rounded-full hover:border-white/40 transition-all duration-700 active:scale-95">
            <span className="relative z-10 flex items-center space-x-4">
              <ShoppingCart size={14} className="opacity-60" />
              <span>{config.ctaText}</span>
            </span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <style jsx>{`
              button:hover span { color: black; }
              button:hover { color: black; }
            `}</style>
          </button>
          
          <div className="mt-12 flex flex-col items-center opacity-30 animate-pulse">
            <span className="text-[9px] uppercase tracking-[0.6em] mb-4 font-display">Elite Craftsmanship</span>
            <ArrowDown size={14} />
          </div>
        </motion.div>
      </div>

      {/* 🎞 Cinema Lighting Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </section>
  );
};

export default Hero;
