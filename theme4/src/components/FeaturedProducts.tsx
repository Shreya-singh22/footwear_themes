"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { productsList } from "@/lib/data";
import Link from "next/link";

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary">CURATED FOR YOU</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3">
            LATEST DROPS
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsList.slice(0, 6).map((product, i) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block group">
              <ProductCard 
                name={product.name}
                price={product.price}
                image={product.images[0]}
                tag={product.tag}
                index={i} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
