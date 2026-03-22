import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex M.",
    rating: 5,
    text: "The Cloud Runner X changed my running game completely. Lightest shoe I've ever worn with insane cushioning.",
    product: "Cloud Runner X",
    avatar: "A",
  },
  {
    name: "Sarah K.",
    rating: 5,
    text: "Obsessed with the Pastel Drift! So comfortable and I get compliments every time I wear them out.",
    product: "Pastel Drift",
    avatar: "S",
  },
  {
    name: "Jordan T.",
    rating: 4,
    text: "The Volt High Pro has incredible ankle support. Perfect for pickup games. Premium quality you can feel.",
    product: "Volt High Pro",
    avatar: "J",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Real Feedback
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed mb-5">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-display text-sm font-bold text-primary-foreground">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="font-body text-xs text-muted-foreground">Bought {review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
