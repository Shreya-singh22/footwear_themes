"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/contexts/store-context";

interface ProductCardProps {
  name: string;
  price: number;
  image: string | StaticImageData;
  tag?: string;
  index?: number;
}

const ProductCard = ({ name, price, image, tag, index = 0 }: ProductCardProps) => {
  const { setCartCount, setWishlistCount } = useStoreContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-sm overflow-hidden border border-border hover:border-primary/40 transition-all duration-500"
    >
      {tag && (
        <div className="absolute top-3 left-3 bg-foreground text-background text-xs font-bold px-2 py-1 z-10">
          {tag}
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={typeof image === "string" ? image : image.src}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCartCount((p:number) => p+1); alert("Added to cart"); }}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlistCount((p:number) => p+1); alert("Added to wishlist"); }}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
            title="Wishlist"
          >
            <Heart size={20} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-display text-sm tracking-wider text-foreground">{name}</h3>
        <p className="font-display text-lg font-bold text-primary">₹{price.toLocaleString("en-IN")}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
