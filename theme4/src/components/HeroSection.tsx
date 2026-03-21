"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-sneaker.png";
import { useStoreContext } from "@/contexts/store-context";

const HeroSection = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const titleText = customization?.heroSection?.title || "STEP INTO\nTHE FIRE";
  const bgImage = customization?.heroSection?.backgroundImage;

  return (
    <section 
      onClick={handleSectionClick}
      className="relative overflow-hidden bg-background pt-24 lg:pt-32 pb-16 lg:pb-32 cursor-pointer transition-all"
    >
      {bgImage && (
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start relative z-10 w-full pt-10 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 space-y-6 relative z-20"
        >
          <div className="inline-block border border-primary/50 px-4 py-1.5 rounded-sm">
            <span className="font-display text-xs tracking-[0.3em] text-primary">
              NEW DROP — SS26
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] bg-gradient-to-br from-foreground via-foreground to-primary/80 bg-clip-text text-transparent whitespace-pre-line drop-shadow-sm">
            {titleText}
          </h1>

          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Limited edition streetwear kicks. Built for the bold. 
            Only 500 pairs worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" variant="hero" className="rounded-full px-8 py-6 text-base tracking-widest font-display w-full sm:w-auto">
              SHOP NOW →
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base tracking-widest font-display bg-transparent text-foreground border-foreground/30 hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto">
              VIEW LOOKBOOK
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <span className="font-display text-2xl font-bold text-foreground">500</span>
              <p className="text-xs text-muted-foreground tracking-wider">LIMITED PAIRS</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="font-display text-2xl font-bold text-foreground">24H</span>
              <p className="text-xs text-muted-foreground tracking-wider">EARLY ACCESS</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="font-display text-2xl font-bold text-foreground">FREE</span>
              <p className="text-xs text-muted-foreground tracking-wider">SHIPPING</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-1/2 flex justify-center items-start relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full pointer-events-none mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="absolute z-10 w-[160%] sm:w-[140%] lg:w-[190%] max-w-[1200px] left-[-30%] sm:left-[-20%] lg:left-[-50%] top-[-5%] lg:top-[-20%] drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)]"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={typeof heroImage === "string" ? heroImage : heroImage.src} 
              alt="Premium Sneaker"
              className="w-full h-auto object-contain transform -rotate-12 hover:rotate-[-5deg] hover:scale-105 transition-all duration-700 ease-out"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
