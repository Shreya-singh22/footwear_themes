"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, Package, Lock } from "lucide-react";

import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";

// Mock Cart items
const cartItems = [
  { id: 1, name: "SHADOW HIGH-TOP", price: 15499, image: product1, quantity: 1, size: "10" },
  { id: 2, name: "INFERNO RUNNER", price: 12999, image: product2, quantity: 1, size: "9.5" },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 0; // Free shipping promo
const taxes = subtotal * 0.08;
const total = subtotal + shipping + taxes;

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Order Placed Successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar cartCount={cartItems.length} />

      <main className="flex-1 container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-12 gap-12"
        >
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div variants={fadeUpVariant}>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">CHECKOUT</h1>
              <p className="text-muted-foreground mt-2">Securely complete your purchase.</p>
            </motion.div>

            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10">
              {/* Contact Info */}
              <motion.section variants={fadeUpVariant} className="space-y-4">
                <h2 className="font-display text-xl tracking-wide flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                  Contact Information
                </h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required className="py-6" />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="newsletter" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="newsletter">Email me with news and offers</label>
                  </div>
                </div>
              </motion.section>

              {/* Shipping Address */}
              <motion.section variants={fadeUpVariant} className="space-y-4">
                <h2 className="font-display text-xl tracking-wide flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" required className="py-6" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" required className="py-6" />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="py-6" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="py-6" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP code</Label>
                    <Input id="zip" required className="py-6" />
                  </div>
                </div>
              </motion.section>

              {/* Payment Method */}
              <motion.section variants={fadeUpVariant} className="space-y-8">
                <h2 className="font-display text-xl tracking-wide flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                  Payment details
                </h2>

                <div className="border border-border rounded-lg p-6 space-y-6 bg-card relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-border/20">
                    <CreditCard size={150} strokeWidth={1} />
                  </div>
                  <div className="relative z-10 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="py-6 font-mono" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiration date (MM/YY)</Label>
                        <Input id="expiry" placeholder="MM/YY" className="py-6 font-mono" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvv">Security code</Label>
                        <Input id="cvv" placeholder="CVV" type="password" maxLength={4} className="py-6 font-mono" required />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div variants={fadeUpVariant} className="lg:col-span-5">
            <div className="sticky top-24 border border-border bg-card rounded-lg p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-display text-2xl tracking-wide border-b border-border pb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center group">
                    <div className="relative w-24 h-24 bg-secondary rounded-sm overflow-hidden border border-border p-2 mr-4">
                      <img
                        src={typeof item.image === "string" ? item.image : item.image.src}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute -top-2 -right-2 bg-muted text-xs w-6 h-6 flex items-center justify-center rounded-full border border-border shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-sm font-bold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium tracking-wide">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">₹{taxes.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-end">
                <span className="font-display text-xl font-bold">Total</span>
                <span className="font-display text-3xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</span>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
                <Button 
                  type="submit" 
                  form="checkout-form"
                  variant="hero" 
                  className="w-full py-8 text-lg rounded-sm relative overflow-hidden group"
                  disabled={isProcessing}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isProcessing ? "PROCESSING..." : "PAY NOW"} <Lock size={18} />
                  </span>
                  {!isProcessing && (
                    <div className="absolute inset-0 bg-primary-foreground/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  )}
                </Button>
              </motion.div>

              <div className="flex items-center justify-center gap-4 text-muted-foreground pt-4 text-xs font-medium">
                <div className="flex items-center gap-1"><Lock size={14}/> Secure Checkout</div>
                <div className="flex items-center gap-1"><Truck size={14}/> Fast Shipping</div>
                <div className="flex items-center gap-1"><Package size={14}/> Easy Returns</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
