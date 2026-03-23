"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Footer } from '@/components/BrandSections';
import ThreeSixtyView from '@/components/ThreeSixtyView';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Star, User, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useCart } from '@/contexts/cart-context';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, toggleWishlist, wishlist } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        // Removed auto-selection: forcing user to pick a size
        
        // Fetch similar products
        const similarRes = await axios.get(`/api/products?category=${res.data.category}`);
        setSimilarProducts(similarRes.data.filter((p: any) => p.id !== id).slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  const isInWishlist = wishlist.some((item: any) => item.id === product.id);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* 360 Gallery */}
          <div className="space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-square bg-white/5 rounded-[40px] overflow-hidden relative group"
            >
              <ThreeSixtyView images={product.images} />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-white' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-display">{product.brand?.name || 'SneakArts'}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-display">{product.category}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight uppercase tracking-tighter mb-8 border-b border-white/5 pb-8">{product.name}</h1>
              
              <div className="flex items-center space-x-12">
                <div className="text-3xl font-display font-bold text-white/90">
                  <span>₹{product.priceInr.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-amber-500 space-x-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={10} fill={i <= Math.round(product.rating || 5) ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <span className="text-[8px] text-white/30 font-display mt-1 uppercase tracking-widest">{product.numReviews || 0} Authenticated Reviews</span>
                </div>
              </div>
            </div>

            <p className="text-lg opacity-50 leading-relaxed font-light mb-12 max-w-xl">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="uppercase tracking-[0.3em] text-xs font-display opacity-50">Select Size (US)</span>
                <div className="flex items-center space-x-2 text-[10px] text-emerald-500 uppercase tracking-widest">
                  <CheckCircle2 size={12} />
                  <span>Size recommendation: 10 (Fits true to size)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-2xl border transition-all flex items-center justify-center font-display text-sm tracking-widest ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 opacity-50 hover:border-white/40'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div className="mb-12 p-8 bg-white/5 rounded-[30px] border border-white/5">
              <h3 className="text-[10px] uppercase font-display tracking-[0.4em] mb-6 opacity-40">Premium Customization</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs font-display uppercase tracking-widest">Upper Material</span>
                <div className="flex space-x-3">
                  {['Leather', 'Knit', 'Suede'].map(m => (
                    <button key={m} className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all ${m === 'Leather' ? 'bg-white text-black border-white' : 'border-white/10 opacity-40'}`}>{m}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4 mb-16 relative">
              <AnimatePresence>
                {showSizeError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-0 w-full text-center"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                      ⚠ Please select a size to continue
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => {
                  if (!selectedSize) {
                    setShowSizeError(true);
                    setTimeout(() => setShowSizeError(false), 3000);
                    return;
                  }
                  addToCart(product, selectedSize);
                }}
                className={`w-full py-6 font-display font-bold uppercase tracking-[0.5em] text-xs flex items-center justify-center space-x-4 transition-all rounded-full ${selectedSize ? 'bg-white text-black hover:bg-opacity-90' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
              >
                <ShoppingCart size={18} />
                <span>Add to Bag</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-full py-6 border transition-all font-display font-bold uppercase tracking-[0.5em] text-xs flex items-center justify-center space-x-4 rounded-full ${isInWishlist ? 'border-red-500 text-red-500 bg-red-500/5' : 'border-white/10 hover:border-white/40'}`}
              >
                <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                <span>{isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-white/10">
              <div className="flex flex-col items-center text-center space-y-3">
                <Truck size={20} className="opacity-50" />
                <span className="text-[10px] uppercase tracking-widest opacity-40">Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <RotateCcw size={20} className="opacity-50" />
                <span className="text-[10px] uppercase tracking-widest opacity-40">30 Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <ShieldCheck size={20} className="opacity-50" />
                <span className="text-[10px] uppercase tracking-widest opacity-40">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-display font-bold uppercase tracking-widest">Customer Reviews</h2>
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-display rounded-full hover:bg-white/10 transition-all">Write a Review</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="p-10 bg-white/5 rounded-[40px] border border-white/5">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <User size={20} className="opacity-40" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-display uppercase tracking-widest text-sm">Reviewer {i}</h4>
                        <CheckCircle2 size={12} className="text-blue-500" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mt-1">Verified Buyer</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="opacity-60 leading-relaxed font-light mb-6">"Absolute masterpiece! The comfort level is beyond anything I've worn before. The dark aesthetic fits my style perfectly. Definitely worth the price for a luxury sneaker."</p>
                <div className="flex space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden opacity-50"><img src={product.images[0]} className="w-full h-full object-cover" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div>
          <h2 className="text-4xl font-display font-bold uppercase tracking-widest mb-16">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {similarProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
