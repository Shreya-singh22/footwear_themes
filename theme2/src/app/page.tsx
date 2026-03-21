"use client";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw, Star, ShoppingBag, Zap } from "lucide-react";
import { products, categories, brands, ugcPhotos } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useStoreContext } from "@/contexts/store-context";


export default function Home() {
  const { customization } = useStoreContext();
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section 
        onClick={(e) => {
          if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
          }
        }}
        className="relative h-auto md:min-h-[80vh] flex items-center overflow-hidden bg-[#f6f6f6] py-20 md:pt-32 md:pb-20"
      >
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000 flex flex-col justify-center">
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] md:leading-[0.85] tracking-tighter text-foreground mb-6">
              {customization?.heroSection?.title ? (
                customization.heroSection.title
              ) : (
                <>DEFY THE <br /><span className="text-primary italic">GROUND.</span></>
              )}
            </h1>
            <p className="text-muted-foreground text-lg md:text-2xl mb-8 max-w-md font-medium">
              {customization?.heroSection?.subtitle || "The All-New AeroStride X1 is here. 5000+ styles. 100+ brands."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105">
                <Link href="/products">
                  SHOP THE DROP <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-none border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
                <Link href="/products?filter=new">WATCH THE FILM</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[70vh] animate-in fade-in zoom-in duration-1000 delay-300">
            <Image
              src={customization?.heroSection?.backgroundImage || "/products/nike_air_max_pulse.png"}
              alt="Premium sneakers"
              fill
              unoptimized
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 pointer-events-none"
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-accent/5 rounded-l-full -z-0 blur-3xl" />
      </section>

      {/* Trust Badges Bar */}
      <div className="bg-white border-y border-border py-4 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 flex flex-wrap justify-center md:justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter">
            <Truck className="w-5 h-5 text-primary" />
            <span>Free Shipping (Orders {formatCurrency(5000)}+)</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter">
            <RotateCcw className="w-5 h-5 text-primary" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter">
            <Zap className="w-5 h-5 text-primary" />
            <span>Cloud-Tech Comfort</span>
          </div>
        </div>
      </div>

      {/* Shop by Vibe */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter uppercase">Shop by Vibe</h2>
            <p className="text-muted-foreground text-lg mt-2">Engineered for every environment.</p>
          </div>
          <Link href="/products" className="group text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:text-primary transition-colors">
            See All Styles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary"
            >
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={cat.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{cat.count} STYLES</span>
                <h3 className="font-display text-2xl font-bold text-white uppercase leading-none mb-4">{cat.name}</h3>
                <div className="h-0 group-hover:h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                   <Button variant="secondary" size="sm" className="rounded-none font-bold uppercase tracking-tighter h-10 px-6">
                      Shop Now
                   </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter uppercase">Trending Now</h2>
            <p className="text-muted-foreground text-lg mt-2">The Weekly Heat.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why SoleStyle? (Technology) */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
               src="/products/nike_air_max_pulse.png"
               alt="Shoe technology"
               fill
               className="object-cover"
               onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.src = "/placeholder.svg";
               }}
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9]">Why SoleStyle?</h2>
              <p className="text-muted-foreground text-xl">We're about that technology.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white border border-border hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Zap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-lg">Bio-Flex™ Sole</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">Solo-Flex technology is anatomical, pre-flexed sole that provides extra flexibility and a soft-and-smooth environment.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white border border-border hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Shield className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-lg">ArmorKnit Upper</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">Engineered knit that provides structure where you need it and breathability where you don't. 100% recycled materials.</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="h-14 px-8 rounded-none">
              <Link href="/products">LEARN MORE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* UGC / Instagram Feed */}
      <section className="border-t border-border py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tighter uppercase italic text-primary">#SoleStyleInStyle</h2>
            <p className="text-muted-foreground mt-2 uppercase tracking-widest text-xs font-bold">User-generated photo slots</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
             {ugcPhotos.map((photo, i) => (
                <div key={photo.id} className="relative aspect-square group overflow-hidden bg-secondary">
                  <Image
                    src={photo.image}
                    alt={photo.username}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{photo.username}</span>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Brands Scrolling Band */}
      <section className="py-12 bg-neutral-100 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-scroll items-center gap-12 text-4xl md:text-5xl font-display font-black text-foreground/10 uppercase italic">
          {[0, 1, 2, 3].map((i) => (
            <div key={`brand-group-${i}`} className="flex gap-12 items-center">
              {brands.map((brand, j) => (
                <span key={`brand-${i}-${j}`}>{brand}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
