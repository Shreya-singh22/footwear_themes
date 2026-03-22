import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, LogOut, Plus, Trash2, ChevronRight, ArrowLeft, Truck, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";
import { toast } from "sonner";

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

const Account = () => {
  const { user, login, signup, logout, orders, addresses, addAddress, removeAddress } = useAuth();
  const { items: wishlistIds } = useWishlist();
  const [activeTab, setActiveTab] = useState("orders");
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const navigate = useNavigate();

  // Auth form
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 flex justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md border border-border rounded-xl p-8 bg-gradient-card">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="font-body text-sm text-muted-foreground mb-8">{isLogin ? "Sign in to your STRIDE account" : "Join STRIDE today"}</p>
            <div className="space-y-4">
              {!isLogin && (
                <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
              )}
              <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
              <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
              <button
                onClick={() => {
                  if (isLogin) { login(form.email, form.password); toast.success("Welcome back!"); }
                  else { signup(form.name, form.email, form.password); toast.success("Account created!"); }
                }}
                className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:shadow-glow transition-all"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>
            <p className="text-center mt-6 font-body text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">{isLogin ? "Sign Up" : "Sign In"}</button>
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="font-body text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button onClick={() => { logout(); toast.success("Signed out"); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors font-body">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-display text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-center py-16 text-muted-foreground font-body">No orders yet.</p>
              ) : selectedOrder ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline font-body">
                    <ArrowLeft className="w-4 h-4" /> Back to all orders
                  </button>
                  <div className="bg-gradient-card border border-border rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-8 border-b border-border">
                      <div>
                        <p className="font-display text-xs tracking-widest uppercase text-primary mb-1">Order Status</p>
                        <h2 className="font-display text-2xl font-bold capitalize">{selectedOrder.status}</h2>
                      </div>
                      <div className="md:text-right">
                        <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">Order ID</p>
                        <p className="font-display font-bold text-lg">#{selectedOrder.id}</p>
                        <p className="font-body text-xs text-muted-foreground mt-1">{selectedOrder.date}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" /> Items
                        </h3>
                        <div className="space-y-4">
                          {selectedOrder.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-16 h-16 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0">
                                <img src={item.product.images[0]} alt="" className="w-4/5 h-4/5 object-contain" />
                              </div>
                              <div className="flex-1">
                                <p className="font-display font-bold text-sm">{item.product.name}</p>
                                <p className="text-xs text-muted-foreground font-body">Size: {item.size} | Qty: {item.quantity}</p>
                              </div>
                              <p className="font-display font-bold text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-border space-y-3">
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground font-semibold">₹{(selectedOrder.total / 1.08).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-muted-foreground">Tax (8%)</span>
                            <span className="text-foreground font-semibold">₹{(selectedOrder.total - selectedOrder.total / 1.08).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xl font-display font-bold pt-4 text-primary">
                            <span>Total</span>
                            <span>₹{selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-primary" /> Shipping Address
                          </h3>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed">
                            {selectedOrder.address.name}<br />
                            {selectedOrder.address.street}<br />
                            {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zip}<br />
                            {selectedOrder.address.country}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                          </h3>
                          <p className="font-body text-sm text-muted-foreground">Credit Card ending in •••• 4242</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                          <h4 className="font-display font-bold text-sm mb-2 text-primary">Need Help?</h4>
                          <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">If you have any questions regarding this order, please visit our FAQ or contact support.</p>
                          <Link to="/faq" className="text-xs font-display font-bold text-primary hover:underline">Support Center</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <button 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className="w-full text-left group border border-border rounded-xl p-6 bg-gradient-card transition-all hover:border-primary hover:shadow-glow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-bold text-foreground">#{order.id}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider ${
                            order.status === "delivered" ? "bg-primary/20 text-primary" : order.status === "shipped" ? "bg-accent/20 text-accent" : "bg-secondary text-secondary-foreground"
                          }`}>{order.status}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-body text-xs text-muted-foreground italic mb-1">{order.date}</p>
                          <p className="font-body text-sm font-medium text-foreground">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                        </div>
                        <p className="font-display text-xl font-bold text-foreground">₹{order.total.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            wishlistProducts.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-lg font-bold text-foreground mb-2">No saved items</p>
                <Link to="/shop" className="text-primary hover:underline font-body text-sm">Browse the shop</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlistProducts.map((p, i) => (
                  <Link to={`/product/${p.id}`} key={p.id}>
                    <ProductCard name={p.name} price={p.price} image={p.images[0]} tag={p.tag} index={i} />
                  </Link>
                ))}
              </div>
            )
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-border rounded-xl p-6 bg-gradient-card relative">
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-display font-bold uppercase">Default</span>
                  )}
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">{addr.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{addr.street}<br />{addr.city}, {addr.state} {addr.zip}<br />{addr.country}</p>
                  <button onClick={() => { removeAddress(addr.id); toast.success("Address removed"); }} className="mt-4 text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => { addAddress({ id: `a-${Date.now()}`, name: "New Address", street: "", city: "", state: "", zip: "", country: "US" }); toast.success("Address added — edit details"); }}
                className="border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Plus className="w-6 h-6" />
                <span className="font-display text-sm font-semibold">Add Address</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
