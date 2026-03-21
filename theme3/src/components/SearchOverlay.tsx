"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface SearchOverlayProps {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const suggestions = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 pt-20">
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shoes, brands, styles..."
            className="w-full pl-12 pr-12 py-4 bg-secondary rounded-lg text-lg font-body focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="button" onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="max-w-2xl mx-auto mt-4 bg-card rounded-lg border border-border overflow-hidden">
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-secondary transition-colors text-left"
              >
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{product.brand[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand} · {formatCurrency(product.price)}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length > 1 && suggestions.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
