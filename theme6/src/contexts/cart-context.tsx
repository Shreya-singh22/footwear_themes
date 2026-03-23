"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('sneakarts_cart');
    const savedWishlist = localStorage.getItem('sneakarts_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('sneakarts_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sneakarts_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: any, size: string) => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) => (item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.error(`${product.name} removed from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
};
