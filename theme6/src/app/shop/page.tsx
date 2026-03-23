"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Footer } from '@/components/BrandSections';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters state
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState('new');

  const categories = ['Sneakers', 'Running', 'Casual', 'Limited Edition'];
  const brands = ['Nike', 'Adidas', 'Jordan', 'Yeezy', 'Puma'];
  const sizes = ['7', '8', '9', '10', '11', '12'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/api/products?sort=${sort}`;
        if (category) url += `&category=${category}`;
        if (brand) url += `&brand=${brand}`;
        if (priceRange[0] > 0) url += `&minPrice=${priceRange[0]}`;
        if (priceRange[1] < 1000) url += `&maxPrice=${priceRange[1]}`;
        selectedSizes.forEach(s => url += `&sizes=${s}`);

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, brand, priceRange, selectedSizes, sort]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/5 pb-10 space-y-8 md:space-y-0">
          <div className="space-y-3">
            <h1 className="text-5xl font-display font-bold tracking-tighter uppercase">Collection</h1>
            <p className="text-xs uppercase tracking-[0.4em] opacity-40 font-display">Discover the future of footwear ({products.length})</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all group"
            >
              <SlidersHorizontal size={14} className="opacity-50 group-hover:opacity-100" />
              <span className="text-[10px] uppercase font-display tracking-[0.2em]">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-12 mt-10">
          {/* Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-[30px]" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-32 opacity-20">
                <p className="font-display uppercase tracking-[0.4em]">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
