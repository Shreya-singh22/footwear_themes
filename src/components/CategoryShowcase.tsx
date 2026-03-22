import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import catRunning from "@/assets/category-running.jpg";
import catBasketball from "@/assets/category-basketball.jpg";
import catLifestyle from "@/assets/category-lifestyle.jpg";
import catPremium from "@/assets/category-premium.jpg";

const categories = [
  { name: "Running", count: "340+ styles", image: catRunning },
  { name: "Basketball", count: "180+ styles", image: catBasketball },
  { name: "Lifestyle", count: "520+ styles", image: catLifestyle },
  { name: "Premium", count: "90+ styles", image: catPremium },
];

const CategoryShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Browse by Style
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Find Your Category
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/shop?category=${cat.name}`}
                className="group relative block aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors text-gradient-primary">
                    {cat.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">{cat.count}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/40 rounded-xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
