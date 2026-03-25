"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContext } from "@/contexts/store-context";

export default function Navbar() {
  const { cartCount, wishlist } = useStore();
  const { customization } = useStoreContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'navbar' }, '*');
    }
  };

  const logoText = customization?.navbar?.logoText || "SOLECRAFT";

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex w-fit items-center gap-8 rounded-full border border-white/10 bg-black/40 px-8 py-3 backdrop-blur-2xl transition-all hover:bg-black/60 hover:border-white/20"
        onClick={handleSectionClick}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-primary transition-transform hover:scale-105 active:scale-95">
          {logoText}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "Shop", "Sneakers", "Running", "Formal"].map((item) => (
            <Link 
              key={item}
              href={item === "Home" ? "/" : item === "Shop" ? "/shop" : `/shop?category=${item}`} 
              className="relative text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="/wishlist" className="relative text-muted-foreground hover:text-foreground transition-all hover:scale-110">
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-muted-foreground hover:text-foreground transition-all hover:scale-110">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 md:hidden overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-8 backdrop-blur-3xl pointer-events-auto"
          >
            <div className="flex flex-col gap-6 text-center">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-xl font-display text-foreground">Home</Link>
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="text-xl font-display text-foreground">Shop</Link>
              <Link href="/shop?category=Sneakers" onClick={() => setMobileOpen(false)} className="text-xl font-display text-foreground">Sneakers</Link>
              <Link href="/shop?category=Running" onClick={() => setMobileOpen(false)} className="text-xl font-display text-foreground">Running</Link>
              <Link href="/shop?category=Formal" onClick={() => setMobileOpen(false)} className="text-xl font-display text-foreground">Formal</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
