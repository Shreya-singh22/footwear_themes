"use client";

import { useStore } from "@/lib/store";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQuantity, cartTotal } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Drawer */}
      <div 
        className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-card border-l border-border/50 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="font-display font-black text-xl uppercase tracking-widest text-foreground">Your Cart</h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-3xl">🛒</div>
              <p className="text-muted-foreground font-medium">Your cart is empty.</p>
              <Button 
                onClick={() => setCartOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 text-xs font-black uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(251,189,8,0.2)]"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                {/* Image */}
                <div className="relative w-24 h-24 rounded-xl bg-secondary/30 flex-shrink-0 border border-border/50 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                     <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-sm tracking-tight text-foreground line-clamp-1 pr-2">{item.product.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                     <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                       Size: {item.selectedSize} | Color: {item.selectedColor}
                     </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-2 py-1 border border-border/50">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-background shadow-sm hover:bg-card transition-colors text-foreground disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-background shadow-sm hover:bg-card transition-colors text-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {/* Price */}
                    <span className="font-black text-primary">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-secondary/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground font-black uppercase tracking-widest text-xs">Subtotal</span>
              <span className="font-display font-black text-2xl text-foreground">₹{cartTotal().toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider text-center mb-6">
              Shipping & taxes calculated at checkout.
            </p>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(251,189,8,0.3)] hover:shadow-[0_0_50px_rgba(251,189,8,0.5)] transition-all flex items-center gap-2 group">
              <Link href="/checkout" onClick={() => setCartOpen(false)}>
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
