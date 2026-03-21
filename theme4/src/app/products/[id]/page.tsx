"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProductById, productsList } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Heart, ShoppingBag, ArrowLeft, Truck, ShieldCheck, Ruler, Flame } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { setCartCount, setWishlistCount } = useStoreContext();

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size first.");
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartCount((p: number) => p + 1);
      alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
    }, 1500);
  };

  const relatedProducts = productsList.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar cartCount={2} />

      <main className="flex-1 container mx-auto px-4 py-24">
        {/* Breadcrumb / Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Footwear
          </Link>
        </motion.div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-start">
          {/* Left - Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Active Image */}
            <div className="relative aspect-[4/5] sm:aspect-square bg-secondary rounded-sm overflow-hidden border border-border group flex items-center justify-center p-8">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={typeof product.images[activeImage] === "string" ? product.images[activeImage] as string : (product.images[activeImage] as any).src}
                  alt={product.name}
                  className="w-full h-full object-contain cursor-crosshair drop-shadow-2xl hover:scale-110 transition-transform duration-700"
                />
              </AnimatePresence>
              
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground font-display text-xs tracking-wider px-4 py-1.5 shadow-sm">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square bg-secondary rounded-sm border overflow-hidden p-2 transition-all duration-300 ${
                    activeImage === i ? "border-primary ring-1 ring-primary/30" : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={typeof img === "string" ? img : (img as any).src}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-start lg:sticky lg:top-32 h-fit"
          >
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <p className="font-display text-xs tracking-[0.2em] text-primary">{product.category}</p>
                {product.stock && product.stock < 10 && (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-sm">
                    <Flame className="w-3 h-3" />
                    Only {product.stock} left
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="font-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-1 text-primary">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="font-bold text-sm text-foreground">{product.rating || "4.8"}</span>
                  <span className="text-muted-foreground text-sm underline cursor-pointer hover:text-foreground transition-colors">(128 reviews)</span>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Size Selector */}
            <div className="mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display tracking-wider text-sm font-bold">SELECT SIZE</h3>
                <button className="text-xs text-muted-foreground flex items-center hover:text-primary transition-colors hover:underline">
                  <Ruler className="w-3 h-3 mr-1" />
                  Size Guide
                </button>
              </div>

              <ToggleGroup 
                type="single" 
                value={selectedSize} 
                onValueChange={(val) => { if(val) setSelectedSize(val); }}
                className="flex flex-wrap gap-2 justify-start"
              >
                {product.sizes.map((size) => {
                  const isOutOfStock = product.outOfStockSizes?.includes(size);
                  return (
                    <ToggleGroupItem 
                      key={size} 
                      value={size.toString()} 
                      disabled={isOutOfStock}
                      aria-label={`Size ${size}`}
                      className={`w-14 h-14 rounded-sm border focus:ring-2 focus:ring-primary/20 transition-all font-display text-lg relative overflow-hidden ${
                        selectedSize === size.toString() 
                          ? "bg-foreground text-background border-foreground shadow-md ring-2 ring-red-500 ring-offset-2" 
                          : isOutOfStock 
                            ? "bg-secondary/50 text-muted-foreground border-border/50 cursor-not-allowed"
                            : "bg-card border-border hover:border-primary hover:bg-secondary"
                      }`}
                    >
                      {size}
                      {isOutOfStock && <div className="absolute inset-0 w-full h-[1px] bg-border/50 rotate-45 top-1/2 -translate-y-1/2" />}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                variant="hero"
                size="lg"
                disabled={isAddingToCart}
                className="flex-[2] py-8 text-lg font-display tracking-wider rounded-sm relative group overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] transition-shadow duration-300"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isAddingToCart ? "ADDING..." : "ADD TO CART"} 
                  {!isAddingToCart && <ShoppingBag className="w-5 h-5" />}
                </div>
                {!isAddingToCart && (
                  <div className="absolute inset-0 bg-primary-foreground/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                )}
              </Button>

              <Button 
                variant="outline"
                size="lg"
                className="flex-1 py-8 text-lg font-display tracking-wider rounded-sm bg-background border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                onClick={() => { alert("Proceeding to Checkout!"); }}
              >
                BUY NOW
              </Button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!isWishlisted) setWishlistCount((p: number) => p + 1);
                  else setWishlistCount((p: number) => Math.max(0, p - 1));
                  setIsWishlisted(!isWishlisted);
                }}
                className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-sm border shadow-sm transition-all duration-300 ${
                  isWishlisted ? "bg-red-50 border-red-200" : "bg-card border-border hover:border-primary/40 hover:bg-secondary"
                }`}
              >
                <Heart 
                  className={`w-6 h-6 transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
                />
              </motion.button>
            </div>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="w-full mb-8">
              <AccordionItem value="description">
                <AccordionTrigger className="text-lg font-display tracking-widest hover:text-primary transition-colors">DESCRIPTION</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 flex flex-col gap-4">
                  <p>{product.description}</p>
                  <p>Designed for those who lead the pack, featuring aggressive geometry and hyper-responsive cushioning technology. Stand out in any environment.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger className="text-lg font-display tracking-widest hover:text-primary transition-colors">MATERIALS & CARE</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Multi-layer breathable composite mesh</li>
                    <li>Reinforced toe-box durability overlay</li>
                    <li>High-traction industrial grade rubber outsole</li>
                    <li>Wipe clean only with damp microfiber cloth</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-lg font-display tracking-widest hover:text-primary transition-colors">SHIPPING & RETURNS</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                  Free standard shipping on orders over ₹15,000. Express delivery available at checkout for an additional fee. Returns accepted within 30 days of delivery for unworn items in original packaging. View our full return policy at bottom of page.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Features (Delivery estimate) */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border bg-secondary/30 p-4 rounded-sm">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-1">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Expected Delivery</p>
                  <p className="text-xs">Arrives by {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-1">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Secure Payment</p>
                  <p className="text-xs">100% Guaranteed checkout</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="py-16 border-t border-border mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="font-display text-2xl font-bold tracking-wider text-foreground">CUSTOMER REVIEWS</h2>
            <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-sm border border-border/50">
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="font-bold text-lg text-foreground ml-2">{product.rating || "4.8"}</span>
              <span className="text-muted-foreground ml-1 text-sm">/ 5 (128 Reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mock Review 1 */}
            <div className="p-6 bg-secondary/30 rounded-sm border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-1 text-primary mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <h4 className="font-bold text-foreground mb-2">Incredible comfort and style</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"Honestly one of the best pairs I've ever owned. The materials feel incredibly premium and the fit is completely true to size. I highly recommend these for daily wear!"</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/50">
                <span className="font-bold tracking-wider text-foreground">MARCUS T.</span>
                <span className="text-green-500 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Verified Buyer
                </span>
              </div>
            </div>
            {/* Mock Review 2 */}
            <div className="p-6 bg-secondary/30 rounded-sm border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-1 text-primary mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <h4 className="font-bold text-foreground mb-2">A massive head-turner</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"Wore these out on the weekend and got asked about them three times. The red accents pop even more in person than they do in the photos. Absolutely flawless drop."</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/50">
                <span className="font-bold tracking-wider text-foreground">ELENA R.</span>
                <span className="text-green-500 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* You Might Also Like */}
        <section className="pt-20 border-t border-border">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center sm:text-left"
          >
            <h2 className="font-display text-3xl font-bold tracking-wider text-foreground">
              PEOPLE ALSO BOUGHT
            </h2>
            <div className="w-12 h-1 bg-primary mt-4 mx-auto sm:mx-0" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <Link key={p.id} href={`/products/${p.id}`} className="block h-full">
                <ProductCard 
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  tag={p.tag}
                  index={i}
                />
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
