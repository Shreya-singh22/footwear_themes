'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, ShieldCheck, Headset } from 'lucide-react';
import { useStoreContext } from '@/context/store-context';
import styles from './Hero.module.css';

const Hero = () => {
  const { customization } = useStoreContext();

  const title = customization?.heroSection?.title || "CRAFTED FOR ELEVATION";
  const subtext = customization?.heroSection?.subtext || "Experience the pinnacle of luxury footwear. Designed for those who demand both style and substance.";
  const heroImage = customization?.heroSection?.image || "/images/hero_shoe.png";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  return (
    <section className={styles.hero} onClick={handleSectionClick}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title.replace('ELEVATION', '<span>ELEVATION</span>').replace('\n', '<br />') }}></h1>
          <p className={styles.subtext}>
            {subtext}
          </p>
          <Link href="/shop" className={styles.cta}>SHOP ALL</Link>
          
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <Truck size={18} />
              <span>Free Shipping</span>
            </div>
            <div className={styles.badge}>
              <ShieldCheck size={18} />
              <span>Secure Checkout</span>
            </div>
            <div className={styles.badge}>
              <Headset size={18} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
        
        <div className={styles.imageContainer}>
          <div className={styles.spotlight}></div>
          <div className={styles.floatingImage}>
            <Image 
              src={heroImage} 
              alt="Luxury Sneaker" 
              width={700} 
              height={700}
              priority
              className={styles.heroImage}
            />
          </div>
          <div className={styles.shadow}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
