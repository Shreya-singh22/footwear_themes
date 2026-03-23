"use client";

import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, removeFromCart, addToCart, toggleWishlist } = useShop();

  return (
    <main className="pt-24 pb-20 bg-[#F2F0EA] min-h-screen">
      {/* Editorial Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#4A3728]/10 pb-12">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-olive">Saved Items</p>
            <h1 className="text-7xl md:text-9xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
              Wishlist.
            </h1>
          </div>
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-[#4A3728] hover:text-olive transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group/wishlist">
                <ProductCard product={product} />
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white text-destructive shadow-xl flex items-center justify-center opacity-0 group-hover/wishlist:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="space-y-4">
              <h3 className="text-4xl font-display font-bold text-[#4A3728]">Your wishlist is empty</h3>
              <p className="text-[#4A3728]/60 text-sm max-w-xs mx-auto">
                Save your favorite items here to keep an eye on them.
              </p>
            </div>
            <Link 
              href="/shop"
              className="inline-flex bg-[#4A3728] text-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-olive transition-all transform hover:scale-105 shadow-2xl"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>

      {/* Featured Recommendations if wishlist is empty */}
      {wishlist.length === 0 && (
        <section className="mt-40 px-6 md:px-12 lg:px-20 border-t border-[#4A3728]/5 pt-32">
          <div className="text-center mb-16 space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-olive/60">Recommendations</p>
            <h2 className="text-5xl font-display font-bold text-[#4A3728] tracking-tighter">Bestsellers for you</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Show some bestsellers here */}
          </div>
        </section>
      )}
    </main>
  );
}
