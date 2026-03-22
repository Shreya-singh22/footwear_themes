export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  sizes: number[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  description: string;
  isNew?: boolean;
  isHot?: boolean;
  tag?: string;
  gender?: "Men" | "Women" | "Unisex";
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: number;
  color: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: (CartItem & { product: Product })[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  date: string;
  address: Address;
}
