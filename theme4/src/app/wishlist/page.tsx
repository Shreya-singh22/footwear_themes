"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";

// Mock wishlisted products
const wishlistProducts = [
  { name: "SHADOW HIGH-TOP", price: 189, image: product1, tag: "NEW" },
  { name: "INFERNO RUNNER", price: 159, image: product2 },
  { name: "NOIR CLASSIC", price: 219, image: product3 },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar cartCount={2} />
      
      <main className="flex-1 container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            YOUR WISHLIST
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Saved items you've got your eye on.
          </p>
          <div className="w-16 h-1 bg-primary mt-6" />
        </motion.div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product, i) => (
              <ProductCard
                key={product.name}
                {...product}
                index={i}
                isWishlisted={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground text-lg mb-4">Your wishlist is currently empty.</p>
            <a href="/" className="inline-flex h-10 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Continue Shopping
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
