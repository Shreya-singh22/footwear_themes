"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Truck, CreditCard, Check, ShieldCheck, Lock, ChevronRight, AlertCircle, Phone, User, Home, Building2, Package, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const steps = [
  { id: "customer", label: "Information", icon: User },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
] as const;

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    suite: "",
    city: "",
    state: "",
    pincode: "",
    saveInfo: true
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length, router]);

  if (cart.length === 0) return null;

  const shipPrice = shippingMethod === "standard" ? 0 : shippingMethod === "express" ? 199 : 499;
  const finalTotal = cartTotal + shipPrice;

  const handlePlaceOrder = () => {
    const orderId = `SS${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    clearCart();
    toast.success(`Order #${orderId} Placed!`, {
      description: "You'll receive a confirmation email shortly.",
    });
    router.push("/");
  };

  const Summary = () => (
    <div className="space-y-6">
      <div className="rounded-none border border-border bg-card/50 p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-foreground border-b border-border pb-4">
          Order Summary
        </h3>
        <div className="space-y-4">
          {cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return null;
            return (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-secondary">
                  <img src={product.colors[0].images[0]} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none mb-1">{product.brand}</p>
                  <p className="text-xs font-bold text-foreground line-clamp-1">{product.name}</p>
                  <p className="mt-1 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <p className="text-xs font-black text-foreground">₹{(product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-3 border-t border-border pt-6">
          <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-foreground">₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span>Shipping</span>
            <span className="text-primary">{shipPrice === 0 ? "FREE" : `₹${shipPrice}`}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-4">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Total</span>
            <span className="text-lg font-black text-foreground">₹{finalTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="rounded-none border border-border border-dashed p-6">
        <div className="flex items-center gap-3 text-primary mb-4">
          <Lock className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
        </div>
        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed mb-6">
          Your personal data will be used to process your order, support your experience throughout this website.
        </p>
        <div className="grid grid-cols-2 gap-4 grayscale opacity-60">
          <div className="flex items-center justify-center border border-border py-2 px-3 grayscale">
             <ShieldCheck className="h-4 w-4 mr-2" />
             <span className="text-[8px] font-bold uppercase tracking-tighter">Norton SECURE</span>
          </div>
          <div className="flex items-center justify-center border border-border py-2 px-3 grayscale">
             <Lock className="h-4 w-4 mr-2" />
             <span className="text-[8px] font-bold uppercase tracking-tighter">SSL INSURED</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Slim Header */}
      <div className="border-b border-border bg-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-black uppercase tracking-tighter">
            Style<span className="text-primary">Sanctuary</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Encrypted Connection</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Step Indicators */}
            <div className="mb-12 flex items-center justify-start gap-4">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-4 group">
                  <div className={`flex flex-col gap-1 transition-all duration-300 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Step 0{i + 1}</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-border" />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-10">
                    <section>
                      <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-black uppercase tracking-tight text-foreground">
                        <User className="h-5 w-5 text-primary" /> Customer Info
                      </h2>
                      <div className="grid gap-4">
                        <div className="relative group">
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                           <input
                            type="text"
                            placeholder="First Name"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                          />
                           <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="tel"
                            placeholder="Mobile Number"
                            className="w-full rounded-none border border-border bg-white p-4 pl-12 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-black uppercase tracking-tight text-foreground">
                        <MapPin className="h-5 w-5 text-primary" /> Delivery Address
                      </h2>
                      <div className="grid gap-4">
                        <input
                          placeholder="Street Address"
                          className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                          value={formData.address}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                        <input
                          placeholder="Apartment, suite, etc. (optional)"
                          className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                          value={formData.suite}
                          onChange={e => setFormData({ ...formData, suite: e.target.value })}
                        />
                        <div className="grid gap-4 md:grid-cols-3">
                          <input
                            placeholder="City"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                          />
                          <input
                            placeholder="State"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value })}
                          />
                          <input
                            placeholder="PIN Code"
                            className="w-full rounded-none border border-border bg-white p-4 text-xs font-bold uppercase tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            value={formData.pincode}
                            onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                          />
                        </div>
                      </div>
                    </section>

                    <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between border-t border-border">
                      <Link href="/cart" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-3 w-3" /> Back to Cart
                      </Link>
                      <Button onClick={() => setStep(1)} className="rounded-none h-14 px-10 text-xs font-black uppercase tracking-[0.2em]" size="lg">
                        Continue to Shipping
                      </Button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-10">
                    <section>
                      <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-black uppercase tracking-tight text-foreground">
                        <Truck className="h-5 w-5 text-primary" /> Delivery Method
                      </h2>
                      <div className="grid gap-4">
                        {[
                          { id: "standard", label: "Standard Sanctuary", desc: "4-7 Business Days", price: "Free", icon: Package },
                          { id: "express", label: "Express Priority", desc: "2-3 Business Days", price: "₹199", icon: Truck },
                          { id: "overnight", label: "Midnight Dash", desc: "Before 12 PM Tomorrow", price: "₹499", icon: ShieldCheck },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setShippingMethod(opt.id)}
                            className={`group flex w-full items-center justify-between border p-6 transition-all duration-300 ${shippingMethod === opt.id ? "border-primary bg-white shadow-xl translate-x-1" : "border-border bg-white/50 grayscale hover:grayscale-0"}`}
                          >
                            <div className="flex items-center gap-6">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-sm transition-colors ${shippingMethod === opt.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
                                <opt.icon className="h-6 w-6" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-black uppercase tracking-widest text-foreground">{opt.label}</p>
                                <p className="text-[10px] font-medium text-muted-foreground lowercase mt-0.5">{opt.desc}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-primary">{opt.price}</span>
                          </button>
                        ))}
                      </div>
                    </section>

                    <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between border-t border-border">
                      <button onClick={() => setStep(0)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-3 w-3" /> Back to Information
                      </button>
                      <Button onClick={() => setStep(2)} className="rounded-none h-14 px-10 text-xs font-black uppercase tracking-[0.2em]" size="lg">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10">
                    <section>
                      <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-black uppercase tracking-tight text-foreground">
                        <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                      </h2>
                      <div className="grid gap-4">
                        {[
                          { id: "upi", label: "Unified Payments Interface (UPI)", desc: "Secure Instant Pay", icons: ["GPay", "PhonePe"] },
                          { id: "card", label: "Credit / Debit Card", desc: "Safe encryption via Stripe", icons: ["Visa", "MC"] },
                          { id: "cod", label: "Cash on Delivery", desc: "Pay at your doorstep", icons: ["Cash"] },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setPaymentMethod(opt.id)}
                            className={`group flex w-full items-center gap-6 border p-6 transition-all duration-300 ${paymentMethod === opt.id ? "border-primary bg-white shadow-xl" : "border-border bg-white/50 grayscale hover:grayscale-0"}`}
                          >
                            <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${paymentMethod === opt.id ? "border-primary bg-primary" : "border-border"}`}>
                              {paymentMethod === opt.id && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="text-left flex-1">
                              <p className="text-xs font-black uppercase tracking-widest text-foreground">{opt.label}</p>
                              <p className="text-[10px] font-medium text-muted-foreground lowercase mt-0.5">{opt.desc}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {opt.icons.map(icon => (
                                <span key={icon} className="text-[8px] font-black uppercase tracking-tighter border border-border px-1.5 py-0.5 rounded-sm opacity-60">{icon}</span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>

                    <div className="rounded-none bg-primary/5 p-6 border border-primary/20 flex gap-4">
                      <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Final Review</p>
                        <p className="text-[10px] font-medium leading-relaxed text-muted-foreground">
                          By clicking "Complete Order", you agree to our Terms of Sanctuary and Privacy Policy. All transactions are securely processed and encrypted.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between border-t border-border">
                      <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-3 w-3" /> Back to Shipping
                      </button>
                      <Button onClick={handlePlaceOrder} className="rounded-none h-14 px-10 text-xs font-black uppercase tracking-[0.2em]" size="lg">
                        Complete Sanctuary Order
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:block">
            <div className="sticky top-24">
              <Summary />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
