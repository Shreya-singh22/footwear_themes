import { ArrowRight } from "lucide-react";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneakerKids from "@/assets/sneaker-kids.jpg";
import mensCollection from "@/assets/mens-collection-premium.png";
import Image from "next/image";

const categories = [
  { name: "Men", image: mensCollection },
  { name: "Women", image: sneaker2 },
  { name: "Kids", image: sneakerKids },
  { name: "Sale", image: sneaker1, highlight: true },
];

const CategoryPills = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-[#F2F0EA]">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-olive">Exploration</p>
          <h2 className="text-4xl font-display font-bold text-[#4A3728] tracking-tight">
            Shop by Category
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(({ name, image, highlight }) => (
          <a
            key={name}
            href="#"
            className="group relative overflow-hidden rounded-sm aspect-[4/5] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <Image
              src={image}
              alt={`Shop ${name}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-white font-display font-bold text-3xl tracking-tight block">
                    {name}
                  </span>
                  {highlight && (
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F2F0EA]/70">
                      Up to 40% off
                    </span>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryPills;
