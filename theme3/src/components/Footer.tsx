"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

const Footer = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  return (
    <footer 
      onClick={handleSectionClick}
      className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-800"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="font-display text-3xl font-black tracking-tighter uppercase italic mb-6">
              {customization?.navbar?.logoText ? (
                customization.navbar.logoText
              ) : (
                <>SOLE<span className="text-primary">STYLE.</span></>
              )}
            </Link>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed max-w-sm">
              Premium footwear destination. Step up your style with our curated collection of limited edition sneakers and daily essentials.
            </p>
            <div className="w-full max-w-sm flex relative">
              <input 
                type="email" 
                placeholder="JOIN OUR NEWSLETTER" 
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full h-12 pl-6 pr-14 text-xs font-bold tracking-widest uppercase outline-none focus:border-primary transition-colors text-white placeholder:text-neutral-600"
              />
              <button className="absolute right-1 top-1 w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links: Shop (Col span 2) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-display font-black text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li><Link href="/products?category=sneakers" className="hover:text-primary transition-colors">Sneakers</Link></li>
              <li><Link href="/products?category=running" className="hover:text-primary transition-colors">Running</Link></li>
              <li><Link href="/products?category=casual" className="hover:text-primary transition-colors">Casual</Link></li>
              <li><Link href="/products?filter=sale" className="hover:text-primary transition-colors text-primary">Sale</Link></li>
            </ul>
          </div>

          {/* Links: Support (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-black text-sm uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Links: Company (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-black text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-800">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            © 2026 SOLESTYLE. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all" aria-label="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
