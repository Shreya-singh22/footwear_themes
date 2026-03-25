"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, brands, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SortOption = "popularity" | "price-asc" | "price-desc" | "newest";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sort, setSort] = useState<SortOption>("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleFilter = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchBrand && matchCategory && matchPrice;
    });

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [search, selectedBrands, selectedCategories, priceRange, sort]);

  const activeFilterCount = selectedBrands.length + selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 25000 ? 1 : 0);

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 25000]);
    setSearch("");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["category", "brand", "price"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="py-3 text-xs font-bold uppercase tracking-widest hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {categories.map(cat => (
                <label key={cat} className="flex cursor-pointer items-center gap-3 group">
                  <Checkbox 
                    checked={selectedCategories.includes(cat)} 
                    onCheckedChange={() => toggleFilter(selectedCategories, cat, setSelectedCategories)}
                    className="rounded-none border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brand" className="border-none">
          <AccordionTrigger className="py-3 text-xs font-bold uppercase tracking-widest hover:no-underline">
            Brand
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {brands.map(brand => (
                <label key={brand} className="flex cursor-pointer items-center gap-3 group">
                  <Checkbox 
                    checked={selectedBrands.includes(brand)} 
                    onCheckedChange={() => toggleFilter(selectedBrands, brand, setSelectedBrands)}
                    className="rounded-none border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 text-xs font-bold uppercase tracking-widest hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pt-4 pb-2">
              <Slider
                min={0}
                max={25000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 rounded-none border border-border bg-secondary/30 px-3 py-2 text-xs font-medium">
                  ₹{priceRange[0].toLocaleString()}
                </div>
                <span className="text-muted-foreground">—</span>
                <div className="flex-1 rounded-none border border-border bg-secondary/30 px-3 py-2 text-xs font-medium">
                  ₹{priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {activeFilterCount > 0 && (
        <Button 
          variant="outline" 
          onClick={clearAll}
          className="w-full rounded-none border-dashed border-primary text-primary hover:bg-primary/5 text-xs uppercase tracking-widest"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Search Overlay Hero */}
      <div className="relative h-[300px] w-full overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80')] bg-cover bg-fixed bg-center opacity-30 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <div className="container relative flex h-full flex-col items-center justify-center pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-white md:text-7xl">
              The Collection
            </h1>
            <p className="mt-4 max-w-md text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Engineered for Excellence
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="sticky top-16 z-30 mb-12 flex flex-col gap-6 border-b border-border bg-background/80 py-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex gap-2 rounded-none border-border px-6 uppercase tracking-widest md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {activeFilterCount > 0 && `[${activeFilterCount}]`}
            </Button>
            
            <div className="hidden items-center gap-1 md:flex">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mr-2">View:</span>
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <div className="h-8 w-px bg-border hidden md:block mx-2" />
            
            <p className="hidden text-xs font-bold uppercase tracking-widest text-muted-foreground md:block">
              {filtered.length} Results Found
            </p>
          </div>

          <div className="flex flex-1 items-center gap-4 md:max-w-xl md:justify-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search the collection..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-none border-b border-border bg-transparent py-2.5 pl-10 pr-4 text-sm font-medium uppercase tracking-wider text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div className="relative group">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="appearance-none rounded-none border-b border-border bg-transparent py-2.5 pl-4 pr-10 text-xs font-bold uppercase tracking-widest text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-44">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex md:hidden"
              >
                <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setShowFilters(false)} />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative ml-auto h-full w-full max-w-[320px] border-l border-border bg-card p-8 shadow-2xl overflow-y-auto"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Filters</h2>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary"
                    >
                      <X className="h-5 w-5 text-foreground group-hover:text-primary" />
                    </button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filter Chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 flex flex-wrap gap-2"
                >
                  {selectedCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter(selectedCategories, cat, setSelectedCategories)}
                      className="flex items-center gap-2 rounded-none bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      {cat} <X className="h-3 w-3" />
                    </button>
                  ))}
                  {selectedBrands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => toggleFilter(selectedBrands, brand, setSelectedBrands)}
                      className="flex items-center gap-2 rounded-none bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      {brand} <X className="h-3 w-3" />
                    </button>
                  ))}
                  {(priceRange[0] > 0 || priceRange[1] < 25000) && (
                    <button
                      onClick={() => setPriceRange([0, 25000])}
                      className="flex items-center gap-2 rounded-none bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      ₹{priceRange[0]} - ₹{priceRange[1]} <X className="h-3 w-3" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="mb-6 rounded-full bg-secondary p-8">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">No matches found</h2>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  We couldn't find any products matching your current filters. Try refining your search or clear all filters.
                </p>
                <Button variant="link" onClick={clearAll} className="mt-6 text-xs uppercase tracking-widest">
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <div className={`grid gap-x-6 gap-y-12 
                ${viewMode === "grid" 
                  ? "grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
                }`}
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
            
            {/* Load More Mockup */}
            {filtered.length > 0 && (
              <div className="mt-24 border-t border-border pt-12 text-center">
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Showing all {filtered.length} products
                </p>
                <div className="mx-auto h-1 w-48 overflow-hidden bg-secondary">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    className="h-full bg-primary origin-left"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Entering the Sanctuary...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
