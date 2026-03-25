import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

export default function Footer() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const footerDesc = customization?.footer?.description || "Luxury footwear for the modern connoisseur.";

  return (
    <footer 
      className="border-t border-border bg-card cursor-pointer"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold text-primary">SOLECRAFT</h3>
          <p className="mt-3 text-sm text-muted-foreground">{footerDesc}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Shop</h4>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">All Shoes</Link>
            <Link href="/shop?category=Sneakers" className="text-sm text-muted-foreground hover:text-foreground">Sneakers</Link>
            <Link href="/shop?category=Running" className="text-sm text-muted-foreground hover:text-foreground">Running</Link>
            <Link href="/shop?category=Formal" className="text-sm text-muted-foreground hover:text-foreground">Formal</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Support</h4>
          <div className="mt-4 flex flex-col gap-2">
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Size Guide</span>
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Shipping & Returns</span>
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Contact Us</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Newsletter</h4>
          <p className="mt-4 text-sm text-muted-foreground">Get early access to new drops.</p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 SOLECRAFT. All rights reserved.
      </div>
    </footer>
  );
}
