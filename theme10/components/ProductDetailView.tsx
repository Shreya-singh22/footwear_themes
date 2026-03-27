'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, ArrowLeft, Truck, ShieldCheck, RefreshCcw, Plus, Minus, ChevronRight, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStoreContext } from '@/context/store-context';
import { products } from '@/data/products';
import styles from '../app/product/[id]/ProductDetail.module.css';

interface ProductDetailViewProps {
  product: any;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { customization } = useStoreContext();
  
  const [selectedSize, setSelectedSize] = useState<number | string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showToast, setShowToast] = useState(false);
  
  // Zoom logic
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const images = [product.image, ...Array(3).fill(product.image)]; // Mocking additional images

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSectionClick = (sectionId: string) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>
        <CheckCircle size={20} color="var(--primary-gold)" />
        <span>Added to bag successfully!</span>
      </div>

      <Link href="/shop" className={styles.backLink}>
        <ArrowLeft size={16} /> BACK TO COLLECTION
      </Link>
      
      <div className={styles.content}>
        <div className={styles.imageGallery} onClick={() => handleSectionClick('productGallery')}>
          <div 
            className={styles.mainImageWrapper}
            ref={mainImageRef}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image 
              src={images[activeImage]} 
              alt={product.name} 
              fill
              priority
              className={`${styles.mainImage} ${isZooming ? styles.zoomed : ''}`}
              style={isZooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
            />
          </div>
          <div className={styles.thumbnails}>
             {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`${styles.thumbnail} ${activeImage === i ? styles.activeThumb : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                >
                  <Image src={img} alt={product.name} fill className={styles.thumbImg} />
                </div>
             ))}
          </div>
        </div>
        
        <div className={styles.info} onClick={() => handleSectionClick('productInfo')}>
          <div className={styles.breadcrumb}>
            <Link href="/">HOME</Link> <ChevronRight size={12} /> <Link href="/shop">SHOP</Link> <ChevronRight size={12} /> <span>{product.name.toUpperCase()}</span>
          </div>
          
          <div className={styles.badge}>PREMIUM QUALITY</div>
          <h1 className={styles.name}>{product.name}</h1>
          
          <div className={styles.priceRow}>
            <span className={styles.price}>{product.price}</span>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < product.rating ? "var(--primary-gold)" : "none"} stroke={i < product.rating ? "var(--primary-gold)" : "var(--secondary-grey)"} />
              ))}
              <span className={styles.ratingText}>(124 Reviews)</span>
            </div>
          </div>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.selection}>
            <div className={styles.sizeHeader}>
              <h3>SELECT SIZE (UK)</h3>
              <button className={styles.sizeGuide}>Size Guide</button>
            </div>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size: number) => {
                const isOutOfStock = product.stock && product.stock[size] === false;
                return (
                  <button 
                    key={size} 
                    disabled={isOutOfStock}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''} ${isOutOfStock ? styles.outOfStock : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                    {isOutOfStock && <div className={styles.outOfStockLine}></div>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.quantitySection}>
             <h3>QUANTITY</h3>
             <div className={styles.quantityControls}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
             </div>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              ADD TO CART <ShoppingBag size={20} />
            </button>
            <button 
              className={`${styles.wishlistBtn} ${wishlist.includes(product.id) ? styles.inWishlist : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={20} fill={wishlist.includes(product.id) ? "var(--primary-gold)" : "none"} />
            </button>
          </div>
          
          <div className={styles.shippingInfo}>
            <div className={styles.shipItem}>
              <Truck size={20} />
              <div>
                <h4>Free Delivery</h4>
                <p>On orders over ₹5,000</p>
              </div>
            </div>
            <div className={styles.shipItem}>
              <RefreshCcw size={20} />
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
          
          <div className={styles.details}>
            <h3>PRODUCT DETAILS</h3>
            <ul>
              {product.details.map((detail: string, i: number) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.relatedSection} onClick={() => handleSectionClick('relatedProducts')}>
         <h2 className={styles.sectionTitle}>YOU MAY ALSO LIKE</h2>
         <div className={styles.relatedGrid}>
            {relatedProducts.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className={styles.relatedCard}>
                 <div className={styles.relatedImageWrapper}>
                    <Image src={p.image} alt={p.name} fill className={styles.relatedImage} />
                 </div>
                 <div className={styles.relatedInfo}>
                    <h4>{p.name}</h4>
                    <span>{p.price}</span>
                 </div>
              </Link>
            ))}
         </div>
      </section>

      <section className={styles.reviewsSection} onClick={() => handleSectionClick('reviews')}>
         <h2 className={styles.sectionTitle}>CUSTOMER REVIEWS</h2>
         <div className={styles.reviewsGrid}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className={styles.reviewCard}>
                 <div className={styles.reviewHeader}>
                    <div className={styles.reviewRating}>
                       {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--primary-gold)" stroke="var(--primary-gold)" />)}
                    </div>
                    <span className={styles.reviewDate}>2 weeks ago</span>
                 </div>
                 <h4 className={styles.reviewTitle}>Excellent Comfort & Style</h4>
                 <p className={styles.reviewText}>
                   "The quality of these shoes is outstanding. They look even better in person and the fit is perfect. Highly recommend for anyone looking for premium style."
                 </p>
                 <span className={styles.reviewerName}>Alex M.</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default ProductDetailView;
