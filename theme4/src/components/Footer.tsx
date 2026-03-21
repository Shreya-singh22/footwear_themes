"use client";

import { Instagram, Twitter } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

const Footer = () => {
  const { customization } = useStoreContext();

  // Optionally hide footer explicitly from the admin UI
  if (customization?.footerSection === null) return null;

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footerSection' }, '*');
    }
  };

  const columns = customization?.footerSection?.columns || [
    { title: "SHOP", links: ["New Arrivals", "Men", "Women", "Sale"] },
    { title: "HELP", links: ["Shipping", "Returns", "Size Guide", "Contact"] },
    { title: "COMPANY", links: ["About", "Careers", "Press", "Stores"] },
  ];

  return (
    <footer 
      onClick={handleSectionClick}
      className="bg-secondary border-t border-border py-16 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold tracking-widest text-foreground">
              SOLE<span className="text-primary">FURY</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bold streetwear footwear for those who refuse to blend in.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {columns.map((col: any) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-display text-sm tracking-wider text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground tracking-wider">
            © 2026 SOLEFURY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <svg className="h-6 w-auto text-muted-foreground hover:text-foreground transition-colors" viewBox="0 0 32 32" fill="currentColor">
                <path d="M12.9 22.4l2.1-13.6h3.4l-2.1 13.6h-3.4zm14.3-13.3c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.4 4-.1 1.7 1.5 2.7 2.6 3.2 1.2.6 1.6 1 1.6 1.6 0 .9-1.1 1.3-2.1 1.3-1.4 0-2.2-.2-3.2-.6l-.4-.2-.5 3.2c.8.4 2.2.7 3.8.7 3.3 0 5.4-1.6 5.5-4.1.1-1.3-.8-2.4-2.5-3.2-1.1-.6-1.7-1-1.7-1.6 0-.6.7-1.1 2-1.1 1 0 1.8.2 2.5.5l.3.1.5-3.3zm-19.1 13.3h-3.3l-2-13.6h3.2l.3 1.5c1 3.5 1.8 6.5 2.5 9l2.7-10.5h3.5l-5.3 13.6h-1.6z"/>
              </svg>
              <svg className="h-6 w-auto text-muted-foreground hover:text-foreground transition-colors" viewBox="0 0 32 32" fill="currentColor">
                <path d="M10.8 22.4A7.4 7.4 0 0116 11.2a7.4 7.4 0 015.2 11.2 7.5 7.5 0 10-10.4 0z"/><circle cx="10.8" cy="16.8" r="7.4"/><circle cx="21.2" cy="16.8" r="7.4"/>
              </svg>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground border border-border px-2 py-1 rounded flex items-center gap-1.5">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              SECURE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
