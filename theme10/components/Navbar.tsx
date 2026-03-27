'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStoreContext } from '@/context/store-context';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { customization } = useStoreContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const logoText = customization?.navbar?.logoText || "GothSole";
  const navLinks = customization?.navbar?.links || [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR STORY", href: "/story" },
    { label: "STORE", href: "/store" }
  ];

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'navbar' }, '*');
    }
  };

  return (
    <>
      <nav className={styles.nav} onClick={handleSectionClick}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">{logoText}<span>.</span></Link>
          </div>
          
          <ul className={styles.navLinks}>
            {navLinks.map((link: any, index: number) => (
              <li key={index}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
          
          <div className={styles.icons}>
            <button 
              className={styles.iconBtn} 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <Link href="/cart" className={styles.cartBtnContainer}>
              <button className={styles.iconBtn} aria-label="Cart">
                <ShoppingBag size={20} />
              </button>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>
            <button className={styles.iconBtn} aria-label="Profile">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchContent}>
            <button className={styles.closeBtn} onClick={() => setIsSearchOpen(false)}>
              <X size={24} />
            </button>
            <div className={styles.searchInputWrapper}>
              <Search size={24} className={styles.searchIcon} />
              <input type="text" placeholder="SEARCH SHOES..." autoFocus />
            </div>
            <p className={styles.searchHint}>Press Enter to search or ESC to close</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
