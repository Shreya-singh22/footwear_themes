"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { useStore } from '../lib/api';

const StoreContext = createContext<any>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeData = useStore();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <StoreContext.Provider value={{ ...storeData, cartCount, setCartCount, wishlistCount, setWishlistCount }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStoreContext must be used within a StoreProvider');
  return context;
}
