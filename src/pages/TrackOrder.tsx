import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, truck, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState("");
  const { orders } = useAuth();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!orderId.trim()) {
      setError("Please enter a valid order ID.");
      return;
    }

    const order = orders.find(o => o.id === orderId.trim() || o.id.replace("ORD-", "") === orderId.trim());
    
    if (order) {
      setSearchResult(order);
    } else {
      setError("Order not found. Please check the ID and try again.");
      setSearchResult(null);
    }
  };

  const steps = [
    { label: "Confirmed", status: ["processing", "shipped", "delivered"] },
    { label: "Processing", status: ["processing", "shipped", "delivered"] },
    { label: "Shipped", status: ["shipped", "delivered"] },
    { label: "Delivered", status: ["delivered"] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Track Your Order</h1>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              Enter your order number to see the current status of your shipment.
            </p>
          </div>

          <div className="bg-gradient-card border border-border rounded-3xl p-8 mb-12">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Order Number (e.g. ORD-123456)" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border border-border text-foreground font-body focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow"
              >
                Track Now
              </button>
            </form>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-destructive flex items-center gap-2 text-sm font-body">
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {searchResult && (
              <motion.div 
                key={searchResult.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Status Progress */}
                <div className="bg-gradient-card border border-border rounded-3xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <div>
                      <p className="font-display text-xs tracking-widest uppercase text-primary mb-1">Status</p>
                      <h2 className="font-display text-3xl font-bold text-foreground capitalize">{searchResult.status}</h2>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">Order ID</p>
                      <p className="font-display font-bold text-xl">#{searchResult.id}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between gap-2 max-w-2xl mx-auto">
                    {/* Progress Lines */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-secondary -z-10" />
                    <div 
                      className="absolute top-5 left-0 h-1 bg-primary -z-10 transition-all duration-1000" 
                      style={{ width: `${searchResult.status === "delivered" ? 100 : searchResult.status === "shipped" ? 66 : 33}%` }}
                    />

                    {steps.map((step, i) => {
                      const isActive = step.status.includes(searchResult.status);
                      return (
                        <div key={i} className="flex flex-col items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 scale-100 ${
                            isActive ? "bg-primary border-primary text-primary-foreground" : "bg-secondary border-border text-muted-foreground"
                          }`}>
                            {isActive ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                          </div>
                          <span className={`font-display text-xs font-bold uppercase tracking-wider ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-card border border-border rounded-3xl p-8">
                    <h3 className="font-display text-xl font-bold mb-6">Delivery Details</h3>
                    <div className="space-y-4 font-body text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimate Delivery</span>
                        <span className="text-foreground font-semibold">March 28, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carrier</span>
                        <span className="text-foreground font-semibold">FedEx Express</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tracking Number</span>
                        <span className="text-primary font-bold">FX-782910384</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-card border border-border rounded-3xl p-8">
                    <h3 className="font-display text-xl font-bold mb-6">Shipping Address</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {searchResult.address.name}<br />
                      {searchResult.address.street}<br />
                      {searchResult.address.city}, {searchResult.address.state} {searchResult.address.zip}<br />
                      {searchResult.address.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
