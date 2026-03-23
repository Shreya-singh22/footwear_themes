"use client";

import { Heart, Star, ShoppingBag } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/products";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
  tag?: string;
}

const ProductCard = ({ product, isFeatured, tag }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  
  const { id, image, name, price } = product;

  return (
    <div 
      className={`group relative flex flex-col transition-all duration-500 ${isFeatured ? "col-span-2 row-span-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden rounded-sm bg-[#E5E2D9] ${isFeatured ? "aspect-[4/5] lg:aspect-auto h-full" : "aspect-square"}`}>
        {tag && (
          <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 transition-all">
            {tag}
          </span>
        )}
        
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 ${
            isInWishlist(id) 
              ? "bg-[#6B705C] text-white opacity-100 translate-y-0" 
              : "bg-white/80 backdrop-blur-md text-[#4A3728] hover:bg-[#4A3728] hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(id) ? "fill-current" : ""}`} />
        </button>

        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? "scale-110" : "scale-100"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-[#4A3728] text-white py-3 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-olive transition-colors shadow-2xl active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-5 space-y-2 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`w-3 h-3 ${star <= 4 ? "fill-[#6B705C] text-[#6B705C]" : "fill-transparent text-[#6B705C]/30"}`} />
          ))}
          <span className="text-[10px] text-[#4A3728]/40 font-bold ml-1 tracking-tighter">(12 REVIEWS)</span>
        </div>
        
        <div className="flex justify-between items-start gap-4">
          <Link href={`/products/${id}`}>
            <h3 className="text-sm font-bold text-[#4A3728] uppercase tracking-wider group-hover:text-olive transition-colors underline-offset-4 group-hover:underline">
              {name}
            </h3>
          </Link>
          <span className="text-sm font-display font-medium text-[#4A3728]/70">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
