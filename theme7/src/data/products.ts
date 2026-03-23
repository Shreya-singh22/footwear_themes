import { StaticImageData } from "next/image";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";
import sneaker5 from "@/assets/sneaker-5.jpg";
import sneaker6 from "@/assets/sneaker-6.jpg";
import mensCollection from "@/assets/mens-collection-premium.png";
import sneakerKids from "@/assets/sneaker-kids.jpg";

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string | StaticImageData;
  category: "Men" | "Women" | "Kids";
  tag?: string;
  description: string;
  details: string[];
  specs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  reviewsList: Review[];
}

const dummyReviews: Review[] = [
  { id: "r1", user: "Vikram S.", rating: 5, date: "2024-03-15", comment: "The quality is unmatched. Truly premium feel and the support is perfect for long walks.", verified: true },
  { id: "r2", user: "Ananya K.", rating: 4, date: "2024-03-10", comment: "Beautiful design. The high contrast look is even better in person. Slightly tight initially but breaks in well.", verified: true },
  { id: "r3", user: "Rohan M.", rating: 5, date: "2024-02-28", comment: "Absolute beast of a shoe. Highly recommend for anyone looking for that editorial goth look without sacrificing comfort.", verified: true }
];

export const products: Product[] = [
  {
    id: "retro-runner-green",
    name: "Retro Runner Green",
    price: "₹11,499",
    image: sneaker1,
    category: "Men",
    tag: "New",
    description: "A classic silhouette refined with premium materials for the modern urban explorer.",
    details: ["Premium suede and mesh upper", "Lightweight EVA midsole", "Durable rubber outsole"],
    specs: { "Material": "Suede, Mesh", "Weight": "320g", "Style": "Running" },
    rating: 4,
    reviewsCount: 12,
    reviewsList: dummyReviews
  },
  {
    id: "court-high-tan",
    name: "Court High Tan",
    price: "₹14,299",
    image: sneaker3,
    category: "Men",
    description: "Elevate your street style with these high-top sneakers in a sophisticated tan palette.",
    details: ["Full-grain leather upper", "Padded ankle collar", "Contrast stitching"],
    specs: { "Material": "Leather", "Style": "High-top" },
    rating: 5,
    reviewsCount: 8,
    reviewsList: dummyReviews,
    tag: "Sale"
  },
  {
    id: "classic-low-black",
    name: "Classic Low Black",
    price: "₹10,799",
    image: sneaker4,
    category: "Men",
    description: "The essential black sneaker. Minimalist design, maximum versatility.",
    details: ["Nappa leather construction", "Monochromatic design", "Built for durability"],
    specs: { "Material": "Napa Leather", "Style": "Low-pro" },
    rating: 4,
    reviewsCount: 24,
    reviewsList: dummyReviews
  },
  {
    id: "velocity-gold",
    name: "Velocity Gold",
    price: "₹13,499",
    image: sneaker5,
    category: "Men",
    tag: "Hot",
    description: "Bold colors meet explosive performance. The Velocity Gold is built for those who lead.",
    details: ["Breathable tech-mesh", "Responsive cushioning", "Reflective accents"],
    specs: { "Material": "Tech Mesh", "Style": "Performance" },
    rating: 5,
    reviewsCount: 15,
    reviewsList: dummyReviews
  },
  {
    id: "urban-nomad",
    name: "Urban Nomad",
    price: "₹12,999",
    image: sneaker2,
    category: "Men",
    tag: "Premium",
    description: "Crafted for the city, the Urban Nomad provides timeless comfort for long days on the move.",
    details: ["Eco-friendly materials", "Ortholite insole", "Water-resistant coating"],
    specs: { "Material": "Recycled Fabric", "Style": "Casual" },
    rating: 4,
    reviewsCount: 10,
    reviewsList: dummyReviews
  },
  {
    id: "junior-sport",
    name: "Junior Sport",
    price: "₹6,299",
    image: sneakerKids,
    category: "Kids",
    description: "Lightweight and durable, the Junior Sport is ready for any adventure.",
    details: ["Easy-on velcro straps", "Impact protection", "Non-marking sole"],
    specs: { "Material": "Synthetic", "Style": "Kids Sport" },
    rating: 5,
    reviewsCount: 6,
    reviewsList: dummyReviews
  },
  {
    id: "blush-runner",
    name: "Blush Runner",
    price: "₹7,999",
    image: sneaker2,
    category: "Kids",
    description: "Soft colors and a smooth ride make the Blush Runner a favorite for everyday play.",
    details: ["Breathable upper", "Soft foam cushioning", "Flexible outsole"],
    specs: { "Material": "Mesh/Synthetic", "Style": "Kids Casual" },
    rating: 4,
    reviewsCount: 4,
    reviewsList: dummyReviews
  },
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    price: "₹7,199",
    image: sneaker6,
    category: "Kids",
    tag: "New",
    description: "Bring some magic to every step with the Lavender Dream.",
    details: ["Sparkle finish", "Cushioned footbed", "Reinforced toe cap"],
    specs: { "Material": "Leather/Glitter", "Style": "Kids Fashion" },
    rating: 5,
    reviewsCount: 9,
    reviewsList: dummyReviews
  },
  {
    id: "solar-burst",
    name: "Solar Burst",
    price: "₹6,799",
    image: sneaker5,
    category: "Kids",
    description: "Energetic colors for energetic kids. The Solar Burst is born to run.",
    details: ["Heel pull tab", "Stable heel counter", "Vibrant colorway"],
    specs: { "Material": "Synthetic", "Style": "Kids Performance" },
    rating: 4,
    reviewsCount: 7,
    reviewsList: dummyReviews,
    tag: "Sale"
  },
  {
    id: "phantom-step",
    name: "Phantom Step",
    price: "₹12,499",
    image: sneaker1,
    category: "Men",
    tag: "Trending",
    description: "Quiet confidence in every stride. The Phantom Step merges shadow aesthetics with peak comfort.",
    details: ["Matte finish leather", "Hidden lace system", "Memory foam insole"],
    specs: { "Material": "Leather/Synth", "Style": "Lifestyle" },
    rating: 5,
    reviewsCount: 31,
    reviewsList: dummyReviews
  },
  {
    id: "neon-ghost",
    name: "Neon Ghost",
    price: "₹15,999",
    image: sneaker6,
    category: "Men",
    description: "Break the darkness with subtle neon accents. A high-performance sneaker designed for late-night city runs.",
    details: ["3M reflective detailing", "Breathable knit upper", "Carbon fiber plate"],
    specs: { "Material": "Tech Knit", "Style": "Running" },
    rating: 4,
    reviewsCount: 19,
    reviewsList: dummyReviews
  },
  {
    id: "shadow-kid-low",
    name: "Shadow Kid Low",
    price: "₹5,499",
    image: sneakerKids,
    category: "Kids",
    description: "Scaled down style, not quality. The Shadow Kid Low is built for durability and stealth.",
    details: ["Reinforced stitching", "Easy-wash upper", "Non-slip traction"],
    specs: { "Material": "Cotton/Rubber", "Style": "Kids Low" },
    rating: 5,
    reviewsCount: 12,
    reviewsList: dummyReviews
  },
  {
    id: "urban-edge-taupe",
    name: "Urban Edge Taupe",
    price: "₹11,999",
    image: sneaker3,
    category: "Men",
    tag: "Classic",
    description: "Neutral tones for universal appeal. Perfect for pairing with monochromatic fits.",
    details: ["Brushed suede", "Contrast sole", "Arch support"],
    specs: { "Material": "Suede", "Style": "Chukka" },
    rating: 4,
    reviewsCount: 22,
    reviewsList: dummyReviews
  },
  {
    id: "obsidian-bolt",
    name: "Obsidian Bolt",
    price: "₹13,799",
    image: sneaker4,
    category: "Men",
    description: "Fast, dark, and relentless. The Obsidian Bolt is engineered for velocity and style.",
    details: ["Lightweight textile", "Fast-lacing system", "Grip-lock technology"],
    specs: { "Material": "Textile/TPU", "Style": "Athletic" },
    rating: 5,
    reviewsCount: 14,
    reviewsList: dummyReviews
  },
  {
    id: "noir-belle",
    name: "Noir Belle",
    price: "₹12,499",
    image: sneaker6,
    category: "Women",
    tag: "New",
    description: "Elegant shadows. The Noir Belle is a fusion of graceful lines and monochromatic grit.",
    details: ["Sleek synthetic upper", "Tapered silhouette", "Lightweight cushioning"],
    specs: { "Material": "Synth/Fabric", "Style": "Womens Lifestyle" },
    rating: 5,
    reviewsCount: 18,
    reviewsList: dummyReviews
  },
  {
    id: "velvet-vanguard",
    name: "Velvet Vanguard",
    price: "₹14,999",
    image: sneaker2,
    category: "Women",
    description: "Soft touch, hard edge. Premium materials meet an avant-garde design for the modern woman.",
    details: ["Velvet-texture leather", "Sculpted midsole", "Gold-tone hardware"],
    specs: { "Material": "Textured Leather", "Style": "Fashion" },
    rating: 4,
    reviewsCount: 11,
    reviewsList: dummyReviews,
    tag: "Sale"
  },
  {
    id: "ghost-shell-w",
    name: "Ghost Shell",
    price: "₹11,799",
    image: sneaker1,
    category: "Women",
    description: "Minimalism at its most haunting. A stripped-back design for maximum impact.",
    details: ["Translucent overlays", "Low-pro silhouette", "Speed-lace tech"],
    specs: { "Material": "TPU/Mesh", "Style": "Minimalist" },
    rating: 5,
    reviewsCount: 22,
    reviewsList: dummyReviews
  },
  {
    id: "crimson-shadow",
    name: "Crimson Shadow",
    price: "₹13,299",
    image: sneaker5,
    category: "Women",
    tag: "Limited",
    description: "A pop of deep red in an obsidian world. The Crimson Shadow is for those who dare to stand out.",
    details: ["Premium red accents", "Padded collar", "High-traction sole"],
    specs: { "Material": "Leather/Synth", "Style": "Athletic" },
    rating: 4,
    reviewsCount: 9,
    reviewsList: dummyReviews
  },
  {
    id: "luna-pro-w",
    name: "Luna Pro",
    price: "₹15,499",
    image: sneaker3,
    category: "Women",
    description: "Ethereal comfort. The Luna Pro uses advanced foam technology to make every step feel weightless.",
    details: ["Lunar-foam midsole", "Seamless upper", "Reflective branding"],
    specs: { "Material": "Tech Mesh", "Style": "Professional" },
    rating: 5,
    reviewsCount: 14,
    reviewsList: dummyReviews,
    tag: "New"
  },
  {
    id: "sale-stunt-1",
    name: "Sale Stunt Runner",
    price: "₹4,999",
    image: sneaker1,
    category: "Men",
    tag: "Sale",
    description: "High performance at an unbeatable price. Limited time sale.",
    details: ["Arch support", "Breathable mesh"],
    specs: { "Material": "Mesh", "Style": "Running" },
    rating: 4,
    reviewsCount: 45,
    reviewsList: dummyReviews
  },
  {
    id: "new-arrival-zen",
    name: "Zenith High",
    price: "₹18,999",
    image: sneaker4,
    category: "Men",
    tag: "New",
    description: "The peak of urban design. Newly arrived for the spring collection.",
    details: ["Hand-stitched leather", "Limited edition colorway"],
    specs: { "Material": "Luxury Leather", "Style": "High-top" },
    rating: 5,
    reviewsCount: 2,
    reviewsList: dummyReviews
  }
];
