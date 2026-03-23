"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  
  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <Navbar />
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-12 tracking-widest uppercase">Your Cart ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl">
            <p className="text-xl opacity-50 mb-8 font-display uppercase tracking-widest">Cart is empty</p>
            <Link href="/shop" className="inline-block px-12 py-4 border border-white/20 uppercase tracking-[0.3em] font-display text-sm hover:bg-white hover:text-black transition-all duration-300">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item: any) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-6 bg-white/5 p-6 rounded-2xl relative group">
                  <div className="w-24 h-24 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-display uppercase tracking-widest text-sm">{item.name}</h3>
                    <p className="text-xs opacity-50 mt-1">Size: {item.size} | Color: {item.colors[0]}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center border border-white/20 rounded-full px-4 py-1 space-x-4">
                        <button className="opacity-50 hover:opacity-100 transition-opacity"><Minus size={14} /></button>
                        <span className="text-sm font-display">{item.quantity}</span>
                        <button className="opacity-50 hover:opacity-100 transition-opacity"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-display font-bold text-lg">${item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="mt-4 text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-red-500 transition-all flex items-center space-x-1"
                    >
                      <X size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 p-8 rounded-3xl h-fit sticky top-32">
              <h2 className="text-xl font-display font-bold mb-8 uppercase tracking-widest">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between opacity-50 text-sm uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between opacity-50 text-sm uppercase tracking-widest">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="h-[1px] bg-white/10 my-6" />
                <div className="flex justify-between text-lg font-display font-bold uppercase tracking-widest">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full py-5 bg-white text-black font-display font-bold uppercase tracking-[0.4em] text-xs flex items-center justify-center space-x-3 hover:bg-opacity-90 transition-all group">
                <span>Checkout Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="mt-6 text-[10px] text-center opacity-30 uppercase tracking-[0.2em]">
                Secure payments processed by Orbit Pay
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
