'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, ChevronDown, Star, Heart, ShoppingBag, Plus, X, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './Shop.module.css';

const ShopContent = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const allSizes = useMemo(() => {
    const sizes = new Set<number>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort((a, b) => a - b);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = category === 'all' || p.name.toLowerCase().includes(category.toLowerCase()) || (category === 'sneakers' && p.name.toLowerCase().includes('runner'));
        const price = parseInt(p.price.replace(/[^0-9]/g, ''));
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        const matchesSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSize && matchesSearch;
      })
      .sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [category, priceRange, selectedSizes, sortBy, searchQuery]);

  const toggleSize = (size: number) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setCategory('all');
    setPriceRange([0, 20000]);
    setSelectedSizes([]);
    setSearchQuery('');
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.shopHero}>
        <div className={styles.container}>
          <h1 className={styles.title}>COLLECTION <span>2024</span></h1>
          <p className={styles.subtitle}>Explore our curated selection of premium footwear.</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.leftControls}>
            <button className={styles.filterToggle} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter size={18} /> FILTERS {(category !== 'all' || selectedSizes.length > 0) && `(${1 + (selectedSizes.length > 0 ? 1 : 0)})`}
            </button>
            <div className={styles.searchBar}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.rightControls}>
            <span className={styles.resultCount}>{filteredProducts.length} PRODUCTS</span>
            <div className={styles.sortWrapper}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                <option value="featured">FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">TOP RATED</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.contentLayout}>
          {/* Sidebar Filters */}
          <aside className={`${styles.sidebar} ${isFilterOpen ? styles.active : ''}`}>
             <div className={styles.sidebarHeader}>
                <h3>FILTERS</h3>
                <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
             </div>

             <div className={styles.filterSection}>
                <h4>CATEGORY</h4>
                <div className={styles.filterOptions}>
                  {['all', 'sneakers', 'formal'].map(cat => (
                    <button 
                      key={cat} 
                      className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
             </div>

             <div className={styles.filterSection}>
                <h4>PRICE RANGE</h4>
                <div className={styles.priceInputs}>
                   <span>₹{priceRange[0]}</span>
                   <input 
                    type="range" 
                    min="0" 
                    max="20000" 
                    step="1000"
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                   />
                   <span>₹{priceRange[1]}</span>
                </div>
             </div>

             <div className={styles.filterSection}>
                <h4>SIZES (UK)</h4>
                <div className={styles.sizeGrid}>
                   {allSizes.map(size => (
                     <button 
                      key={size} 
                      className={`${styles.sizeBtn} ${selectedSizes.includes(size) ? styles.active : ''}`}
                      onClick={() => toggleSize(size)}
                     >
                       {size}
                     </button>
                   ))}
                </div>
             </div>

             <button className={styles.clearBtn} onClick={clearFilters}>CLEAR ALL FILTERS</button>
          </aside>

          {/* Product Grid */}
          <section className={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Link href={`/product/${product.id}`}>
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        className={styles.image}
                      />
                    </Link>
                    <button 
                      className={`${styles.wishlist} ${wishlist.includes(product.id) ? styles.active : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart size={18} fill={wishlist.includes(product.id) ? "var(--primary-gold)" : "none"} />
                    </button>
                    <div className={styles.cartOverlay}>
                      <button className={styles.addCartBtn} onClick={() => addToCart(product)}>
                        <Plus size={16} /> ADD TO CART
                      </button>
                    </div>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < product.rating ? "var(--primary-gold)" : "none"} stroke={i < product.rating ? "var(--primary-gold)" : "var(--secondary-grey)"} />
                      ))}
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className={styles.productName}>{product.name}</h3>
                    </Link>
                    <span className={styles.price}>{product.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No products found matching your criteria.</h3>
                <button onClick={clearFilters}>RESET ALL FILTERS</button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;
