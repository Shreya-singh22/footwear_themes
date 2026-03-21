"use client";

import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.error("Please select a size first!");
  };

  return (
    <div 
      className="group flex flex-col h-full bg-white border border-transparent hover:border-border transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative block aspect-[4/5] overflow-hidden bg-secondary">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
              New Drop
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-sale text-accent-foreground text-[10px] font-black uppercase tracking-widest">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 z-10 ${
            inWishlist 
              ? "bg-sale text-white scale-110" 
              : "bg-white/80 backdrop-blur-md text-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 z-10">
          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button 
                onClick={handleAddToCart}
                className="w-full h-12 rounded-none bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-tighter"
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
            </Button>
            <Button 
                variant="secondary"
                className="w-full h-12 rounded-none bg-white/90 backdrop-blur text-foreground hover:bg-white font-bold uppercase tracking-tighter"
                asChild
            >
              <Link href={`/product/${product.id}`}>
                <Eye className="w-4 h-4 mr-2" /> Quick View
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{product.brand}</p>
          <div className="flex items-center gap-1">
             <Star className="w-3 h-3 fill-accent text-accent" />
             <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="group/title">
          <h3 className="font-display text-lg font-bold uppercase leading-tight group-hover/title:text-primary transition-colors mb-3">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-dashed border-border flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black tracking-tighter">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through decoration-primary/40">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex -space-x-2">
             {product.colors.slice(0, 3).map((color, i) => (
                <div key={color} className="w-4 h-4 rounded-full border-2 border-white bg-neutral-200" title={color} />
             ))}
             {product.colors.length > 3 && (
                <div className="w-4 h-4 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center">
                    <span className="text-[8px] font-bold">+{product.colors.length - 3}</span>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
