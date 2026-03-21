"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";

// Mock Cart items
const cartItems = [
  { id: 1, name: "SHADOW HIGH-TOP", price: 15499, image: product1, quantity: 1, size: "10" },
  { id: 2, name: "INFERNO RUNNER", price: 12999, image: product2, quantity: 1, size: "9.5" },
];

export default function CartPage() {
  const { cartCount, setCartCount } = useStoreContext();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUpVariant} className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">YOUR CART</h1>
            <p className="text-muted-foreground mt-2">Review your selected kicks before checkout.</p>
            <div className="w-16 h-1 bg-primary mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-7 space-y-8">
              {cartItems.map((item) => (
                <motion.div variants={fadeUpVariant} key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-border pb-8">
                  <div className="relative w-32 h-32 bg-secondary rounded-sm overflow-hidden border border-border p-2 shrink-0">
                    <img
                      src={typeof item.image === "string" ? item.image : item.image.src}
                      alt={item.name}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-xl font-bold">{item.name}</h3>
                      <button className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <div className="font-display text-lg tracking-wider text-primary font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center border border-border rounded-sm">
                        <button className="px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Minus size={14}/></button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button className="px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Order Summary */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5">
              <div className="sticky top-24 border border-border bg-card rounded-lg p-6 md:p-8 space-y-6 shadow-sm">
                <h2 className="font-display text-2xl tracking-wide border-b border-border pb-4">Order Summary</h2>

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
                  <Link href="/checkout" className="block">
                    <Button 
                      variant="hero" 
                      className="w-full py-8 text-lg rounded-sm relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        PROCEED TO CHECKOUT <ArrowRight size={18} />
                      </span>
                      <div className="absolute inset-0 bg-primary-foreground/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Button>
                  </Link>
                </motion.div>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
