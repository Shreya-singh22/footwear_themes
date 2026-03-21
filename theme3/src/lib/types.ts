export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  type: string;
  colors: string[];
  sizes: number[];
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
}
