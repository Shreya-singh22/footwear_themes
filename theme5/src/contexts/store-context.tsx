import { createContext, useContext, ReactNode } from 'react';
import { useStore } from '../lib/api';

const StoreContext = createContext<any>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeData = useStore();
  
  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}
