import { Link } from "react-router-dom";
import { useStoreContext } from "@/contexts/store-context";

const Footer = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const brandName = customization?.brandName || "STRIDE";
  const footerDesc = customization?.footer?.description || "Performance footwear for those who move differently.";

  return (
    <footer 
      onClick={handleSectionClick}
      className="border-t border-border bg-card py-16 cursor-pointer"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="font-display text-lg font-bold text-primary uppercase">
              {brandName}<span className="text-foreground">.</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
              {footerDesc}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Men</Link></li>
              <li><Link to="/shop" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Women</Link></li>
              <li><Link to="/shop" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/account" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">My Profile</Link></li>
              <li><Link to="/wishlist" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">My Cart</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">© 2026 {brandName}. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
