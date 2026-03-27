'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useStoreContext } from '@/context/store-context';
import styles from './Category.module.css';

const Category = () => {
  const { customization } = useStoreContext();

  const title = customization?.categorySection?.title || "Shop by Category";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'categorySection' }, '*');
    }
  };

  return (
    <section className={styles.section} onClick={handleSectionClick}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.viewAll}>VIEW ALL <ArrowRight size={16} /></button>
        </div>
        
        <div className={styles.grid}>
          <Link href="/shop?category=sneakers" className={styles.card}>
            <Image 
              src="/images/sneaker_category.png" 
              alt="Sneakers" 
              fill
              className={styles.image}
            />
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <h3 className={styles.catName}>SNEAKERS</h3>
              <div className={styles.arrowCircle}>
                <ArrowRight size={24} />
              </div>
            </div>
          </Link>
          
          <Link href="/shop?category=formal" className={styles.card}>
            <Image 
              src="/images/formal_category.png" 
              alt="Formal" 
              fill
              className={styles.image}
            />
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <h3 className={styles.catName}>FORMAL</h3>
              <div className={styles.arrowCircle}>
                <ArrowRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
