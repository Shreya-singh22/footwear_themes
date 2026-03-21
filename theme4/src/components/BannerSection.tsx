"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const BannerSection = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto space-y-6"
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary">
            EXCLUSIVE ACCESS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            JOIN THE
            <br />
            <span className="text-gradient-fire">SOLE FURY</span> CLUB
          </h2>
          <p className="text-muted-foreground text-lg">
            Get early access to drops, exclusive colorways, and members-only pricing. 
            Be the first to cop.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-red-500 shadow-[0_0_10px_rgba(255,0,0,0)] focus:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all duration-300"
            />
            <Button variant="hero" className="px-8 py-3 whitespace-nowrap">
              Join Now
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Early access</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Exclusive drops</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Member-only pricing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
