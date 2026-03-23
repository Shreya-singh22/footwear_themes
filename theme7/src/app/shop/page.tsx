"use client";

import { useState, Suspense, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";

function ShopContent() {
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }

    if (tag) {
      setSelectedTag(tag);
    } else {
      setSelectedTag(null);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const price = parseInt(product.price.replace(/[₹,]/g, ""));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesTag = !selectedTag || product.tag === selectedTag;
    return matchesPrice && matchesCategory && matchesTag;
  });

  return (
    <main className="pt-24 pb-20 bg-[#F2F0EA] min-h-screen">
      {/* Editorial Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#4A3728]/10 pb-12">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-olive">Catalogue</p>
            <h1 className="text-7xl md:text-9xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
              Shop.
            </h1>
          </div>
          <p className="text-[#4A3728]/60 max-w-xs text-sm font-medium leading-relaxed">
            Curated selection of premium footwear designed for the modern goth aesthetic and urban performance.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-18 z-30 bg-[#F2F0EA]/80 backdrop-blur-md px-6 md:px-12 lg:px-20 py-6 border-b border-[#4A3728]/5 mb-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4A3728] hover:text-olive transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#F2F0EA] border-r-[#4A3728]/10">
              <SheetHeader className="mb-8">
                <SheetTitle className="font-display text-4xl font-bold text-[#4A3728]">Filters</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-12">
                {/* Category Filter */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#4A3728]">Category</h3>
                  <div className="space-y-4">
                    {["Men", "Women", "Kids"].map(cat => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox 
                          id={cat} 
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedCategories([...selectedCategories, cat]);
                            else setSelectedCategories(selectedCategories.filter(c => c !== cat));
                          }}
                        />
                        <label htmlFor={cat} className="text-sm font-bold text-[#4A3728] uppercase tracking-wide cursor-pointer">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#4A3728]">Price Range</h3>
                    <span className="text-xs font-bold text-olive">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                  </div>
                  <Slider 
                    defaultValue={[0, 20000]} 
                    max={20000} 
                    step={500} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="hidden md:flex items-center gap-4 border-l border-[#4A3728]/10 pl-8">
            <span className="text-[10px] font-bold text-[#4A3728]/40 uppercase tracking-widest">
              {filteredProducts.length} Results
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-transparent border-none text-xs font-black uppercase tracking-widest text-[#4A3728] focus:ring-0">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-[#F2F0EA] border-[#4A3728]/10">
              <SelectItem value="featured" className="text-xs font-bold uppercase tracking-widest">Featured</SelectItem>
              <SelectItem value="newest" className="text-xs font-bold uppercase tracking-widest">Newest</SelectItem>
              <SelectItem value="price-low" className="text-xs font-bold uppercase tracking-widest">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="text-xs font-bold uppercase tracking-widest">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product, idx) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isFeatured={idx === 0 && filteredProducts.length > 3}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center space-y-4">
            <h3 className="text-2xl font-display font-bold text-[#4A3728]">No products found</h3>
            <p className="text-[#4A3728]/60 text-sm">Try adjusting your filters or search query.</p>
            <button 
                onClick={() => { setPriceRange([0, 20000]); setSelectedCategories([]); setSelectedTag(null); }}
                className="mt-4 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-[#4A3728] pb-1 hover:text-olive hover:border-olive transition-all"
              >
                Clear all filters
              </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-display text-4xl font-bold text-[#4A3728]">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
