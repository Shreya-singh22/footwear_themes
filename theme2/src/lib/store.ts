import { create } from "zustand";
import { CartItem, Product, WishlistItem } from "./types";

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  searchQuery: string;
  addToCart: (product: Product, size: number, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setSearchQuery: (query: string) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  searchQuery: "",

  addToCart: (product, size, color) => {
    set((state) => {
      const existing = state.cart.find(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1, selectedSize: size, selectedColor: color }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) }));
  },

  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.find((item) => item.product.id === product.id);
      if (exists) {
        return { wishlist: state.wishlist.filter((item) => item.product.id !== product.id) };
      }
      return { wishlist: [...state.wishlist, { product }] };
    });
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.product.id === productId);
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  cartTotal: () => {
    return get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  cartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
