"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { products } from "@/data/products";

export interface CartItem {
  productId: string;
  colorName: string;
  size: number;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (productId: string, colorName: string, size: number) => void;
  updateCartQty: (productId: string, colorName: string, size: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addToRecentlyViewed: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(
        c => c.productId === item.productId && c.colorName === item.colorName && c.size === item.size
      );
      if (existing) {
        return prev.map(c =>
          c.productId === item.productId && c.colorName === item.colorName && c.size === item.size
            ? { ...c, quantity: c.quantity + qty }
            : c
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, colorName: string, size: number) => {
    setCart(prev => prev.filter(c => !(c.productId === productId && c.colorName === colorName && c.size === size)));
  }, []);

  const updateCartQty = useCallback((productId: string, colorName: string, size: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(c => !(c.productId === productId && c.colorName === colorName && c.size === size)));
      return;
    }
    setCart(prev =>
      prev.map(c =>
        c.productId === productId && c.colorName === colorName && c.size === size
          ? { ...c, quantity: qty }
          : c
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0), [cart]);

  return (
    <StoreContext.Provider
      value={{ cart, wishlist, recentlyViewed, addToCart, removeFromCart, updateCartQty, clearCart, toggleWishlist, isInWishlist, addToRecentlyViewed, cartCount, cartTotal }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
