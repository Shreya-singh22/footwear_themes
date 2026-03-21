"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, Minus, Plus, Star, ShoppingBag, Truck, RotateCcw } from "lucide-react";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">Product not found</p>
        <Link href="/products" className="text-accent hover:underline text-sm mt-2 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const related = products
    .filter((p) => p.id !== product.id && (p.type === product.type || p.brand === product.brand))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="px-2 py-0.5 bg-sale text-accent-foreground text-xs font-bold rounded">-{discount}%</span>
              </>
            )}
          </div>

          {/* Color */}
          <div className="mt-6">
            <h3 className="font-display font-semibold text-sm mb-3">Color: {selectedColor || "Select"}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                    selectedColor === color
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-sm">Size: {selectedSize || "Select"}</h3>
              <button className="text-xs text-accent hover:underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm rounded-md border transition-colors ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="font-display font-semibold text-sm mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-border rounded-md hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-border rounded-md hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <Button onClick={handleAddToCart} className="flex-1 h-12 text-sm font-semibold gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`h-12 w-12 flex items-center justify-center border rounded-md transition-colors ${
                inWishlist ? "bg-sale/10 border-sale text-sale" : "border-border hover:border-foreground"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Trust */}
          <div className="flex gap-6 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="w-4 h-4" /> Free shipping over {formatCurrency(5000)}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw className="w-4 h-4" /> 30-day returns
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
