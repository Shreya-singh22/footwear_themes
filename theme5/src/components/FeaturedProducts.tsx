import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useStoreContext } from "@/contexts/store-context";

const FeaturedProducts = () => {
  const { customization } = useStoreContext();
  const featured = products.slice(0, 6);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'featuredProducts' }, '*');
    }
  };

  const title = customization?.featuredProducts?.title || "Featured Kicks";

  return (
    <section 
      id="products" 
      onClick={handleSectionClick}
      className="py-24 bg-background cursor-pointer"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              Curated for You
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              {title}
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex font-display text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard name={product.name} price={product.price} image={product.images[0]} tag={product.tag} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
