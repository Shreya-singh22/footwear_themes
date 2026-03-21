import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";
import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: StaticImageData | string;
  images: (StaticImageData | string)[];
  description: string;
  category: "Men" | "Women" | "Unisex";
  tag?: string;
  sizes: number[];
  outOfStockSizes?: number[];
  colors: string[];
  rating?: number;
  stock?: number;
  isHot?: boolean;
}

export const productsList: Product[] = [
  {
    id: "shadow-high-top",
    name: "SHADOW HIGH-TOP",
    price: 15499,
    image: product1,
    images: [product1, product2, product3],
    description: "The Shadow High-Top features an aggressive silhouette and durable multi-paneled upper. Designed for the streets, engineered for comfort, and detailed with reflective accents for high visibility.",
    category: "Men",
    tag: "NEW",
    sizes: [7, 8, 9, 9.5, 10, 11, 12],
    outOfStockSizes: [8, 9.5],
    colors: ["#000000", "#333333"],
    rating: 4.8,
    stock: 12
  },
  {
    id: "inferno-runner",
    name: "INFERNO RUNNER",
    price: 12999,
    image: product2,
    images: [product2, product4, product5],
    description: "Lightweight, breathable, and unmistakably vibrant. The Inferno Runner uses advanced mesh technology to keep you cool while providing maximum energy return on every stride.",
    category: "Women",
    tag: "HOT",
    sizes: [5, 6, 7, 7.5, 8, 9],
    outOfStockSizes: [5, 9],
    colors: ["#ff4500", "#ffffff"],
    rating: 4.9,
    isHot: true,
    stock: 5
  },
  {
    id: "noir-classic",
    name: "NOIR CLASSIC",
    price: 18499,
    image: product3,
    images: [product3, product1, product6],
    description: "A minimalist approach to luxury streetwear. The Noir Classic uses premium full-grain leather and a subtle, embossed logo for those who prefer their kicks to speak softly but carry heavy impact.",
    category: "Unisex",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["#1a1a1a"],
    rating: 4.6,
    stock: 45
  },
  {
    id: "ghost-low",
    name: "GHOST LOW",
    price: 11999,
    image: product4,
    images: [product4, product5, product2],
    description: "Almost completely translucent side panels give the Ghost Low its name. Showcase your sock game while enjoying the ultra-plush, shock-absorbing sole unit.",
    category: "Men",
    sizes: [8, 9, 10, 11, 12],
    colors: ["#f5f5f5", "#e0e0e0"],
    rating: 4.3
  },
  {
    id: "blaze-retro",
    name: "BLAZE RETRO",
    price: 16499,
    image: product5,
    images: [product5, product6, product1],
    description: "Inspired by 90s basketball culture, the Blaze Retro brings back the chunky aesthetic with modern lightweight materials. Features a locked-in fit and ankle support strap.",
    category: "Unisex",
    tag: "SOLD OUT",
    sizes: [7, 8, 9, 10, 11],
    colors: ["#ffffff", "#ff0000", "#000000"],
    rating: 4.7
  },
  {
    id: "void-platform",
    name: "VOID PLATFORM",
    price: 19999,
    image: product6,
    images: [product6, product3, product4],
    description: "Elevate your perspective. The Void Platform adds 2.5 inches of styled height without compromising stability, featuring an industrial-grade rubber outsole.",
    category: "Women",
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ["#0a0a0a", "#8a2be2"],
    rating: 4.9,
    isHot: true
  }
];

export const getProductById = (id: string) => {
  return productsList.find(p => p.id === id);
};
