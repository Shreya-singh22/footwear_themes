"use client";

import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-sneaker-premium.png";
import Image from "next/image";
import { useStoreContext } from "@/contexts/store-context";

const HeroSection = () => {
  const { customization } = useStoreContext();
  const [loaded, setLoaded] = useState(false);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const headline = customization?.heroSection?.title || "Sneakers";
  const heroImageSrc = customization?.heroSection?.backgroundImage || heroImage;

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      onClick={handleSectionClick}
      className="relative min-h-screen bg-[#F2F0EA] overflow-hidden flex flex-col"
    >
      <div className="container flex-1 grid lg:grid-cols-2 gap-12 items-center relative py-20 px-6 md:px-12 lg:px-20">
        
        {/* Left Content */}
        <div className="z-10 relative">
          <h1 className={`text-[10rem] md:text-[12rem] lg:text-[15rem] font-display font-black tracking-tighter text-[#1A1A1A] leading-[0.8] mb-8 transition-all duration-1000 ${loaded ? "opacity-100 -translate-y-4" : "opacity-0 translate-y-8"}`}>
            {headline}
          </h1>
          
          <div className={`max-w-sm space-y-8 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#4A3728] leading-tight tracking-tight">
              Designed for movement.
              <br />
              Built for life.
            </h2>
            
            <p className="text-[#4A3728]/80 text-lg leading-relaxed font-medium">
              Whether you're on the streets or at a casual event, our sneakers fit every occasion.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#collection"
                className="group inline-flex items-center gap-3 bg-[#4A3728] text-[#F2F0EA] px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-none hover:bg-olive transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className={`relative h-[600px] lg:h-[900px] transition-all duration-1000 delay-500 overflow-hidden ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
          <div className="absolute top-0 right-0 z-20 text-right space-y-2">
            {["Premium materials.", "Timeless style.", "Unmatched comfort."].map((text, i) => (
              <p key={text} className={`text-xs font-black text-[#4A3728]/30 uppercase tracking-[0.3em] transition-all duration-700`} style={{ transitionDelay: `${700 + i * 100}ms` }}>
                {text}
              </p>
            ))}
          </div>
          
          <div className="w-full h-full relative z-10 group cursor-crosshair">
            <Image
              src={heroImageSrc}
              alt="Premium Stride Sneakers"
              fill
              className="object-contain object-right-bottom transition-transform duration-[2s] ease-out group-hover:scale-110"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bottom Left Socials */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-center gap-6">
          <a href="#" className="text-[#4A3728]/40 hover:text-[#4A3728] transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-[#4A3728]/40 hover:text-[#4A3728] transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-[#4A3728]/40 hover:text-[#4A3728] transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-[#4A3728]/40 hover:text-[#4A3728] font-bold text-sm transition-colors">
            TIKTOK
          </a>
        </div>
      </div>
      
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E5E2D9] -z-10" />
    </section>
  );
};

export default HeroSection;
