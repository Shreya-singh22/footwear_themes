"use client";

import { Instagram, Twitter, Facebook, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useStoreContext } from "@/contexts/store-context";

const Footer = () => {
  const { customization } = useStoreContext();
  
  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const storeName = customization?.brandName || "STRIDE";
  const email = customization?.contactEmail || "hello@stride.com";
  const description = customization?.footerDescription || "Redefining the boundaries of urban footwear with a bold goth-inspired aesthetic. Quality, comfort, and style in every step.";
  const links = {
    Company: ["About Us", "Our Stores", "Careers", "Sustainability"],
    Contact: ["Help Center", "Delivery Info", "Returns Policy", "Size Guide"],
    Policy: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer 
      onClick={handleSectionClick}
      className="bg-[#1A1A1A] text-white"
    >
      <div className="px-6 md:px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand & Newsletter */}
          <div className="space-y-8 lg:col-span-1">
            <h3 className="font-display text-4xl font-bold tracking-tighter">{storeName}.</h3>
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Keep Connected</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent border-white/20 text-white rounded-none focus-visible:ring-white/30"
                />
                <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black rounded-none">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 font-bold text-xs pt-1 tracking-widest">TIKTOK</a>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-medium">© 2026 {storeName} FOOTWEAR GROUP</p>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">{description}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
