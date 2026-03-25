"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const liked = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const images = product.colors[0]?.images || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/50">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={hovered && images[1] ? images[1] : images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="rounded-none bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-none bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 rounded-none bg-background text-foreground hover:bg-primary hover:text-primary-foreground text-[10px] font-bold uppercase tracking-wider"
              onClick={() => addToCart({ productId: product.id, colorName: product.colors[0].name, size: product.sizes[0].size })}
            >
              <ShoppingCart className="mr-2 h-3.5 w-3.5" /> Add to Cart
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-none bg-background/80 backdrop-blur-sm hover:bg-background"
              asChild
            >
              <Link href={`/product/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{product.brand}</p>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-1 w-1 rounded-full ${s <= Math.round(product.rating) ? "bg-primary" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
