"use client";

import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();
  const total = cartTotal();
  const shippingThreshold = 5000;
  const shipping = total > shippingThreshold ? 0 : 500;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.brand}</p>
                    <Link href={`/product/${item.product.id}`} className="font-medium text-sm hover:text-accent transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Size: {item.selectedSize} · Color: {item.selectedColor}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="p-1 hover:bg-secondary rounded transition-colors" aria-label="Remove item">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 border border-border rounded hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 border border-border rounded hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold text-sm">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
          <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{formatCurrency(total + shipping)}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </div>

          <Button className="w-full mt-6 h-12 font-semibold gap-2" asChild>
            <Link href="/checkout">
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          {shipping > 0 && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Add {formatCurrency(shippingThreshold - total)} more for free shipping
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
