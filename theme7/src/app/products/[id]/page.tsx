"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Star, Heart, ShoppingBag, ChevronRight, Share2, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import ProductCard from "@/components/ProductCard";
import ReviewSection from "@/components/ReviewSection";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-[#4A3728]">Product Not Found</h1>
        <p className="text-[#4A3728]/60">The product you're looking for doesn't exist.</p>
        <a href="/shop" className="inline-block border-b-2 border-[#4A3728] pb-1 text-sm font-black uppercase tracking-widest">Back to Shop</a>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="pt-24 pb-32 bg-[#F2F0EA]">
      {/* Breadcrumbs */}
      <nav className="px-6 md:px-12 lg:px-20 py-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A3728]/40">
        <a href="/" className="hover:text-olive">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href="/shop" className="hover:text-olive">Shop</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-olive">{product.name}</span>
      </nav>

      <div className="container px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#E5E2D9] group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isInWishlist(product.id) 
                    ? "bg-[#6B705C] text-white" 
                    : "bg-white/80 backdrop-blur-md text-[#4A3728] hover:bg-[#4A3728] hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>
            
            {/* Minimalist Grid for more images (reusing main for now) */}
            <div className="grid grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="relative aspect-square rounded-sm overflow-hidden bg-[#E5E2D9] opacity-40 hover:opacity-100 transition-opacity">
                   <Image src={product.image} alt={product.name} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10 py-4">
            <div className="space-y-4">
              {product.tag && (
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] bg-olive text-white px-3 py-1">
                  {product.tag}
                </span>
              )}
              <h1 className="text-5xl md:text-7xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= product.rating ? "fill-[#6B705C] text-[#6B705C]" : "fill-transparent text-[#6B705C]/20"}`} />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#4A3728]/40 uppercase tracking-widest">
                  {product.reviewsCount} Customer Reviews
                </span>
              </div>
              <p className="text-3xl font-display font-medium text-[#4A3728]">
                {product.price}
              </p>
            </div>

            <p className="text-[#4A3728]/70 leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#4A3728]">Select Size</h3>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-[#4A3728]/40 border-b border-[#4A3728]/20 hover:text-olive hover:border-olive transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"].map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[70px] h-12 flex items-center justify-center text-xs font-bold transition-all border ${
                        selectedSize === size 
                          ? "bg-[#4A3728] text-white border-[#4A3728]" 
                          : "border-[#4A3728]/10 text-[#4A3728] hover:border-[#4A3728] hover:bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-[#4A3728] text-white h-16 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] hover:bg-olive transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-16 h-16 flex items-center justify-center border border-[#4A3728]/10 text-[#4A3728] hover:bg-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#4A3728]/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-olive" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#4A3728]/60">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-5 h-5 text-olive" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#4A3728]/60">Authentic Only</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw className="w-5 h-5 text-olive" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#4A3728]/60">30 Day Return</span>
              </div>
            </div>

            {/* Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b-[#4A3728]/10">
                <AccordionTrigger className="text-xs font-black uppercase tracking-widest text-[#4A3728] hover:no-underline hover:text-olive">Product Details</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-[#4A3728]/70">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs" className="border-b-[#4A3728]/10">
                <AccordionTrigger className="text-xs font-black uppercase tracking-widest text-[#4A3728] hover:no-underline hover:text-olive">Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">{key}</p>
                        <p className="font-bold text-[#4A3728]">{value}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection 
          reviews={product.reviewsList} 
          rating={product.rating} 
          count={product.reviewsCount} 
        />
      </div>

      {/* Related Products */}
      <section className="mt-40 px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-display font-bold text-[#4A3728] tracking-tighter">You May Also Like</h2>
          <a href="/shop" className="text-xs font-black uppercase tracking-widest text-olive border-b border-olive">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
