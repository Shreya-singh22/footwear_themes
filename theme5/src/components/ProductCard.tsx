import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  tag?: string;
  index: number;
}

const ProductCard = ({ name, price, image, tag, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-glow"
    >
      {tag && (
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-display font-bold uppercase tracking-wider">
          {tag}
        </span>
      )}

      <div className="relative aspect-square p-6 flex items-center justify-center overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-4/5 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]"
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">{name}</h3>
          <p className="font-body text-muted-foreground text-sm mt-0.5">₹{price}</p>
        </div>
        <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
