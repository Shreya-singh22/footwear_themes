"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/contexts/store-context";

export default function Home() {
  const { customization } = useStoreContext();
  const featured = products.filter(p => p.tags.includes("bestseller"));
  const newArrivals = products.filter(p => p.isNew);

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const heroHeadline = customization?.heroSection?.title || "Step Into Luxury";
  const heroSubtitle = customization?.heroSection?.subtitle || "Handcrafted shoes that blend timeless elegance with modern performance. Every pair tells a story.";
  const heroBg = customization?.heroSection?.backgroundImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative flex min-h-[90vh] items-center overflow-hidden cursor-pointer"
        onClick={handleSectionClick('heroSection')}
      >
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Hero shoe"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
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
              {heroHeadline.split(' ').map((word: string, i: number) => i === heroHeadline.split(' ').length - 1 ? <span key={i} className="text-gold-gradient">{word}</span> : word + ' ')}
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="rounded-none px-8 font-body text-sm uppercase tracking-wider">
                <Link href="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-8 font-body text-sm uppercase tracking-wider border-foreground/20 hover:bg-foreground/5">
                <Link href="/shop?category=Running">Explore Running</Link>
              </Button>
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
