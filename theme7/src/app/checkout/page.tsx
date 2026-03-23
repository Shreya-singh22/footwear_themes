"use client";

import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = 500;
  const total = cartTotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F2F0EA] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-olive text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-display font-bold text-[#4A3728]">Order Confirmed.</h1>
            <p className="text-[#4A3728]/60 font-medium">Your premium Stride pair is being prepared for shipment. A confirmation email has been sent to your address.</p>
          </div>
          <Link 
            href="/shop"
            className="inline-block bg-[#4A3728] text-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-olive transition-all transform hover:scale-105"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F2F0EA] flex flex-col items-center justify-center p-6 text-center space-y-8">
        <h1 className="text-4xl font-display font-bold text-[#4A3728]">Your bag is empty.</h1>
        <Link 
          href="/shop"
          className="bg-[#4A3728] text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-olive transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F0EA] text-[#4A3728]">
      {/* Minimal Header */}
      <header className="border-b border-[#4A3728]/10 px-6 py-8 md:px-12 lg:px-20 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <Link href="/" className="font-display text-3xl font-bold tracking-tighter">STRIDE.</Link>
          <Link href="/shop" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-olive transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Forms */}
          <form onSubmit={handlePlaceOrder} className="space-y-16">
            
            {/* Contact Info */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#4A3728] text-white flex items-center justify-center text-xs font-bold font-display italic">01</span>
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Contact Information</h3>
              </div>
              <div className="space-y-4">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">Email Address</Label>
                <Input id="email" required placeholder="name@email.com" className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
              </div>
            </section>

            {/* Shipping Info */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#4A3728] text-white flex items-center justify-center text-xs font-bold font-display italic">02</span>
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Shipping Details</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">First Name</Label>
                  <Input id="firstName" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">Last Name</Label>
                  <Input id="lastName" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
                </div>
              </div>
              <div className="space-y-4">
                <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">Full Address</Label>
                <Input id="address" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                 <div className="space-y-4">
                  <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">City</Label>
                  <Input id="city" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="state" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">State</Label>
                  <Input id="state" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="zip" className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">PIN Code</Label>
                  <Input id="zip" required className="bg-white/50 border-[#4A3728]/10 h-14 font-medium" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#4A3728] text-white flex items-center justify-center text-xs font-bold font-display italic">03</span>
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Payment Method</h3>
              </div>
              <RadioGroup defaultValue="card" className="grid gap-4">
                <div className="flex items-center space-x-2 border border-[#4A3728]/10 p-6 bg-white/50 hover:bg-white transition-all cursor-pointer rounded-sm">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold tracking-widest">Credit / Debit Card</span>
                    <CreditCard className="w-5 h-5 opacity-40" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-[#4A3728]/10 p-6 bg-white/50 hover:bg-white transition-all cursor-pointer rounded-sm">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold tracking-widest">UPI / Net Banking</span>
                    <span className="text-[10px] font-black opacity-40">INSTANT</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-[#4A3728]/10 p-6 bg-white/50 hover:bg-white transition-all cursor-pointer rounded-sm">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold tracking-widest">Cash on Delivery</span>
                    <Truck className="w-5 h-5 opacity-40" />
                  </Label>
                </div>
              </RadioGroup>
            </section>

            <button 
              type="submit"
              className="w-full bg-[#4A3728] text-white py-6 text-sm font-black uppercase tracking-[0.4em] hover:bg-olive transition-all transform hover:scale-[1.02] shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-sm"
            >
              Complete Order.
            </button>
          </form>

          {/* Right: Order Summary */}
          <aside className="lg:sticky lg:top-40 space-y-8 bg-white p-10 shadow-2xl rounded-sm border border-[#4A3728]/5 animate-in slide-in-from-right duration-1000">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] pb-6 border-b border-[#4A3728]/10">Order Summary</h3>
            
            <div className="max-h-[400px] overflow-y-auto space-y-6 pr-4 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 group">
                  <div className="relative w-20 h-24 bg-[#E5E2D9] rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">{item.product.name}</h4>
                    <p className="text-xs font-medium text-[#4A3728]/40">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold pt-1">{item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-[#4A3728]/10">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#4A3728]/60">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#4A3728]/60">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#4A3728]/60">
                <span>GST (Incl.)</span>
                <span>Calculated at step 02</span>
              </div>
              <div className="flex justify-between items-end pt-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#4A3728]">Total Due</span>
                <span className="text-4xl font-display font-bold text-[#4A3728]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-center gap-4 text-[#4A3728]/30">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Checkout Guaranteed</p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
