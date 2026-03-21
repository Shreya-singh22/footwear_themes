"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { products, brands as allBrands, shoeTypes } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { formatCurrency } from "@/lib/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  const initialBrand = searchParams.get("brand");
  const initialType = searchParams.get("type");

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialType ? [initialType] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, categoryFilter, selectedBrands, selectedTypes, priceRange, selectedSizes, sortBy]);

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));

  const toggleType = (type: string) =>
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

  const toggleSize = (size: number) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const sizes = [5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">
          {categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : "All Shoes"}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">
          {searchQuery ? `Results for "${searchQuery}"` : categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}'s Shoes` : "All Shoes"}
        </h1>
        <span className="text-sm text-muted-foreground">{filteredProducts.length} results</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm bg-secondary px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="popular">Most Popular</option>
          <option value="new">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="w-60 flex-shrink-0 animate-fade-in">
            {/* Brand */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Brand</h3>
              <div className="flex flex-col gap-2">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-border"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Type</h3>
              <div className="flex flex-col gap-2">
                {shoeTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm cursor-pointer capitalize">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="rounded border-border"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-sm rounded-md border transition-colors ${
                      selectedSizes.includes(size)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-20 px-2 py-1 text-sm bg-secondary rounded border border-border focus:outline-none"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">—</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-20 px-2 py-1 text-sm bg-secondary rounded border border-border focus:outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </aside>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
