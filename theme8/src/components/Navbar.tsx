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
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl cursor-pointer transition-colors hover:bg-background/90"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-wide text-primary">
          {logoText}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link href="/shop?category=Sneakers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sneakers</Link>
          <Link href="/shop?category=Running" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Running</Link>
          <Link href="/shop?category=Formal" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Formal</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-4 p-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Home</Link>
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Shop</Link>
              <Link href="/shop?category=Sneakers" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Sneakers</Link>
              <Link href="/shop?category=Running" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Running</Link>
              <Link href="/shop?category=Formal" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">Formal</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
