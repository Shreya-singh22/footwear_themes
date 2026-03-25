"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 pt-16 text-center">
        <div className="mb-8 rounded-full bg-white p-10 shadow-sm text-muted-foreground/30">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-foreground">Bag is Empty</h1>
        <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-muted-foreground uppercase tracking-widest">
          Your sanctuary of shopping awaits your selection.
        </p>
        <Button asChild className="mt-10 h-14 rounded-none px-10 text-xs font-black uppercase tracking-[0.2em]">
          <Link href="/shop">Start Exploration</Link>
        </Button>
      </div>
    );
  }

  const discount = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + ((product?.originalPrice || product?.price || 0) - (product?.price || 0)) * item.quantity;
  }, 0);
  const mrpTotal = cartTotal + discount;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground md:text-6xl">
            My Bag
          </h1>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            {cart.length} Handpicked Pieces in Sanctuary
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item, i) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                const color = product.colors.find(c => c.name === item.colorName);
                return (
                  <motion.div
                    key={`${item.productId}-${item.colorName}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex gap-6 bg-white p-6 border border-border/50 hover:border-primary/20 transition-all duration-300"
                  >
                    <Link href={`/product/${product.id}`} className="h-32 w-32 shrink-0 overflow-hidden rounded-sm bg-secondary/30">
                      <img src={color?.images[0] || product.colors[0].images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{product.brand}</p>
                          <Link href={`/product/${product.id}`} className="font-display text-lg font-black uppercase tracking-tight text-foreground hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {item.colorName} · Size {item.size}
                          </p>
                        </div>
                        <p className="text-lg font-black text-foreground">₹{(product.price * item.quantity).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button 
                            onClick={() => updateCartQty(item.productId, item.colorName, item.size, item.quantity - 1)} 
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQty(item.productId, item.colorName, item.size, item.quantity + 1)} 
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.productId, item.colorName, item.size)} 
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove Piece
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="border border-border bg-white p-8">
                <h2 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-foreground border-b border-border pb-4">
                  Final Summary
                </h2>
                <div className="space-y-4 text-[11px] font-bold uppercase tracking-widest">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Retail Total</span>
                    <span>₹{mrpTotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Privilege Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-primary">Complimentary</span>
                  </div>
                  <div className="border-t border-border pt-6 mt-6 flex justify-between text-base font-black text-foreground">
                    <span>Grand Total</span>
                    <span className="text-xl tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button asChild className="mt-10 w-full h-14 rounded-none text-xs font-black uppercase tracking-[0.2em]" size="lg">
                  <Link href="/checkout">Proceed to Checkout <ArrowRight className="ml-3 h-5 w-5" /></Link>
                </Button>
              </div>
              
              <div className="rounded-none border border-border border-dashed p-6 flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground mb-1">Sanctuary Shield</p>
                  <p className="text-[9px] font-medium leading-relaxed text-muted-foreground">
                    Every transaction is secured by enterprise-grade encryption. Returns are effortless within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
