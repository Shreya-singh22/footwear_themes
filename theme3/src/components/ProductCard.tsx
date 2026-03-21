"use client";

import Link from "next/link";
import { Heart, Star, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist, addToCart, cart } = useStore();
  
  const inWishlist = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.product.id === product.id);

  // Generate a fake original price for the UI upgrade (20% higher)
  const originalPrice = product.price * 1.2;

  return (
    <div className="group relative flex flex-col h-full rounded-[2rem] bg-card border border-border/50 p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30">
      
      {/* Badges Overlay */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        {product.isTrending && (
          <span className="bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
            🔥 Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="bg-secondary text-secondary-foreground text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
            New
          </span>
        )}
      </div>

      {/* Quick Actions Overlay (Appears on Hover) */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={cn(
            "p-3 rounded-full shadow-lg transition-transform hover:scale-110",
            inWishlist 
              ? "bg-primary text-primary-foreground" 
              : "bg-white text-muted-foreground hover:text-primary"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
        </button>
        <button className="p-3 bg-white text-muted-foreground rounded-full shadow-lg hover:text-primary flex items-center justify-center transition-transform hover:scale-110">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0" />
      
      {/* Product Image */}
      <div className="relative aspect-square w-full mb-6 flex items-center justify-center pointer-events-none rounded-2xl bg-secondary/30 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          unoptimized
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Product Info */}
      <div className="mt-auto space-y-4 z-10 pointer-events-none relative">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-foreground font-display font-black text-sm md:text-base uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Interactive Rating */}
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-[10px] font-bold ml-1">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Improved Price UI */}
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground font-bold line-through decoration-muted-foreground/50">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, product.sizes[0], product.colors[0]);
          }}
          className={cn(
            "w-full h-12 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 pointer-events-auto shadow-md",
            isInCart 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
              : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:shadow-primary/25"
          )}
        >
          {isInCart ? "ADDED TO CART" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
