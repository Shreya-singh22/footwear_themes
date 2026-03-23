"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { BrandSections, Footer } from '@/components/BrandSections';
import { useStoreContext } from '@/contexts/store-context';
import axios from 'axios';

export default function HomePage() {
  const { customization } = useStoreContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Home Page Fetch Error:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero customization={customization?.config} />
      
      {/* 👟 Product Grid under “TRENDING NOW” handled inside BrandSections */}
      <BrandSections products={products} />
      
      <Footer />
    </main>
  );
}
