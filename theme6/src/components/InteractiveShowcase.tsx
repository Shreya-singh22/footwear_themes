"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveShowcaseProps {
  product: {
    name: string;
    price: number;
    images: string[];
  };
}

const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({ product }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!product) return null;

  return (
    <section className="py-40 px-8 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-[12vw] font-display font-black tracking-tighter opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none uppercase">SHOWCASE</h2>
        
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-4xl aspect-video rounded-[60px] bg-gradient-to-br from-white/10 to-transparent p-1 shadow-2xl"
        >
          <div 
            style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" } as any}
            className="absolute inset-4 rounded-[50px] bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden border border-white/5"
          >
            <motion.div 
              style={{ transform: "translateZ(100px)" } as any}
              className="w-full max-w-2xl"
            >
              <img 
                src={product.images[0]} 
                alt="Showcase Product" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
              />
            </motion.div>
            
            <div 
               style={{ transform: "translateZ(50px)" } as any}
               className="text-center mt-12 space-y-4"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 font-display">Craftsmanship refined</span>
              <h3 className="text-4xl font-display font-bold uppercase tracking-widest">{product.name}</h3>
              <p className="text-xs uppercase tracking-[0.4em] opacity-30">${product.price}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
