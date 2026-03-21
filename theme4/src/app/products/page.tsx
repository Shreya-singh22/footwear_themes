"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { productsList } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const GENDERS = ["Men", "Women", "Unisex"];

export default function ProductsPage() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(20000);

  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(product.category);
      const matchesPrice = product.price <= priceRange;
      return matchesGender && matchesPrice;
    });
  }, [selectedGenders, priceRange]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar cartCount={2} />

      <main className="flex-1 container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">
            All Footwear
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Browse our entire collection of limited drops and classics.
          </p>
          <div className="w-16 h-1 bg-primary mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filtering */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="sticky top-24 space-y-6">
              <h2 className="font-display text-xl font-bold border-b border-border pb-4">FILTERS</h2>
              
              <Accordion type="multiple" defaultValue={["category", "price"]} className="w-full">
                <AccordionItem value="category" className="border-border">
                  <AccordionTrigger className="hover:no-underline font-display tracking-wider">CATEGORY</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {GENDERS.map(gender => (
                        <div key={gender} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`gender-${gender}`} 
                            checked={selectedGenders.includes(gender)}
                            onCheckedChange={() => toggleGender(gender)}
                          />
                          <Label htmlFor={`gender-${gender}`} className="text-muted-foreground cursor-pointer font-medium">{gender}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price" className="border-border">
                  <AccordionTrigger className="hover:no-underline font-display tracking-wider">MAX PRICE</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹0</span>
                        <span className="font-bold text-foreground">₹{priceRange.toLocaleString("en-IN")}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5000" 
                        max="25000" 
                        step="500" 
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full accent-primary" 
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>Showing {filteredProducts.length} results</span>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div 
                    key={product.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  >
                    <Link href={`/products/${product.id}`} className="block h-full">
                      <ProductCard 
                        name={product.name} 
                        price={product.price}
                        image={product.images[0]}
                        tag={product.tag}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center border border-dashed border-border rounded-lg bg-secondary/30">
                <p className="text-muted-foreground text-lg">No products match your selected filters.</p>
                <button 
                  onClick={() => { setSelectedGenders([]); setPriceRange(20000); }} 
                  className="mt-4 text-primary underline hover:text-primary/80"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
