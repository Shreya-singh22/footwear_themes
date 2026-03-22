import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, Zap } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

const stats = [
  { value: "10K+", label: "Styles Available" },
  { value: "50+", label: "Brand Partners" },
  { value: "2M+", label: "Happy Customers" },
  { value: "24h", label: "Fast Delivery" },
];

const perks = [
  { icon: Truck, text: "Free Shipping Over ₹5000" },
  { icon: Shield, text: "Authentic Guarantee" },
  { icon: RotateCcw, text: "30-Day Returns" },
  { icon: Zap, text: "Express Delivery" },
];

const brands = [
  "STRIDE", "VELOCITY", "AEROFORM", "MOMENTUM", "ZENITH",
  "PRISM", "ECLIPSE", "NEXUS", "APEX", "FLUX",
];

const BrandMarquee = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'brandMarquee' }, '*');
    }
  };

  return (
    <section 
      onClick={handleSectionClick}
      className="py-16 bg-card border-y border-border overflow-hidden cursor-pointer"
    >
      {/* Stats */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling brand ticker */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="mx-8 font-display text-2xl font-bold text-muted-foreground/30 select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div className="container mx-auto px-4 lg:px-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {perks.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-body text-sm text-foreground">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
