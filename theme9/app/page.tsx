"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/contexts/store-context";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1920&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&q=80",
];

export default function Home() {
  const { customization } = useStoreContext();
  const [currentImage, setCurrentImage] = useState(0);
  const featured = products.filter(p => p.tags.includes("bestseller"));
  const newArrivals = products.filter(p => p.isNew);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const heroHeadline = customization?.heroSection?.title || "Step Into Luxury";
  const heroSubtitle = customization?.heroSection?.subtitle || "Handcrafted shoes that blend timeless elegance with modern performance. Every pair tells a story.";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative flex min-h-[95vh] items-center overflow-hidden cursor-pointer"
        onClick={handleSectionClick('heroSection')}
      >
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGES[currentImage]}
                alt="Luxury footwear"
                className="h-full w-full object-cover opacity-50"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">New Collection 2026</p>
            <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
              {heroHeadline.split(' ').map((word: string, i: number) => i === heroHeadline.split(' ').length - 1 ? <span key={i} className="text-accent-gradient">{word}</span> : word + ' ')}
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="rounded-none px-8 font-body text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(230,222,201,0.2)]">
                  <Link href="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="rounded-none px-8 font-body text-sm uppercase tracking-wider border-primary/20 hover:bg-primary/5 text-primary">
                  <Link href="/shop?category=Running">Explore Running</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Curated Selection</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Bestsellers</h2>
          </div>
          <Link href="/shop" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="relative overflow-hidden border-y border-border">
        <div className="container mx-auto grid gap-0 md:grid-cols-2">
          <div className="flex items-center px-4 py-20 md:px-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Craftsmanship</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Made to Last</h2>
              <p className="mt-4 text-muted-foreground">
                Each pair is crafted from the finest materials by skilled artisans. From premium leather to advanced cushioning technology, every detail is considered.
              </p>
              <div className="mt-8 flex gap-8">
                {[{ label: "Premium Materials", value: "100%" }, { label: "Customer Satisfaction", value: "4.8★" }, { label: "Countries", value: "28+" }].map(stat => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80"
              alt="Craftsmanship"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Fresh Drops</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
