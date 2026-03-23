"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-16 tracking-widest uppercase text-center">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-[40px] border border-white/5">
            <p className="text-xl opacity-30 font-display uppercase tracking-[0.3em] mb-10">No items saved yet</p>
            <Link href="/shop" className="inline-block px-12 py-5 border border-white/20 uppercase tracking-[0.4em] font-display text-xs hover:bg-white hover:text-black transition-all duration-500 rounded-full">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {wishlist.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
