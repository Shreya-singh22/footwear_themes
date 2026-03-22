import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const steps = [
  { label: "Shipping", icon: MapPin },
  { label: "Payment", icon: CreditCard },
  { label: "Review", icon: Package },
];

const Checkout = () => {
  const [step, setStep] = useState(0);
  const { items, totalPrice, getProduct, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({ name: "", street: "", city: "", state: "", zip: "", country: "US" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "", cardName: "" });

  const total = totalPrice * 1.08;

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Date.now()}`;
    addOrder({
      id: orderId,
      items: items.map((item) => ({ ...item, product: getProduct(item.productId)! })),
      total,
      status: "processing",
      date: new Date().toISOString().split("T")[0],
      address: { id: `a-${Date.now()}`, ...shipping, isDefault: false },
    });
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate(`/order-confirmation/${orderId}`);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold transition-all ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`hidden sm:block font-display text-sm font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                {i < steps.length - 1 && <div className={`w-12 sm:w-24 h-px mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="shipping" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Shipping Information</h2>
                <input placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className={inputClass} />
                <input placeholder="Street Address" value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} />
                  <input placeholder="State" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="ZIP Code" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className={inputClass} />
                  <input placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className={inputClass} />
                </div>
                <button onClick={() => setStep(1)} className="w-full mt-4 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Payment Details</h2>
                <input placeholder="Cardholder Name" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} className={inputClass} />
                <input placeholder="Card Number" value={payment.card} onChange={(e) => setPayment({ ...payment, card: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className={inputClass} />
                  <input placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className={inputClass} />
                </div>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep(0)} className="flex-1 px-8 py-4 rounded-lg border border-border text-foreground font-display font-semibold text-sm hover:border-primary transition-all">Back</button>
                  <button onClick={() => setStep(2)} className="flex-1 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all">Review Order</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="review" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Review Your Order</h2>
                <div className="border border-border rounded-xl p-6 bg-gradient-card mb-6">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-3">Items</h3>
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <div key={`${item.productId}-${item.size}`} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="font-body text-sm text-foreground">{product.name} (Size {item.size}) × {item.quantity}</span>
                        <span className="font-display text-sm font-semibold text-foreground">₹{(product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between pt-4 font-display font-bold text-foreground text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="border border-border rounded-xl p-4 bg-gradient-card">
                    <h3 className="font-display text-xs uppercase tracking-wider text-primary mb-2">Shipping</h3>
                    <p className="font-body text-sm text-muted-foreground">{shipping.name}<br />{shipping.street}<br />{shipping.city}, {shipping.state} {shipping.zip}</p>
                  </div>
                  <div className="border border-border rounded-xl p-4 bg-gradient-card">
                    <h3 className="font-display text-xs uppercase tracking-wider text-primary mb-2">Payment</h3>
                    <p className="font-body text-sm text-muted-foreground">{payment.cardName}<br />•••• •••• •••• {payment.card.slice(-4)}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 px-8 py-4 rounded-lg border border-border text-foreground font-display font-semibold text-sm hover:border-primary transition-all">Back</button>
                  <button onClick={handlePlaceOrder} className="flex-1 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all">Place Order</button>
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

export default Checkout;
