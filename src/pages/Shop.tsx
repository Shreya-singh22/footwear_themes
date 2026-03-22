import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, allSizes } from "@/data/products";
import { Slider } from "@/components/ui/slider";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      const matchedCat = categories.find(c => c.toLowerCase() === catParam.toLowerCase());
      if (matchedCat) {
        setSelectedCategory(matchedCat);
        setShowFilters(true);
      }
    }

    const genderParam = searchParams.get("gender");
    if (genderParam) {
      setSelectedGender(genderParam);
      setShowFilters(true);
    }
  }, [searchParams]);

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedGender && p.gender !== selectedGender && p.gender !== "Unisex") return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      return true;
    });
  }, [search, selectedCategory, selectedGender, priceRange, selectedSizes]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedGender(null);
    setPriceRange([0, 300]);
    setSelectedSizes([]);
  };

  const hasFilters = search || selectedCategory || selectedGender || priceRange[0] > 0 || priceRange[1] < 300 || selectedSizes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-primary">Collection</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
                {selectedGender ? `${selectedGender}'s Shoes` : "All Shoes"}
              </h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-lg border transition-all ${showFilters ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border rounded-xl p-6 bg-gradient-card mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-sm font-semibold text-foreground">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline font-body flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-4 gap-8">
                {/* Gender */}
                <div>
                  <label className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Gender</label>
                  <div className="flex flex-wrap gap-2">
                    {["Men", "Women"].map((gen) => (
                      <button
                        key={gen}
                        onClick={() => setSelectedGender(selectedGender === gen ? null : gen)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                          selectedGender === gen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                        }`}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all ${
                          selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                    Price: ₹{priceRange[0]} – ₹{priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val as [number, number])}
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="font-display text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-9 h-9 rounded-lg text-xs font-display font-semibold transition-all ${
                          selectedSizes.includes(size) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <p className="text-sm text-muted-foreground font-body mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-xl font-bold text-foreground mb-2">No shoes found</p>
              <p className="text-muted-foreground font-body text-sm">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p, i) => (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <ProductCard name={p.name} price={p.price} image={p.images[0]} tag={p.tag} index={i} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
