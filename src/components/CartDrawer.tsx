import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const CartDrawer = ({ children }: { children: React.ReactNode }) => {
  const { items, removeItem, updateQuantity, totalPrice, getProduct } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-border p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 px-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-display font-bold text-lg mb-2">Your cart is empty</p>
              <p className="font-body text-sm text-muted-foreground mb-8">
                Looks like you haven't added anything yet.
              </p>
              <SheetClose asChild>
                <Link to="/shop">
                  <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow">
                    Start Shopping
                  </button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <motion.div 
                    layout
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg bg-secondary/50 border border-border overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={product.images[0]} alt={product.name} className="w-4/5 h-4/5 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <Link to={`/product/${product.id}`} className="font-display font-bold text-sm truncate hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground font-body mb-3">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-lg scale-90 origin-left">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.size, item.color, Math.max(1, item.quantity - 1))}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-display font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-display font-bold text-sm">
                          ₹{(product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-gradient-card">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-semibold">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-display font-bold pt-2 border-t border-border/50">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="grid gap-3">
              <SheetClose asChild>
                <Link to="/checkout" className="w-full">
                  <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold flex items-center justify-center gap-2 hover:shadow-glow transition-all">
                    Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/cart" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-border text-foreground font-display font-semibold hover:bg-secondary transition-all">
                    View Full Cart
                  </button>
                </Link>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
