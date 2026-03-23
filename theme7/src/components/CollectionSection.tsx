"use client";

import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";
import sneaker5 from "@/assets/sneaker-5.jpg";
import sneaker6 from "@/assets/sneaker-6.jpg";
import mensCollection from "@/assets/mens-collection-premium.png";
import sneakerKids from "@/assets/sneaker-kids.jpg";
import lifestyleGroup from "@/assets/lifestyle-group-premium.png";
import Image from "next/image";
import { products } from "@/data/products";
import { useStoreContext } from "@/contexts/store-context";

const mensProducts = products.filter(p => p.category === "Men");
const kidsProducts = products.filter(p => p.category === "Kids");

const CollectionSection = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const mensTitle = customization?.mensSection?.title || "Men's Collection";
  const kidsTitle = customization?.kidsSection?.title || "Kid's Collection";
  const bannerTitle = customization?.bannerSection?.title || "Sneakers.";
  return (
    <div id="collection" className="bg-[#F2F0EA] space-y-32 pb-32">
      {/* Men's Collection */}
      <section 
        onClick={handleSectionClick('mensSection')}
        className="px-6 md:px-12 lg:px-20 pt-32"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-olive">New Standards</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
              {mensTitle}
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4A3728] hover:text-olive transition-colors"
          >
            Explore All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Featured Product (Takes 2x2 in grid) */}
          <ProductCard product={mensProducts[0]} isFeatured={true} tag="Editorial Pick" />
          
          {/* Regular Products to fill the right side of the first row */}
          <ProductCard product={mensProducts[1]} />
          <ProductCard product={mensProducts[2]} />
          
          {/* Products for the second row under the regular ones */}
          <ProductCard product={mensProducts[3]} />
          {/* Use another product from the data instead of hardcoded */}
          <ProductCard product={products[4]} tag="Premium" />
        </div>
      </section>

      {/* Impactful Lifestyle Banner */}
      <section 
        onClick={handleSectionClick('bannerSection')}
        className="px-6 md:px-12 lg:px-20 transition-all duration-1000"
      >
        <div className="relative h-[85vh] w-full overflow-hidden rounded-sm group shadow-2xl">
          <Image
            src={lifestyleGroup}
            alt="Sneakers Lifestyle"
            fill
            className="object-cover transition-transform duration-[5s] group-hover:scale-110 ease-out"
            priority
            sizes="100vw"
          />
          {/* High contrast dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12">
            <div className="space-y-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
              <p className="text-xs md:text-sm font-black uppercase tracking-[0.6em] text-white/70 mb-4">The Stride Culture</p>
              <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-display font-bold text-white tracking-tighter leading-[0.85] mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                {bannerTitle.split('.').map((part: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {part}{i < arr.length - 1 ? '.' : ''}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="text-white/90 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-10 text-balance">
                Built for the culture. From the streets to the spotlight, every pair tells a story of performance and style.
              </p>
              <a
                href="#"
                className="inline-flex bg-white text-black px-16 py-5 text-sm font-black uppercase tracking-[0.3em] hover:bg-olive hover:text-white transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                Shop All Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kid's Collection */}
      <section 
        onClick={handleSectionClick('kidsSection')}
        className="px-6 md:px-12 lg:px-20 py-32 bg-white/50"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-olive">Junior Series</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
              {kidsTitle}
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4A3728] hover:text-olive transition-colors"
          >
            Explore All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Product Grid - Layout variation */}
          <ProductCard product={kidsProducts[1]} />
          <ProductCard product={kidsProducts[2]} />
          <ProductCard product={kidsProducts[3]} />
          
          {/* Featured on the right */}
          <ProductCard product={kidsProducts[0]} isFeatured={true} tag="Must Have" />
        </div>
      </section>
    </div>
  );
};

export default CollectionSection;
