"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  const total = cartTotal();
  const shipping = total > 5000 ? 0 : 500;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    payment: "card",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast.error("Please fill in all fields");
      return;
    }
    clearCart();
    toast.success("Order placed successfully!");
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">ZIP Code</label>
                <input name="zip" value={form.zip} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground mb-1 block">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">City</label>
                <input name="city" value={form.city} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {[
                { value: "card", label: "Credit / Debit Card" },
                { value: "upi", label: "UPI" },
                { value: "cod", label: "Cash on Delivery" },
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={form.payment === method.value}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
          <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} ×{item.quantity}</span>
                <span>{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{formatCurrency(total + shipping)}</span>
            </div>
          </div>
          <Button type="submit" className="w-full mt-6 h-12 font-semibold">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
