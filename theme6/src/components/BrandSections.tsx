"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Instagram, Twitter, Facebook, ArrowRight, PlayCircle, Star } from 'lucide-react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface BrandSectionsProps {
  products: any[];
}

export const BrandSections: React.FC<BrandSectionsProps> = ({ products }) => {
  return (
    <div className="bg-black">
      {/* 1. Limited Edition Horizontal Scroll */}
      <section className="py-24 overflow-hidden border-b border-white/5 bg-[#020202]">
        <div className="px-8 mb-10 max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-display font-bold uppercase tracking-widest text-white">Limited Edition</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mt-2">The rarest artifacts in our collection</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-20 font-display">Selection 01 / 05</span>
        </div>
        
        <motion.div 
          className="flex space-x-12 px-8 overflow-x-auto no-scrollbar py-10"
          style={{ cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {products.filter(p => p.isLimited).map((product, i) => (
            <motion.div 
              key={`limited-${product.id}`}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-[400px] h-[520px] bg-white/5 rounded-[30px] p-12 flex flex-col justify-between group border border-white/5 transition-colors hover:bg-white/[0.08]"
            >
              <div className="flex justify-between items-start">
                <div className="text-[8px] uppercase tracking-[0.4em] opacity-20 font-display">Serial 00{i + 1}</div>
                <div className="px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 text-[6px] text-amber-500 uppercase tracking-widest font-bold">Rare</div>
              </div>
              
              <Link href={`/product/${product.id}`} className="block h-full">
                <img 
                  src={product.images[0]} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 p-8"
                  alt={product.name}
                />
              </Link>
              
              <div className="space-y-4 pt-6 border-t border-white/5">
                 <h4 className="text-[12px] uppercase font-display tracking-[0.3em] font-bold text-white">{product.name}</h4>
                 <div className="flex justify-between items-center">
                   <p className="text-[12px] font-display font-bold text-white/40">₹{product.priceInr.toLocaleString('en-IN')}</p>
                   <button className="text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Explore Details →</button>
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. Trending Now - Structured Hierarchy */}
      <section id="trending" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Structure: Title (L) | View All (R) */}
          <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white">Trending Now</h2>
              <p className="text-xs font-display opacity-30">The most coveted silhouettes of the season.</p>
            </div>
            <Link href="/shop" className="group flex items-center space-x-4 text-[10px] uppercase font-display tracking-[0.4em] opacity-30 hover:opacity-100 transition-all">
              <span>View All Collection</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Grid with gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Brand Story / Storytelling */}
      <section className="py-24 bg-white/5 overflow-hidden relative group">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 select-none flex items-center justify-center">
             <motion.span 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="text-[25vw] font-display font-black opacity-5 select-none"
             >
               SNEAKARTS
             </motion.span>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-10">
          <div className="inline-flex items-center space-x-3 px-6 py-2 border border-white/10 rounded-full mb-4 bg-black/40 backdrop-blur-md">
             <PlayCircle size={14} className="text-white/50" />
             <span className="text-[8px] uppercase tracking-[0.4em] text-white/40">The Craftsmanship</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-tight text-white">
            Designed for performance & <span className="opacity-30 italic">Style.</span>
          </h2>
          <p className="text-lg opacity-50 font-light leading-relaxed max-w-2xl mx-auto">
            Each pair is a testament to architectural precision and subcultural expression. We don't just build sneakers; we engineer heritage for the modern leader.
          </p>
          <div className="pt-6">
            <button className="text-[10px] uppercase tracking-[0.6em] font-display hover:tracking-[0.8em] transition-all border-b border-white/20 pb-4 text-white/60 hover:text-white">Our Heritage</button>
          </div>
        </div>
      </section>

      {/* 4. USP Section */}
      <section className="py-24 px-8 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: <Truck size={28} />, title: "Free Global Delivery", desc: "No boundaries for your style." },
            { icon: <RotateCcw size={28} />, title: "Seamless Returns", desc: "14-day hassle-free exchange." },
            { icon: <ShieldCheck size={28} />, title: "Authentic Ledger", desc: "Every pair verified & tracked." },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="text-white opacity-20 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500">{item.icon}</div>
              <h4 className="text-[11px] uppercase font-display tracking-[0.4em] font-bold text-white">{item.title}</h4>
              <p className="text-[10px] opacity-30 font-display leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ⭐ Reviews Section */}
      <section className="py-24 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold uppercase tracking-widest mb-6 text-white">Collector Feedback</h2>
            <div className="flex items-center justify-center space-x-2 text-amber-500 mb-4 opacity-40">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />) }
            </div>
            <p className="text-xs uppercase tracking-[0.4em] opacity-30 font-display">Trusted by 10,000+ elite collectors globally</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Julian V.", quote: "The architectural precision in these sneakers is unlike anything in the luxury market. Truly premium.", role: "Collector @ Tokyo" },
              { name: "Marcus R.", quote: "The black-on-black aesthetic is masterfully executed. A staple in my rotation for every drop.", role: "Founder @ Stealth" },
              { name: "Elena K.", quote: "Received my Phantom Onyx yesterday. The wait was worth every second of craftsmanship.", role: "Architect @ Berlin" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-white/5 rounded-[40px] border border-white/5 space-y-8 hover:bg-white/[0.07] transition-all"
              >
                <p className="text-md font-light leading-relaxed opacity-60">"{review.quote}"</p>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-[10px] uppercase font-display font-bold tracking-[0.3em] text-white">{review.name}</h4>
                  <p className="text-[8px] uppercase tracking-widest opacity-20 mt-1">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <section className="py-24 px-8 text-center bg-black">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-4xl font-display font-bold uppercase tracking-widest text-white">Join the Elite</h2>
          <p className="text-xs uppercase tracking-[0.4em] opacity-30">Get 10% off your first release + exclusive drops</p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-grow bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-display uppercase tracking-[0.3em] focus:border-white transition-all outline-none text-white"
            />
            <button className="px-10 py-5 bg-white text-black text-[10px] font-display font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white/90 transition-all shadow-xl shadow-white/5 hover:shadow-white/10">Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020202] py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <h3 className="text-2xl font-display font-bold uppercase tracking-[0.4em] text-white">SNEAKARTS</h3>
          <p className="text-[10px] opacity-30 leading-relaxed font-display tracking-widest uppercase">
            The future of luxury footwear. Engineered for those who lead the way.
          </p>
          <div className="flex space-x-6 opacity-30">
            <Instagram size={18} className="hover:opacity-100 cursor-pointer transition-opacity" />
            <Twitter size={18} className="hover:opacity-100 cursor-pointer transition-opacity" />
            <Facebook size={18} className="hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase font-display font-bold tracking-[0.4em] text-white">Navigation</h4>
          <ul className="space-y-4 text-[10px] uppercase tracking-widest opacity-40 font-display">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
            <li><Link href="/shop" className="hover:opacity-100 transition-opacity">Catalog</Link></li>
            <li><Link href="/shop" className="hover:opacity-100 transition-opacity">New arrivals</Link></li>
            <li><Link href="/shop" className="hover:opacity-100 transition-opacity">Limited edition</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase font-display font-bold tracking-[0.4em] text-white">Concierge</h4>
          <ul className="space-y-4 text-[10px] uppercase tracking-widest opacity-40 font-display">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Track Order</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Size Guide</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Return Policy</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase font-display font-bold tracking-[0.4em] text-white">Contact</h4>
          <ul className="space-y-4 text-[10px] uppercase tracking-widest opacity-40 font-display">
            <li>Studio: London, Shoreditch</li>
            <li>HQ: 123 Luxury Ave, Mumbai</li>
            <li>studio@sneakarts.com</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 opacity-20">
        <p className="text-[8px] uppercase tracking-widest font-display">© 2026 SNEAKARTS. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8 text-[8px] uppercase tracking-widest font-display">
          <span className="cursor-pointer hover:opacity-100">Privacy Policy</span>
          <span className="cursor-pointer hover:opacity-100">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
