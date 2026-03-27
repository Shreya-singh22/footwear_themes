'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Plus, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useStoreContext } from '@/context/store-context';
import styles from './Products.module.css';

const Products = () => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { customization } = useStoreContext();

  const title = customization?.productsSection?.title || "Featured Products";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'productsSection' }, '*');
    }
  };

  return (
    <section className={styles.section} onClick={handleSectionClick}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link href="/shop" className={styles.viewAll}>VIEW ALL</Link>
        </div>
        
        <div className={styles.grid}>
          {products.map((product) => (
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
                  aria-label="Add to Wishlist"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? "var(--primary-gold)" : "none"} />
                </button>
                <div className={styles.cartOverlay}>
                  <button 
                    className={styles.addCartBtn}
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={16} /> ADD TO CART
                  </button>
                </div>
              </div>
              
              <div className={styles.info}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < product.rating ? "var(--primary-gold)" : "none"} stroke={i < product.rating ? "var(--primary-gold)" : "var(--secondary-grey)"} />
                  ))}
                  <span className={styles.ratingCount}>(72 REVIEWS)</span>
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </Link>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{product.price}</span>
                  <button 
                    className={styles.quickAdd} 
                    aria-label="Quick Add"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
