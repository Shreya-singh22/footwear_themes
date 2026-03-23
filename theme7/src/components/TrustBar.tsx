import { Truck, RefreshCw, ShieldCheck, Clock } from "lucide-react";

const trustItems = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over ₹999" },
  { icon: RefreshCw, label: "30-Day Returns", desc: "Hassle-free exchange" },
  { icon: ShieldCheck, label: "Secure Payments", desc: "100% encrypted" },
  { icon: Clock, label: "Premium Quality", desc: "Crafted for comfort" },
];

const TrustBar = () => {
  return (
    <section className="bg-[#E5E2D9]/30 border-y border-[#4A3728]/5">
      <div className="px-6 md:px-12 lg:px-20 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {trustItems.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 group">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#4A3728] shadow-sm group-hover:bg-[#4A3728] group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-widest text-[#4A3728]">{label}</p>
                <p className="text-xs text-[#4A3728]/60 font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
