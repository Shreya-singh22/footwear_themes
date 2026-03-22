import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, getProduct, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground font-body mb-8">Discover our collection and find your perfect pair.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Your Cart ({totalItems})</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-gradient-card"
                  >
                    <Link to={`/product/${product.id}`} className="w-24 h-24 rounded-lg bg-secondary/30 flex items-center justify-center flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-4/5 object-contain" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`} className="font-display text-sm font-semibold text-foreground hover:text-primary transition-colors">{product.name}</Link>
                      <p className="text-xs text-muted-foreground font-body mt-1">Size: {item.size} · {item.color}</p>
                      <p className="font-display text-sm font-bold text-foreground mt-2">₹{product.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.productId, item.size, item.color)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} className="p-2 text-muted-foreground hover:text-foreground">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-display font-semibold text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} className="p-2 text-muted-foreground hover:text-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-fit sticky top-24">
              <h2 className="font-display text-lg font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-foreground text-lg">
                  <span>Total</span>
                  <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all duration-300"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
