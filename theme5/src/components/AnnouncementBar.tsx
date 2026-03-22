import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useStoreContext } from "@/contexts/store-context";

const AnnouncementBar = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'announcementBar' }, '*');
    }
  };

  const text = customization?.announcementBar?.text || "Limited Time Offer: Get 20% Off on Neo-Glow Series";

  return (
    <div 
      onClick={handleSectionClick}
      className="bg-primary text-primary-foreground py-2 px-4 relative z-[60] cursor-pointer"
    >
      <div className="container mx-auto flex items-center justify-center gap-4 text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.2em]">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3" />
          <span>{text}</span>
        </motion.div>
        <Link to="/shop" className="hidden sm:flex items-center gap-1 hover:underline decoration-2 underline-offset-4">
          Shop Now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;
