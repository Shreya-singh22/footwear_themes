"use client";

import Link from "next/link";

import { Instagram, Twitter, Facebook, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
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
      className="bg-white border-t border-border pt-24 pb-12"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="font-display text-4xl font-black tracking-tighter uppercase italic">
              SOLE<span className="text-primary tracking-tight">STYLE.</span>
            </Link>
            <div className="max-w-md">
              <h4 className="font-display text-xl font-bold uppercase mb-4 tracking-tighter">
                {customization?.footer?.newsletterTitle || "Don't Miss the Next Drop"}
              </h4>
              <p className="text-muted-foreground mb-6 font-medium">
                {customization?.footer?.newsletterDescription || "Be the first to know about new releases, exclusive collaborations, and member-only offers."}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-4 py-3 bg-secondary/50 border border-transparent focus:border-primary/30 outline-none transition-colors text-sm font-bold uppercase tracking-tighter placeholder:text-muted-foreground/50"
                />
                <Button className="rounded-none px-8 font-black uppercase tracking-tighter bg-foreground text-background hover:bg-foreground/90 h-auto">
                    JOIN
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Support</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Order Status</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Shipping & Delivery</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Returns</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Company</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">About Stride</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Investors</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">© 2026 SOLESTYLE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
