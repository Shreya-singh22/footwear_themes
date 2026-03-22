import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-card border border-border rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 border border-primary/30">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="font-display text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="font-body text-muted-foreground text-lg mb-8">
              Thank you for your purchase. Your order <span className="text-foreground font-bold font-display">#{id || "ORD-0000"}</span> has been placed and is being processed.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border text-left">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <Package className="w-5 h-5" />
                  <h3 className="font-display font-bold">Preparation</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  We're getting your items ready for shipment. You'll receive an email shortly.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border text-left">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-display font-bold">What's Next?</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  You can track your order status in your account dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/account" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow hover:scale-[1.02]">
                  View My Orders
                </button>
              </Link>
              <Link to="/shop" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-full border border-border text-foreground font-display font-semibold transition-all hover:bg-secondary">
                  Continue Shopping <ArrowRight className="ml-2 w-4 h-4 inline" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
