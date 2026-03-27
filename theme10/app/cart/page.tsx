'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Cart.module.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>YOUR SHOPPING <span>BAG</span></h1>
          <p className={styles.count}>{cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}</p>
        </div>

        {cart.length > 0 ? (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className={styles.cartItem}>
                  <div className={styles.itemImageWrapper}>
                    <Link href={`/product/${item.id}`}>
                      <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
                    </Link>
                  </div>
                  
                  <div className={styles.itemInfo}>
                    <div className={styles.itemHeader}>
                      <Link href={`/product/${item.id}`}>
                        <h3 className={item.name}>{item.name.toUpperCase()}</h3>
                      </Link>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id, item.size)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className={styles.itemMeta}>
                      <p>SIZE: <span>{item.size || 'N/A'}</span></p>
                      <p>PRICE: <span>{item.price}</span></p>
                    </div>
                    
                    <div className={styles.itemFooter}>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}><Plus size={14} /></button>
                      </div>
                      <div className={styles.itemTotal}>
                         ₹{(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className={styles.summary}>
              <div className={styles.summaryCard}>
                <h3>ORDER SUMMARY</h3>
                
                <div className={styles.summaryRow}>
                  <span>SUBTOTAL</span>
                  <span>{cartTotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>SHIPPING</span>
                  <span>FREE</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>TAXES</span>
                  <span>CALCULATED AT CHECKOUT</span>
                </div>
                
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>TOTAL</span>
                  <span>{cartTotal}</span>
                </div>
                
                <Link href="/checkout" className={styles.checkoutBtn}>
                  PROCEED TO CHECKOUT <ArrowRight size={20} />
                </Link>
                
                <div className={styles.paymentBadges}>
                  <p>WE ACCEPT</p>
                  <div className={styles.badgesRow}>
                    {/* Placeholder for payment icons */}
                    <div className={styles.badge}>UPI</div>
                    <div className={styles.badge}>VISA</div>
                    <div className={styles.badge}>MASTER</div>
                    <div className={styles.badge}>COD</div>
                  </div>
                </div>
              </div>

              <Link href="/shop" className={styles.continueLink}>
                <ArrowLeft size={16} /> CONTINUE SHOPPING
              </Link>
            </aside>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={64} />
            </div>
            <h2>Your bag is currently empty.</h2>
            <p>Looks like you haven't added anything to your bag yet.</p>
            <Link href="/shop" className={styles.emptyCta}>
              START SHOPPING
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
