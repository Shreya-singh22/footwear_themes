'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, CreditCard, Home, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Checkout.module.css';

const CheckoutPage = () => {
  const { cart, cartTotal, cartCount } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'upi'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (cart.length === 0 && step !== 3) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.emptyContainer}>
          <ShoppingBag size={48} color="var(--primary-gold)" />
          <h2>Your bag is empty</h2>
          <p>Please add items to your bag before checking out.</p>
          <Link href="/shop" className={styles.emptyCta}>BACK TO SHOP</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        {step < 3 && (
          <div className={styles.checkoutLayout}>
            <div className={styles.formSide}>
              <div className={styles.stepper}>
                <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                  <div className={styles.stepNum}>1</div>
                  <span>ADDRESS</span>
                </div>
                <div className={styles.divider}></div>
                <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
                  <div className={styles.stepNum}>2</div>
                  <span>PAYMENT</span>
                </div>
              </div>

              {step === 1 && (
                <div className={styles.formSection}>
                  <h2 className={styles.stepTitle}>SHIPPING DETAILS</h2>
                  <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                      <label>FULL NAME</label>
                      <input type="text" name="fullName" placeholder="Enter your name" value={formData.fullName} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>EMAIL ADDRESS</label>
                      <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label>SHIPPING ADDRESS</label>
                      <input type="text" name="address" placeholder="Street address, apartment, suite" value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>CITY</label>
                      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>PINCODE / ZIP</label>
                      <input type="text" name="pincode" placeholder="6-digit code" value={formData.pincode} onChange={handleInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>PHONE NUMBER</label>
                      <input type="tel" name="phone" placeholder="10-digit number" value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>
                  <button className={styles.mainBtn} onClick={nextStep}>
                    CONTINUE TO PAYMENT <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className={styles.formSection}>
                  <h2 className={styles.stepTitle}>PAYMENT METHOD</h2>
                  <div className={styles.paymentOptions}>
                    <div 
                      className={`${styles.paymentCard} ${formData.paymentMethod === 'upi' ? styles.selected : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    >
                      <div className={styles.optionHeader}>
                        <div className={styles.radio}></div>
                        <span>UPI (GPay / PhonePe)</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`${styles.paymentCard} ${formData.paymentMethod === 'card' ? styles.selected : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div className={styles.optionHeader}>
                        <div className={styles.radio}></div>
                        <span>CREDIT / DEBIT CARD</span>
                      </div>
                      <CreditCard size={20} className={styles.optionIcon} />
                    </div>
                    
                    <div 
                      className={`${styles.paymentCard} ${formData.paymentMethod === 'cod' ? styles.selected : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    >
                      <div className={styles.optionHeader}>
                        <div className={styles.radio}></div>
                        <span>CASH ON DELIVERY (COD)</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    <button className={styles.backBtn} onClick={prevStep}>
                      <ArrowLeft size={18} /> BACK
                    </button>
                    <button className={styles.mainBtn} onClick={nextStep}>
                      PLACE ORDER {cartTotal}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside className={styles.orderSummary}>
              <div className={styles.summarySticky}>
                <h3>ORDER SUMMARY</h3>
                <div className={styles.summaryItems}>
                  {cart.map((item, i) => (
                    <div key={i} className={styles.summaryItem}>
                      <div className={styles.itemThumb}>
                        <Image src={item.image} alt={item.name} fill className={styles.thumbImg} />
                      </div>
                      <div className={styles.itemDetails}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemMeta}>Size: {item.size} | Qty: {item.quantity}</p>
                        <p className={styles.itemPrice}>{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.couponSection}>
                   <input type="text" placeholder="GIFT CARD / COUPON" />
                   <button>APPLY</button>
                </div>

                <div className={styles.summaryTotals}>
                  <div className={styles.totalRow}>
                    <span>SUBTOTAL</span>
                    <span>{cartTotal}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>SHIPPING</span>
                    <span>FREE</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>TOTAL</span>
                    <span>{cartTotal}</span>
                  </div>
                </div>

                <div className={styles.trustIndicators}>
                   <div className={styles.trustItem}><ShieldCheck size={16} /> <span>SSL ENCRYPTED</span></div>
                   <div className={styles.trustItem}><Truck size={16} /> <span>EXPRESS DELIVERY</span></div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {step === 3 && (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>
              <CheckCircle size={80} color="var(--primary-gold)" />
            </div>
            <h1 className={styles.successTitle}>ORDER PLACED!</h1>
            <p className={styles.successSub}>Thank you for choosing GothSole. Your order <span>#GS-92837</span> has been confirmed.</p>
            
            <div className={styles.orderStatus}>
               <div className={styles.statusInfo}>
                  <p>A confirmation email has been sent to <strong>{formData.email}</strong></p>
                  <p>Estimated Delivery: <strong>3-5 Business Days</strong></p>
               </div>
            </div>

            <Link href="/" className={styles.homeBtn}>
              BACK TO HOME
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
