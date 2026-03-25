"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingBag, Minus, Plus, Check, AlertCircle, Share2, Ruler, ShieldCheck, Truck } from "lucide-react";
import { products, categories } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sizeRegions = ["EU", "UK", "US"] as const;
const sizeConvert = (eu: number, region: typeof sizeRegions[number]) => {
  if (region === "UK") return eu - 33;
  if (region === "US") return eu - 32;
  return eu;
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = useStore();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeRegion, setSizeRegion] = useState<typeof sizeRegions[number]>("EU");
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (product) addToRecentlyViewed(product.id);
  }, [product?.id, addToRecentlyViewed]);

  if (!product) {
    return notFound();
  }

  const liked = isInWishlist(product.id);
  const images = product.colors[selectedColor]?.images || [];
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const selectedVariant = product.sizes.find(s => s.size === selectedSize);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (selectedVariant && selectedVariant.stock === 0) {
      toast.error("This size is out of stock");
      return;
    }
    addToCart({ productId: product.id, colorName: product.colors[selectedColor].name, size: selectedSize }, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-border">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Collection</Link>
          <span className="text-border">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Gallery Column */}
          <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(i)}
                className={`aspect-square overflow-hidden rounded-sm border transition-all duration-300 ${mainImage === i ? "border-primary scale-105" : "border-border hover:border-muted-foreground"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedColor}-${mainImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/30 cursor-crosshair"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[mainImage] || images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-200"
                  style={isZooming ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Thumbs */}
            <div className="mt-4 flex gap-2 lg:hidden">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-all ${mainImage === i ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1">
                  {product.brand}
                </span>
                <div className="flex gap-2">
                  <TooltipProvider text-xs>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-border">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share this product</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-foreground md:text-5xl">
                {product.name}
              </h1>

              {/* Rating Summary */}
              <div className="mt-6 flex items-center gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className={`h-4 w-4 ${star <= Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  ))}
                  <span className="ml-2 text-sm font-black text-foreground">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                  {product.reviews.length} Verified Reviews
                </button>
              </div>

              {/* Price Section */}
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-3xl font-black text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-muted-foreground line-through opacity-50">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                      Color: <span className="text-muted-foreground">{product.colors[selectedColor].name}</span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {product.colors.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() => { setSelectedColor(i); setMainImage(0); }}
                        className={`group relative h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-300 ${selectedColor === i ? "border-primary p-0.5" : "border-transparent"}`}
                      >
                        <div 
                          className="h-full w-full rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        />
                        {selectedColor === i && (
                          <motion.div layoutId="color-check" className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Select Size</p>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                    <Ruler className="h-3 w-3" /> Size Guide
                  </button>
                </div>
                
                <div className="mb-4 flex gap-4 border-b border-border pb-4">
                  {sizeRegions.map(r => (
                    <button
                      key={r}
                      onClick={() => setSizeRegion(r)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${sizeRegion === r ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(variant => {
                    const displaySize = sizeConvert(variant.size + 33, sizeRegion);
                    const outOfStock = variant.stock === 0;
                    const isSelected = selectedSize === variant.size;
                    return (
                      <button
                        key={variant.size}
                        onClick={() => !outOfStock && setSelectedSize(variant.size)}
                        disabled={outOfStock}
                        className={`flex h-14 w-18 flex-1 min-w-[70px] items-center justify-center border text-xs font-black transition-all duration-300
                          ${isSelected ? "border-primary bg-primary text-white" : outOfStock ? "border-border text-muted-foreground/30 opacity-50 cursor-not-allowed" : "border-border hover:border-primary"}`}
                      >
                        {displaySize}
                      </button>
                    );
                  })}
                </div>
                
                <AnimatePresence>
                  {selectedVariant && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${selectedVariant.stock <= 3 ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {selectedVariant.stock <= 3 ? <AlertCircle className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                      {selectedVariant.stock === 0 ? "Currently Out of Stock" : selectedVariant.stock <= 3 ? `Limited Stock: Only ${selectedVariant.stock} units left` : "Ready to dispatch: In Stock"}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Call to Action */}
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-14 w-14 items-center justify-center transition-colors hover:bg-secondary">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-display text-lg font-black">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="flex h-14 w-14 items-center justify-center transition-colors hover:bg-secondary">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button onClick={handleAddToCart} className="h-14 flex-1 rounded-none text-xs font-black uppercase tracking-[0.2em]" size="lg">
                    <ShoppingBag className="mr-3 h-5 w-5" /> Add to Sanctuary
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-14 rounded-none text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${liked ? "bg-primary text-white border-primary" : "bg-transparent border-border hover:border-primary"}`}
                >
                  <Heart className={`mr-3 h-5 w-5 ${liked ? "fill-white" : ""}`} /> 
                  {liked ? "In Your Wishlist" : "Add to Favorites"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Authentic Only</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Sections */}
        <section className="mt-24">
          <div className="grid gap-20 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground mb-8">Product Story</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-12">
                {product.description}
              </p>
              
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary">Materials & Origins</h3>
                  <p className="text-sm font-medium text-muted-foreground">{product.materials}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary">Care Guide</h3>
                  <p className="text-sm font-medium text-muted-foreground">{product.care}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-secondary/30 p-10 rounded-sm h-fit">
              <h2 className="font-display text-xl font-black uppercase tracking-tight text-foreground mb-6">Reviews & Ratings</h2>
              <div className="mb-8 flex items-end gap-4">
                <span className="text-6xl font-black">{product.rating}</span>
                <div className="flex flex-col gap-1 pb-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.reviews.length} Global Ratings</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-t border-border pt-6 first:border-none first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{review.user}</span>
                        {review.verified && <span className="text-[8px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5">Verified</span>}
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`h-2 h-2 ${s <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-muted-foreground italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-32 pt-20 border-t border-border">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground">You May Also Like</h2>
              <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
