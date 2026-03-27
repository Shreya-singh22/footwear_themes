'use client';

import React from 'react';
import { Camera, MessageCircle, ThumbsUp, Video, Send } from 'lucide-react';
import { useStoreContext } from '@/context/store-context';
import styles from './Footer.module.css';

const Footer = () => {
  const { customization } = useStoreContext();

  const brandName = customization?.footer?.brandName || "GothSole";
  const desc = customization?.footer?.description || "Redefining luxury footwear with a focus on craft, quality, and timeless design.";
  const socials = customization?.footer?.socialLinks || [
    { platform: 'Instagram', href: '#', icon: <Camera size={20} /> },
    { platform: 'Twitter', href: '#', icon: <MessageCircle size={20} /> },
    { platform: 'Facebook', href: '#', icon: <ThumbsUp size={20} /> },
    { platform: 'Youtube', href: '#', icon: <Video size={20} /> }
  ];

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  return (
    <footer className={styles.footer} onClick={handleSectionClick}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandSide}>
            <h2 className={styles.brand}>{brandName.toUpperCase()}<span>.</span></h2>
            <p className={styles.desc}>
              {desc}
            </p>
            <div className={styles.socials}>
              {socials.map((social: any, index: number) => (
                <a key={index} href={social.href} aria-label={social.platform}>{social.icon}</a>
              ))}
            </div>
          </div>
          
          <div className={styles.linksGrid}>
            <div className={styles.col}>
              <h3>COMPANY</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
            </div>
            <div className={styles.col}>
              <h3>CONTACT</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Track Order</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className={styles.col}>
              <h3>POLICY</h3>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.newsletter}>
            <h3>NEWSLETTER</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="Enter your email" />
              <button className={styles.sendBtn}><Send size={18} /></button>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© 2024 {brandName} Luxury Footwear. All rights reserved.</p>
          <div className={styles.paymentIcons}>
            {/* Payment icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
