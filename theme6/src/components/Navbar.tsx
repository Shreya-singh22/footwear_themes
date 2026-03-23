"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, X } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { cart, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(`/api/products?search=${searchQuery}`);
        setSearchResults(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    const timer = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-black tracking-[0.4em] text-white">
            SNEAKARTS
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {['Home', 'New Arrivals', 'Trending'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : '/shop'} className="text-[10px] uppercase font-display font-bold tracking-[0.4em] text-white/50 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-8">
            <button onClick={() => setIsSearchOpen(true)} className="relative group p-2 text-white/50 hover:text-white transition-colors">
              <Search size={18} />
              <Tooltip text="Search Collection" />
            </button>
            <Link href="/wishlist" className="relative group p-2 text-white/50 hover:text-white transition-colors">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />}
              <Tooltip text="Your Wishlist" />
            </Link>
            <Link href="/cart" className="relative group flex items-center space-x-3 px-6 py-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-all">
              <ShoppingBag size={18} />
              <span className="text-[10px] uppercase font-display tracking-widest font-bold">{cart.length}</span>
              <Tooltip text="Checkout" />
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-start pt-40 px-8"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-12 right-12 p-4 text-white/40 hover:text-white transition-colors">
              <X size={40} strokeWidth={1} />
            </button>

            <div className="w-full max-w-4xl space-y-12">
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH COLLECTION" 
                className="w-full bg-transparent border-b border-white/20 py-8 text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter outline-none focus:border-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                {searchResults.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} onClick={() => setIsSearchOpen(false)} className="flex items-center space-x-8 group">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl overflow-hidden">
                      <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold uppercase tracking-wider">{p.name}</h4>
                      <p className="text-xs uppercase tracking-[0.3em] opacity-30 mt-2">${p.price}</p>
                    </div>
                  </Link>
                ))}
                {searchResults.length === 0 && searchQuery.length > 1 && (
                  <p className="text-lg opacity-20 uppercase tracking-[0.4em]">No artifacts found for this query</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Tooltip = ({ text }: { text: string }) => (
  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-3 py-1 bg-white text-black text-[8px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] translate-y-2 group-hover:translate-y-0">
    {text}
  </span>
);

export default Navbar;
