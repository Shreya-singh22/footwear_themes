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
  const setCartOpen = useStore((s) => s.setCartOpen);
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
          "fixed top-0 z-50 transition-all duration-500 w-full",
          scrolled 
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm py-4 md:py-5"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className={cn("font-display text-2xl sm:text-3xl font-black tracking-tighter uppercase italic group transition-colors", scrolled ? "text-foreground" : "text-white")}>
              {customization?.navbar?.logoText ? (
                customization.navbar.logoText
              ) : (
                <>SOLE<span className="text-primary transition-colors">STYLE.</span></>
              )}
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] relative group transition-colors duration-300",
                    link.color || (scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"),
                    pathname === link.href && (scrolled ? "text-foreground" : "text-white")
                  )}
                >
                  {link.name}
                  <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                      scrolled ? "bg-foreground" : "bg-white",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                   )} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop Search Bar (Integrated) */}
              <div className={cn(
                "hidden md:flex items-center rounded-full px-4 py-2 border transition-all w-48 lg:w-64 group",
                scrolled ? "bg-secondary/50 border-border/50 focus-within:border-primary/50 focus-within:bg-background" : "bg-white/10 border-white/10 focus-within:border-white/30"
              )}>
                <input 
                   value={searchOpen ? "" : ""}
                   onChange={() => {}}
                   onClick={() => setSearchOpen(true)}
                   placeholder="SEARCH..."
                   className={cn(
                     "bg-transparent text-[10px] font-bold uppercase tracking-widest w-full outline-none",
                     scrolled ? "text-foreground placeholder:text-muted-foreground" : "text-white placeholder:text-white/50"
                   )}
                />
                <Search className={cn("w-3.5 h-3.5", scrolled ? "text-muted-foreground group-focus-within:text-primary" : "text-white/50 group-focus-within:text-white")} />
              </div>

              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={cn("md:hidden p-2 rounded-full transition-colors", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/10 text-white")}
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                
                <Link href="/wishlist" className={cn("p-2 rounded-full transition-all relative group", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/10 text-white")} aria-label="Wishlist">
                  <Heart className={cn("w-4 h-4 transition-colors", scrolled ? "group-hover:fill-foreground" : "group-hover:fill-white")} />
                </Link>

                <button onClick={() => setCartOpen(true)} className={cn("p-2 rounded-full transition-all relative group", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/10 text-white")} aria-label="Cart">
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-primary text-primary-foreground text-[8px] font-black rounded-full flex items-center justify-center animate-in zoom-in shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                <Link href="/login" className={cn("hidden sm:flex items-center gap-2 p-2 rounded-full transition-all", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/10 text-white")} aria-label="Login">
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Login</span>
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
