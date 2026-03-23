"use client";

import { Search, ShoppingBag, Menu, X, Heart, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useStoreContext } from "@/contexts/store-context";

const Header = () => {
  const { customization } = useStoreContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, cartCount, wishlistCount, removeFromCart, addToCart, cartTotal } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'header' }, '*');
    }
  };

  const storeName = customization?.brandName || "STRIDE";

  return (
    <header
      onClick={handleSectionClick}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container flex items-center justify-between h-18 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-tighter">
              {storeName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground -mt-1">
              Since 2026
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop?tag=New" className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
            <Link href="/shop?category=Men" className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Men</Link>
            <Link href="/shop?category=Women" className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Women</Link>
            <Link href="/shop?category=Kids" className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kids</Link>
            <Link href="/shop?tag=Sale" className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sale</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-full transition-all duration-200 hover:scale-105">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/wishlist" className="p-2 hover:bg-secondary rounded-full transition-all duration-200 hover:scale-105 relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6B705C] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-secondary rounded-full transition-all duration-200 hover:scale-105 relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#F2F0EA] border-l-[#4A3728]/10 w-full sm:max-w-md flex flex-col">
              <SheetHeader className="pb-8 border-b border-[#4A3728]/10">
                <SheetTitle className="font-display text-4xl font-bold text-[#4A3728]">Your Bag</SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-8 space-y-8">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-6 group">
                      <div className="relative w-24 h-32 bg-[#E5E2D9] rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="100px" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#4A3728]">{item.product.name}</h4>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-[#4A3728]/40 hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-[#4A3728]/60">{item.product.price}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center border border-[#4A3728]/10 bg-white">
                             <button className="px-2 py-1 text-[#4A3728]/40 hover:text-[#4A3728]"><Minus className="w-3 h-3" /></button>
                             <span className="text-[10px] font-bold px-2">{item.quantity}</span>
                             <button onClick={() => addToCart(item.product)} className="px-2 py-1 text-[#4A3728]/40 hover:text-[#4A3728]"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <ShoppingBag className="w-12 h-12 text-[#4A3728]/10" />
                    <p className="text-[#4A3728]/40 text-sm font-bold uppercase tracking-widest">Your bag is empty.</p>
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="pt-8 border-t border-[#4A3728]/10 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-[#4A3728]/40">Subtotal</span>
                    <span className="text-2xl font-display font-medium text-[#4A3728]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <Link 
                    href="/checkout"
                    className="w-full bg-[#4A3728] text-white py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-olive transition-all transform hover:scale-[1.02] shadow-2xl flex items-center justify-center"
                  >
                    Checkout.
                  </Link>
                  <p className="text-[10px] text-center text-[#4A3728]/40 font-bold uppercase tracking-widest">Taxes and shipping calculated at checkout</p>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <button
            className="p-2 hover:bg-secondary rounded-full transition-all duration-200 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-4 gap-1">
            <Link href="/shop?tag=New" className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-2 rounded-sm hover:bg-secondary/50 transition-all">New Arrivals</Link>
            <Link href="/shop?category=Men" className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-2 rounded-sm hover:bg-secondary/50 transition-all">Men</Link>
            <Link href="/shop?category=Women" className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-2 rounded-sm hover:bg-secondary/50 transition-all">Women</Link>
            <Link href="/shop?category=Kids" className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-2 rounded-sm hover:bg-secondary/50 transition-all">Kids</Link>
            <Link href="/shop?tag=Sale" className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-2 rounded-sm hover:bg-secondary/50 transition-all">Sale</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
