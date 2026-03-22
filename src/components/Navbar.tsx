import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useStoreContext } from "@/contexts/store-context";
import CartDrawer from "./CartDrawer";
import AnnouncementBar from "./AnnouncementBar";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'navbar' }, '*');
    }
  };

  const navLinks = [
    { label: "New Arrivals", href: "/shop" },
    { label: "Men", href: "/shop?gender=Men" },
    { label: "Women", href: "/shop?gender=Women" },
    { label: "Collections", href: "/shop" },
    { label: "Sale", href: "/shop" },
  ];

  const brandName = customization?.brandName || "STRIDE";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <nav 
        onClick={handleSectionClick}
        className="border-b border-border bg-background/80 backdrop-blur-xl cursor-pointer"
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary uppercase">
            {brandName}<span className="text-foreground">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="relative text-muted-foreground hover:text-primary transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <CartDrawer>
              <button className="relative text-muted-foreground hover:text-primary transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </CartDrawer>
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden bg-background"
            >
              <div className="flex flex-col gap-4 p-6 font-body text-sm">
                {navLinks.map((item) => (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
