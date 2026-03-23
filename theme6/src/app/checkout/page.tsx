"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CreditCard, Truck, ChevronRight, CheckCircle2, MapPin, Smartphone, Banknote, Tag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const { cart } = useCart();
  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal - discount + shipping;

  const paymentMethods = [
    { id: 'UPI', name: 'UPI / GPay / PhonePe', icon: <Smartphone size={20} /> },
    { id: 'CARD', name: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
    { id: 'COD', name: 'Cash on Delivery (India)', icon: <Banknote size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <Navbar />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-6 mb-16 opacity-50 text-[10px] uppercase tracking-[0.4em] font-display">
          <span className={step >= 1 ? 'text-white font-bold' : ''}>Shipping</span>
          <ChevronRight size={14} />
          <span className={step >= 2 ? 'text-white font-bold' : ''}>Payment</span>
          <ChevronRight size={14} />
          <span className={step >= 3 ? 'text-white font-bold' : ''}>Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold uppercase tracking-widest">Select Address</h2>
                  <button className="text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100">+ Add New</button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-8 border-2 border-white rounded-[30px] bg-white/5 relative group cursor-pointer">
                    <div className="absolute top-6 right-8 w-5 h-5 rounded-full border-4 border-white" />
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin size={18} className="opacity-40" />
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Home (Default)</span>
                    </div>
                    <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-2">Shreya Chauhan</h4>
                    <p className="opacity-50 text-xs leading-relaxed max-w-[200px]">123 Luxury Avenue, Penthouse 4B, Mumbai, MH - 400001, India</p>
                  </div>
                </div>

                <div className="space-y-4 pt-10">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-6">Delivery Method</h3>
                  <div className="p-6 border border-white/10 rounded-2xl flex items-center justify-between hover:border-white/20 transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <Truck size={20} className="opacity-50" />
                      <div>
                        <p className="text-xs font-display uppercase tracking-widest">Standard Delivery</p>
                        <p className="text-[10px] opacity-30 uppercase mt-1">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-display">FREE</span>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-6 bg-white text-black font-display font-bold uppercase tracking-[0.5em] text-xs hover:bg-opacity-90 transition-all rounded-full mt-10"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <h2 className="text-3xl font-display font-bold uppercase tracking-widest">Payment Method</h2>
                
                <div className="space-y-4">
                  {paymentMethods.map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-8 border-2 transition-all rounded-[30px] flex items-center justify-between cursor-pointer ${paymentMethod === m.id ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                    >
                      <div className="flex items-center space-x-6">
                        <div className="opacity-50">{m.icon}</div>
                        <span className="font-display uppercase tracking-widest text-xs">{m.name}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === m.id ? 'border-white' : 'border-white/10'}`} />
                    </div>
                  ))}
                </div>

                {paymentMethod === 'CARD' && (
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-40">Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent border-b border-white/20 py-4 font-display tracking-[0.4em] text-sm focus:border-white outline-none transition-all placeholder:opacity-20" />
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest opacity-40">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-white/20 py-4 font-display tracking-[0.4em] text-sm focus:border-white outline-none transition-all placeholder:opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest opacity-40">CVC</label>
                        <input type="text" placeholder="XXX" className="w-full bg-transparent border-b border-white/20 py-4 font-display tracking-[0.4em] text-sm focus:border-white outline-none transition-all placeholder:opacity-20" />
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-6 bg-white text-black font-display font-bold uppercase tracking-[0.5em] text-xs hover:bg-opacity-90 transition-all rounded-full mt-10"
                >
                  Pay ${total}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 py-24 bg-white/5 rounded-[50px] border border-white/5">
                <CheckCircle2 size={80} className="mx-auto text-emerald-500 mb-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                <h2 className="text-5xl font-display font-bold uppercase tracking-widest px-8">Order Confirmed</h2>
                <div className="space-y-2">
                  <p className="opacity-40 font-display uppercase tracking-widest text-xs">Order ID: #SA-2026-0323</p>
                  <p className="opacity-40 font-display uppercase tracking-widest text-xs">Tracking link sent to your email</p>
                </div>
                <Link href="/shop" className="inline-block px-12 py-5 border border-white/20 uppercase tracking-[0.4em] font-display text-[10px] hover:bg-white hover:text-black transition-all duration-700 rounded-full mt-10">
                  Track Your Delivery
                </Link>
              </motion.div>
            )}
          </div>

          <div className="bg-white/5 p-12 rounded-[50px] border border-white/5 h-fit sticky top-32">
            <h2 className="text-2xl font-display font-bold mb-12 uppercase tracking-[0.2em]">Bag Summary</h2>
            <div className="space-y-8 max-h-[350px] overflow-y-auto mb-12 custom-scrollbar pr-6">
              {cart.map((item: any) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase font-display font-bold tracking-[0.2em] mb-1">{item.name}</h4>
                      <p className="text-[10px] opacity-30 uppercase tracking-widest font-display">Size {item.size} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-sm tracking-widest">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-12">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="PROMO CODE" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] uppercase font-display tracking-[0.3em] outline-none focus:border-white/30 transition-all" 
                />
                <button 
                  onClick={() => setIsCouponApplied(true)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-display uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Apply
                </button>
              </div>
              <AnimatePresence>
                {isCouponApplied && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center space-x-2 text-emerald-500 text-[10px] uppercase tracking-widest">
                    <Tag size={12} />
                    <span>Promo code "SNEAK10" applied</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 pt-10 space-y-6 font-display uppercase tracking-[0.3em] text-[10px]">
              <div className="flex justify-between opacity-40">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {isCouponApplied && (
                <div className="flex justify-between text-emerald-500">
                  <span>Discount (10%)</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="flex justify-between opacity-40">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="h-[1px] bg-white/10 my-4" />
              <div className="flex justify-between text-xl font-bold tracking-[0.4em] text-white">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
