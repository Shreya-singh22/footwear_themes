import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroShoe from "@/assets/hero-shoe.png";
import { useStoreContext } from "@/contexts/store-context";

const HeroSection = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const headline = customization?.heroSection?.title || "Step Into The Future";
  const subheadline = customization?.heroSection?.subtitle || "Performance meets style. Discover footwear engineered for those who move differently.";
  const image = customization?.heroSection?.backgroundImage || heroShoe;
  const badgeText = customization?.heroSection?.badge || "New Collection 2026";

  return (
    <section 
      onClick={handleSectionClick}
      className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden pt-16 cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block font-display text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            {badgeText}
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 whitespace-pre-line">
            {headline}
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
            {subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-display font-semibold text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300"
            >
              Explore Collection
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
        >
          <img
            src={image}
            alt="Featured product"
            className="w-full max-w-lg animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
