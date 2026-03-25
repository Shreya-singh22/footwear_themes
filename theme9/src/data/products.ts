export interface ProductVariant {
  size: number;
  stock: number;
  price?: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  materials: string;
  care: string;
  category: string;
  colors: { name: string; hex: string; images: string[] }[];
  sizes: ProductVariant[];
  reviews: Review[];
  rating: number;
  tags: string[];
  isNew?: boolean;
}

const shoeImages = {
  nike1: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
  ],
  nike2: [
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80",
  ],
  jordan: [
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
    "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80",
  ],
  adidas: [
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80",
    "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=80",
  ],
  formal: [
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
  ],
  running: [
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
  ],
  white: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
  ],
  boot: [
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80",
  ],
};

const standardSizes: ProductVariant[] = [
  { size: 6, stock: 5 },
  { size: 7, stock: 12 },
  { size: 8, stock: 8 },
  { size: 9, stock: 15 },
  { size: 10, stock: 10 },
  { size: 11, stock: 3 },
  { size: 12, stock: 0 },
];

const sampleReviews: Review[] = [
  { id: "r1", user: "Arjun M.", rating: 5, text: "Incredibly comfortable and stylish. Worth every penny.", date: "2026-03-10", verified: true },
  { id: "r2", user: "Priya S.", rating: 4, text: "Great quality but runs slightly narrow. Size up if you have wide feet.", date: "2026-02-28", verified: true },
  { id: "r3", user: "Rahul K.", rating: 5, text: "Best shoes I've ever owned. The craftsmanship is impeccable.", date: "2026-02-15", verified: false },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Noir Elite",
    brand: "Nike",
    price: 12999,
    originalPrice: 16999,
    description: "Elevate your stride with the Air Max Noir Elite — a fusion of cutting-edge cushioning and bold aesthetics. The full-length Air unit delivers unmatched comfort while the premium upper turns heads.",
    materials: "Premium leather upper, Air Max cushioning, rubber outsole",
    care: "Wipe clean with damp cloth. Avoid machine washing. Store in cool, dry place.",
    category: "Sneakers",
    colors: [
      { name: "Crimson", hex: "#DC2626", images: shoeImages.nike1 },
      { name: "Obsidian", hex: "#1e293b", images: shoeImages.nike2 },
    ],
    sizes: standardSizes,
    reviews: sampleReviews,
    rating: 4.7,
    tags: ["running", "casual", "bestseller"],
    isNew: true,
  },
  {
    id: "2",
    name: "Retro Dunk Heritage",
    brand: "Nike",
    price: 10999,
    originalPrice: 13999,
    description: "A tribute to the classics. The Retro Dunk Heritage blends vintage silhouette with modern materials for a shoe that's equally at home on the court and on the street.",
    materials: "Synthetic leather, foam midsole, rubber cupsole",
    care: "Spot clean with mild soap. Air dry only.",
    category: "Sneakers",
    colors: [
      { name: "Forest Green", hex: "#166534", images: shoeImages.nike2 },
      { name: "University Red", hex: "#DC2626", images: shoeImages.nike1 },
    ],
    sizes: [
      { size: 7, stock: 6 }, { size: 8, stock: 10 }, { size: 9, stock: 14 },
      { size: 10, stock: 8 }, { size: 11, stock: 2 },
    ],
    reviews: sampleReviews,
    rating: 4.5,
    tags: ["casual", "retro"],
  },
  {
    id: "3",
    name: "Jordan Legacy One",
    brand: "Jordan",
    price: 18999,
    description: "Legendary silhouette. Uncompromised performance. The Jordan Legacy One is built for those who demand excellence — on and off the court.",
    materials: "Full-grain leather, encapsulated Air-Sole unit, solid rubber outsole",
    care: "Use leather conditioner monthly. Clean with soft brush.",
    category: "Basketball",
    colors: [
      { name: "Black/Red", hex: "#0f0f0f", images: shoeImages.jordan },
    ],
    sizes: standardSizes,
    reviews: sampleReviews,
    rating: 4.9,
    tags: ["basketball", "premium", "bestseller"],
    isNew: true,
  },
  {
    id: "4",
    name: "Ultraboost Luxe",
    brand: "Adidas",
    price: 14999,
    originalPrice: 19999,
    description: "Energy return meets luxury. The Ultraboost Luxe features responsive Boost cushioning wrapped in a Primeknit upper for a ride that's as smooth as it is stylish.",
    materials: "Primeknit upper, Boost midsole, Continental rubber outsole",
    care: "Machine washable on cold. Air dry.",
    category: "Running",
    colors: [
      { name: "Core Black", hex: "#0a0a0a", images: shoeImages.adidas },
      { name: "Cloud White", hex: "#f5f5f5", images: shoeImages.white },
    ],
    sizes: standardSizes,
    reviews: sampleReviews,
    rating: 4.6,
    tags: ["running", "performance"],
  },
  {
    id: "5",
    name: "Oxford Sovereign",
    brand: "Clarks",
    price: 8999,
    description: "Timeless sophistication meets modern comfort. The Oxford Sovereign is crafted from premium calfskin leather with a Goodyear welted sole built to last decades.",
    materials: "Calfskin leather, leather lining, Goodyear welted sole",
    care: "Polish regularly. Use shoe trees when not in use.",
    category: "Formal",
    colors: [
      { name: "Cognac", hex: "#92400e", images: shoeImages.formal },
    ],
    sizes: [
      { size: 7, stock: 4 }, { size: 8, stock: 7 }, { size: 9, stock: 11 },
      { size: 10, stock: 6 }, { size: 11, stock: 3 },
    ],
    reviews: sampleReviews,
    rating: 4.4,
    tags: ["formal", "classic"],
  },
  {
    id: "6",
    name: "Pegasus Velocity",
    brand: "Nike",
    price: 11499,
    description: "Built for speed. The Pegasus Velocity delivers a responsive, springy feel with React foam technology and a breathable mesh upper.",
    materials: "Engineered mesh, React foam, Waffle outsole",
    care: "Rinse with cold water. Air dry away from direct heat.",
    category: "Running",
    colors: [
      { name: "Volt", hex: "#84cc16", images: shoeImages.running },
      { name: "Black", hex: "#171717", images: shoeImages.nike2 },
    ],
    sizes: standardSizes,
    reviews: sampleReviews,
    rating: 4.3,
    tags: ["running", "performance", "new"],
    isNew: true,
  },
  {
    id: "7",
    name: "Classic Leather Redux",
    brand: "Reebok",
    price: 7499,
    originalPrice: 9999,
    description: "The icon, reimagined. Soft garment leather upper sits atop a die-cut EVA midsole for lightweight cushioning that lasts all day.",
    materials: "Garment leather, EVA midsole, high-abrasion rubber outsole",
    care: "Wipe with damp cloth. Apply leather protector spray.",
    category: "Casual",
    colors: [
      { name: "White/Gum", hex: "#fafafa", images: shoeImages.white },
    ],
    sizes: standardSizes,
    reviews: sampleReviews,
    rating: 4.2,
    tags: ["casual", "retro", "value"],
  },
  {
    id: "8",
    name: "Chelsea Noir",
    brand: "Dr. Martens",
    price: 15999,
    description: "Rebellious elegance. The Chelsea Noir features the iconic air-cushioned sole with a sleek Chelsea boot silhouette in polished smooth leather.",
    materials: "Polished smooth leather, air-cushioned sole, elastic gussets",
    care: "Apply Dr. Martens Wonder Balsam. Polish with soft cloth.",
    category: "Boots",
    colors: [
      { name: "Black Polish", hex: "#0a0a0a", images: shoeImages.boot },
    ],
    sizes: [
      { size: 7, stock: 3 }, { size: 8, stock: 8 }, { size: 9, stock: 10 },
      { size: 10, stock: 5 }, { size: 11, stock: 1 },
    ],
    reviews: sampleReviews,
    rating: 4.8,
    tags: ["boots", "premium", "bestseller"],
  },
];

export const brands = [...new Set(products.map(p => p.brand))];
export const categories = [...new Set(products.map(p => p.category))];
export const allColors = [...new Set(products.flatMap(p => p.colors.map(c => c.name)))];
