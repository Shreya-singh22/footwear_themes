"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    priceInr: number;
    images: string[];
    category: string;
    stock: number;
    rating?: number;
    numReviews?: number;
    isLimited?: boolean;
    brand?: { name: string };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isInWishlist = wishlist.some((item: any) => item.id === product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-[24px] bg-[#0A0A0A] border border-white/5 shadow-2xl transition-shadow duration-500 group-hover:shadow-white/5">
          <img 
            src={product.images[0] || '/images/hero-shoe.png'} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Urgency Badge */}
          {product.stock < 10 && (
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-white whitespace-nowrap">
                Only {product.stock} Left
              </p>
            </div>
          )}

          {/* Limited Label */}
          {product.isLimited && (
            <div className="absolute top-6 left-6 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/20 ml-24">
              <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-amber-500 whitespace-nowrap">
                Limited Release
              </p>
            </div>
          )}
        </div>
      </Link>

      <div className="absolute top-6 right-6 z-10 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isInWishlist ? 'bg-red-500 border-red-500 text-white' : 'bg-black/50 border-white/10 text-white hover:bg-white hover:text-black'}`}
        >
          <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); addToCart(product, '10'); }}
          className="w-12 h-12 rounded-full bg-white border border-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-[13px] uppercase font-display font-medium tracking-tight opacity-90">{product.name}</h3>
            <p className="text-[10px] uppercase font-display tracking-[0.3em] opacity-30">{product.brand?.name || 'SneakArts'}</p>
          </div>
          <div className="text-right">
            <span className="text-[12px] font-display font-bold tracking-tight">₹{product.priceInr.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        {/* Rating subtle */}
        <div className="flex items-center space-x-2 opacity-20 group-hover:opacity-60 transition-opacity">
           <div className="flex text-amber-500">
             {[1, 2, 3, 4, 5].map(i => <Star key={i} size={8} fill={i <= Math.round(product.rating || 5) ? 'currentColor' : 'none'} />)}
           </div>
           <span className="text-[8px] uppercase tracking-widest font-display">{product.numReviews || 12} Reviews</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
