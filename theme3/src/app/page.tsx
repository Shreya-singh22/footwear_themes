"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useStoreContext } from "@/contexts/store-context";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { customization } = useStoreContext();
  const { addToCart, cart } = useStore();
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);

  // Background colors from the color palette for cards
  const cardColors = [
    "bg-earthy-olive",
    "bg-earthy-tan",
    "bg-earthy-slate",
    "bg-earthy-brown"
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Full-Bleed Hero Section */}
      <section 
        onClick={(e) => {
          if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
          }
        }}
        className="relative w-full h-[85vh] md:h-[90vh] bg-neutral-900 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2000&auto=format&fit=crop"
          alt="Premium white sneakers walking"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Left-heavy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />

        {/* Hero Content - Added pt-20 to clear the absolute Navbar */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 lg:px-24 pt-20 container mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 max-w-lg drop-shadow-lg">
              {customization?.heroSection?.title ? (
                <span className="text-white">{customization.heroSection.title}</span>
              ) : (
                <>
                  <span className="text-white block">STEP UP</span>
                  <span className="text-primary block drop-shadow-md">YOUR STYLE</span>
                </>
              )}
            </h1>
            <p className="text-white/90 text-sm md:text-base lg:text-xl mb-10 max-w-md font-medium leading-relaxed drop-shadow-md">
              {customization?.heroSection?.subtitle || "Explore our new collection of sneakers, boots, and casual footwear."}
            </p>
            <div>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 text-sm font-black uppercase tracking-[0.15em] shadow-[0_0_40px_rgba(251,189,8,0.3)] hover:shadow-[0_0_60px_rgba(251,189,8,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Link href="/products">
                  SHOP NOW
                </Link>
              </Button>
            </div>
          </div>
      </section>

      {/* Why Us Strip */}
      <section className="border-y border-border/50 bg-card py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6 md:gap-10">
            {[
              { label: "Free Shipping", icon: "🚚", desc: "On orders over ₹15,000" },
              { label: "Easy Returns", icon: "🔄", desc: "30-day return policy" },
              { label: "Premium Quality", icon: "⭐", desc: "Guaranteed authentic" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-xl md:text-2xl shadow-inner">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-display font-black text-xs md:text-sm uppercase tracking-widest">{feature.label}</h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Strip (UX Boost) */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
          {[
            { tag: "Sneakers", emoji: "👟" },
            { tag: "Running", emoji: "🏃" },
            { tag: "Casual", emoji: "☕" },
            { tag: "Premium", emoji: "✨" }
          ].map((cat, i) => (
            <Link 
              key={i} 
              href={`/products?category=${cat.tag.toLowerCase()}`}
              className="group flex-1 min-w-[140px] flex items-center justify-center gap-2 p-4 md:p-6 bg-secondary/30 border border-border/50 rounded-2xl hover:bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="font-display font-black text-sm uppercase tracking-widest text-foreground">{cat.tag}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now (Horizontal Scrolling Power Move) */}
      <section className="py-12 md:py-20 bg-secondary/20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 mb-8 md:mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">Trending Now</h2>
            <p className="text-muted-foreground font-bold text-xs md:text-sm uppercase tracking-widest mt-2">Swipe to explore</p>
          </div>
          <Link href="/products" className="hidden md:flex font-display font-black text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors items-center gap-1">
            View All Collection &rarr;
          </Link>
        </div>

        {/* Horizontal Scroll Snap Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 lg:px-8 pb-12 pt-4 hide-scrollbar -mx-4 lg:mx-0">
          {trendingProducts.map((product) => (
            <div key={`trend-${product.id}`} className="snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[360px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Customer Favorites Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
           <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
             Customer Favorites
           </h2>
           <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-3">Handpicked styles our community loves.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={`fav-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
