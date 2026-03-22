import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ChevronLeft, Minus, Plus, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Ruler, Truck, RotateCcw, ShieldCheck, User } from "lucide-react";
import StarRating from "@/components/StarRating";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [localReviews, setLocalReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", author: "" });
  
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLocalReviews([]); // Reset on product change
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const allReviews = [...product.reviews, ...localReviews];
  const avgRating = allReviews.length > 0 ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length : product.rating;
  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("Please select a size"); return; }
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor || product.colors[0] });
    toast.success(`${product.name} added to cart!`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      toast.error("Please fill in all fields");
      return;
    }
    const review = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalReviews([review, ...localReviews]);
    setNewReview({ rating: 5, comment: "", author: "" });
    setShowReviewForm(false);
    toast.success("Review submitted! Thank you for your feedback.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="relative aspect-square rounded-xl bg-secondary/30 border border-border overflow-hidden mb-4 flex items-center justify-center">
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wider">
                    {product.tag}
                  </span>
                )}
                <img src={product.images[selectedImage]} alt={product.name} className="w-4/5 object-contain" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border overflow-hidden flex items-center justify-center bg-secondary/20 transition-all ${
                      selectedImage === i ? "border-primary shadow-glow" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img src={img} alt="" className="w-4/5 object-contain" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="font-display text-xs tracking-[0.3em] uppercase text-primary font-bold">{product.category}</span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-2 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= Math.round(avgRating) ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-body font-medium">({allReviews.length} reviews)</span>
              </div>

              <p className="font-display text-3xl font-bold text-foreground mb-6 transition-all hover:text-primary cursor-default">₹{product.price}</p>

              <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">{product.description}</p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-body font-semibold text-primary">{product.stock <= 10 ? `Only ${product.stock} left!` : "In Stock - Ready to Ship"}</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-sm font-body font-semibold text-destructive">Sold Out</span>
                  </>
                )}
              </div>

              {/* Color */}
              <div className="mb-6">
                <label className="font-display text-sm font-semibold text-foreground mb-3 block">Available Colors</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border text-sm font-body font-medium transition-all ${
                        (selectedColor || product.colors[0]) === color
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground shadow-sm"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <label className="font-display text-sm font-semibold text-foreground mb-3 block">Select Size (US Men)</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border text-sm font-display font-bold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-glow"
                          : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2 text-xs font-display font-bold text-primary mt-4 hover:underline transition-all">
                      <Ruler className="w-3.5 h-3.5" /> View Detailed Size Guide
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-background border-border shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl font-bold text-gradient-primary">Size Comparison Chart</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <table className="w-full text-sm font-body border-collapse">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-widest font-bold">
                            <th className="py-3 text-left">US Size</th>
                            <th className="py-3 text-left">UK Size</th>
                            <th className="py-3 text-left">EU Size</th>
                            <th className="py-3 text-left">CM</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {[
                            { us: "7", uk: "6", eu: "40", cm: "25" },
                            { us: "8", uk: "7", eu: "41", cm: "26" },
                            { us: "9", uk: "8", eu: "42.5", cm: "27" },
                            { us: "10", uk: "9", eu: "44", cm: "28" },
                            { us: "11", uk: "10", eu: "45", cm: "29" },
                            { us: "12", uk: "11", eu: "46", cm: "30" },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-primary/5 transition-colors group">
                              <td className="py-3 font-bold group-hover:text-primary">{row.us}</td>
                              <td className="py-3">{row.uk}</td>
                              <td className="py-3">{row.eu}</td>
                              <td className="py-3 text-muted-foreground">{row.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border">
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          <strong>Pro Tip:</strong> Our performance sneakers run true to size. If you prefer a more relaxed fit or have wider feet, we suggest going up half a size.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg bg-secondary/20 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-display font-bold text-foreground text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={() => { toggleWishlist(product.id); toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    wishlisted 
                      ? "border-destructive text-destructive bg-destructive/10 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]" 
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Shipping & Info */}
              <Accordion type="single" collapsible className="w-full border-t border-border">
                <AccordionItem value="shipping" className="border-b border-border">
                  <AccordionTrigger className="font-display font-bold text-sm hover:no-underline py-5 text-foreground group">
                    <div className="flex items-center gap-3 transition-colors group-hover:text-primary">
                      <Truck className="w-4 h-4 text-primary" /> Shipping & Delivery
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground pb-5 leading-relaxed">
                    Premium standard shipping is complimentary on all luxury orders over ₹5000. Global delivery via DHL/FedEx typically arrives within 3-5 business days. Real-time GPS tracking provided.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns" className="border-b border-border">
                  <AccordionTrigger className="font-display font-bold text-sm hover:no-underline py-5 text-foreground group">
                    <div className="flex items-center gap-3 transition-colors group-hover:text-primary">
                      <RotateCcw className="w-4 h-4 text-primary" /> Hassle-Free Returns
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground pb-5 leading-relaxed">
                    We offer a refined 30-day extended returns policy. Items must be returned in their original, pristine condition. Return shipping is handled by our white-glove courier service.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Reviews Preview */}
              <div className="mt-12 p-6 rounded-xl bg-gradient-card border border-border shadow-soft">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-xl font-bold text-foreground">Customer Experience</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground leading-none">{avgRating.toFixed(1)}</div>
                      <div className="text-[10px] text-muted-foreground font-body uppercase tracking-widest mt-1">Overall Rating</div>
                    </div>
                    <StarRating rating={Math.round(avgRating)} readonly size={24} />
                  </div>
                </div>

                {/* Review Form Toggle */}
                {!showReviewForm ? (
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="w-full py-4 rounded-xl border-2 border-dashed border-primary/20 text-primary font-display font-bold text-sm hover:bg-primary/5 hover:border-primary/40 transition-all mb-8 flex items-center justify-center gap-2"
                  >
                    <Star className="w-4 h-4" /> Share Your Experience
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 rounded-xl bg-background border border-border shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-display text-sm font-bold text-foreground">Write a Review</h4>
                      <button onClick={() => setShowReviewForm(false)} className="text-muted-foreground hover:text-foreground">
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Your Rating</label>
                        <StarRating 
                          rating={newReview.rating} 
                          onRatingChange={(r) => setNewReview({ ...newReview, rating: r })} 
                          size={28}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Your Name</label>
                          <input 
                            type="text" 
                            value={newReview.author}
                            onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                            placeholder="e.g. Alex Smith"
                            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm font-body focus:border-primary outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Your Thoughts</label>
                        <textarea 
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          placeholder="What did you think of the fit and feel?"
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm font-body focus:border-primary outline-none transition-colors resize-none"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm hover:shadow-glow transition-all active:scale-95"
                      >
                        Submit Review
                      </button>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-6">
                  {allReviews.length === 0 ? (
                    <p className="text-center py-8 text-sm text-muted-foreground font-body italic">No reviews yet. Be the first to share your thoughts!</p>
                  ) : (
                    allReviews.map((review) => (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        key={review.id} 
                        className="pb-6 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-display text-sm font-bold text-foreground leading-tight">{review.author}</div>
                              <div className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mt-0.5">{review.date}</div>
                            </div>
                          </div>
                          <StarRating rating={review.rating} readonly size={12} />
                        </div>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed pl-[52px]">"{review.comment}"</p>
                      </motion.div>
                    ))
                  )}
                  {allReviews.length > 2 && !showReviewForm && (
                     <p className="text-center text-[10px] text-muted-foreground font-body uppercase tracking-widest mt-4">Showing all {allReviews.length} reviews</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products Section */}
          <div className="mt-32 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <span className="font-display text-xs font-bold tracking-[0.3em] uppercase text-primary">Curated for You</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">You May Also Like</h2>
              <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {related.map((p, i) => (
                <Link to={`/product/${p.id}`} key={p.id} className="group">
                  <ProductCard name={p.name} price={p.price} image={p.images[0]} tag={p.tag} index={i} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
