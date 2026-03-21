"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import SearchOverlay from "./SearchOverlay";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStoreContext } from "@/contexts/store-context";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { customization } = useStoreContext();
  const cartCount = useStore((s) => s.cartCount());
  const wishlistCount = useStore((s) => s.wishlist.length);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "New Arrivals", href: "/products?filter=new", badge: "New" },
    { name: "Men", href: "/products?category=men" },
    { name: "Women", href: "/products?category=women" },
    { name: "Kids", href: "/products?category=kids" },
    { name: "Sale", href: "/products?filter=sale", color: "text-primary" },
  ];

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'navbar' }, '*');
    }
  };

  return (
    <>
      <nav 
        onClick={handleSectionClick}
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 w-full",
          scrolled 
            ? "bg-white/90 backdrop-blur-md border-b border-border py-4 shadow-sm" 
            : "bg-white/50 backdrop-blur-sm py-6"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-display text-2xl sm:text-3xl font-black tracking-tighter uppercase italic group">
              {customization?.navbar?.logoText ? (
                customization.navbar.logoText
              ) : (
                <>SOLE<span className="text-primary group-hover:text-foreground transition-colors">STYLE.</span></>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={cn(
                    "text-xs font-black uppercase tracking-widest relative group",
                    link.color || "text-foreground/70 hover:text-foreground",
                    pathname === link.href && "text-foreground"
                  )}
                >
                  {link.name}
                  {link.badge && (
                    <span className="absolute -top-3 -right-6 px-1.5 py-0.5 bg-primary text-[8px] text-white rounded-full animate-pulse font-black">
                       {link.badge}
                    </span>
                  )}
                  {/* Hover underline */}
                   <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                   )} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop Search Bar (Integrated) */}
              <div className="hidden md:flex items-center bg-secondary/50 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 transition-all w-48 lg:w-64 group">
                <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
                <button 
                   onClick={() => setSearchOpen(true)}
                   className="ml-2 text-xs font-medium text-muted-foreground w-full text-left outline-none"
                >
                  Search styles...
                </button>
              </div>

              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden p-2.5 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                <Link href="/wishlist" className="p-2.5 rounded-full hover:bg-secondary transition-all relative group" aria-label="Wishlist">
                  <Heart className="w-5 h-5 group-hover:fill-primary group-hover:text-primary transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center animate-in zoom-in">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link href="/cart" className="p-2.5 rounded-full hover:bg-secondary transition-all relative group" aria-label="Cart">
                  <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-foreground text-background text-[9px] font-black rounded-full flex items-center justify-center animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  className="lg:hidden p-2.5 rounded-full hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-8 border-t border-border animate-in slide-in-from-top duration-300">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={cn(
                      "text-2xl font-black uppercase tracking-tighter",
                      link.color || "text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
