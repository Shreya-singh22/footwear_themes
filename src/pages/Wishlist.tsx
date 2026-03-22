import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";

const Wishlist = () => {
  const { items: wishlistIds } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-primary">Saved Items</span>
              <h1 className="font-display text-4xl font-bold mt-2">Your Wishlist</h1>
            </div>
            <p className="font-body text-muted-foreground">{wishlistProducts.length} items saved</p>
          </div>

          {wishlistProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border border-dashed border-border rounded-2xl bg-secondary/10"
            >
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3 text-foreground">Your wishlist is empty</h2>
              <p className="font-body text-muted-foreground mb-8 max-w-sm mx-auto">
                Save items that you like to your wishlist so you can find them easily later.
              </p>
              <Link to="/shop">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow hover:scale-105">
                  Browse Shop <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p, i) => (
                <div key={p.id} className="relative group">
                  <Link to={`/product/${p.id}`}>
                    <ProductCard
                      name={p.name}
                      price={p.price}
                      image={p.images[0]}
                      tag={p.tag}
                      index={i}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {wishlistProducts.length > 0 && (
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-1">Ready to checkout?</h3>
                <p className="font-body text-muted-foreground">Move your favorites to the cart and complete your purchase.</p>
              </div>
              <Link to="/cart">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow">
                  <ShoppingBag className="w-4 h-4" /> Go to Cart
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
