import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Stay in the Loop
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Get Early Access & <span className="text-gradient-primary">Exclusive Drops</span>
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Be the first to know about new releases, special offers, and member-only deals.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-xl bg-primary/10 border border-primary/30"
            >
              <p className="font-display text-lg font-semibold text-primary">You're in! 🎉</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Watch your inbox for exclusive drops.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:shadow-glow transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
