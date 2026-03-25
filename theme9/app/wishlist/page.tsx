"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 pt-16 text-center">
        <div className="mb-8 rounded-full bg-white p-10 shadow-sm">
          <Heart className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-foreground">Your Favorites</h1>
        <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-muted-foreground uppercase tracking-widest">
          Save the pieces you love to your personal sanctuary.
        </p>
        <Button asChild className="mt-10 h-14 rounded-none px-10 text-xs font-black uppercase tracking-[0.2em]">
          <Link href="/shop">Enter the Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground md:text-6xl">
            My Wishlist
          </h1>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            {wishlistProducts.length} Items Reserved in Sanctuary
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
