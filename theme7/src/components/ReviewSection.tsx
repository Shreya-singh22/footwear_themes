"use client";

import { Review } from "@/data/products";
import { Star, ShieldCheck, User } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  count: number;
}

export default function ReviewSection({ reviews, rating, count }: ReviewSectionProps) {
  return (
    <section className="py-24 border-t border-[#4A3728]/10">
      <div className="flex flex-col md:flex-row gap-16 md:gap-32">
        {/* Left: Summary */}
        <div className="md:w-1/3 space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.5em] text-olive">Social Proof</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-[#4A3728] tracking-tighter leading-none">
              Client <br /> Feedback.
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-end gap-4">
              <span className="text-7xl font-display font-bold text-[#4A3728] leading-none">{rating.toFixed(1)}</span>
              <div className="flex flex-col gap-1 pb-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "fill-[#4A3728] text-[#4A3728]" : "text-[#4A3728]/20"}`} />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/40">Based on {count} reviews</span>
              </div>
            </div>
            
            <p className="text-sm font-medium text-[#4A3728]/60 leading-relaxed italic">
              "Stride footwear consistently delivers on its promise of editorial aesthetics merged with uncompromising comfort."
            </p>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="flex-1 space-y-12">
          {reviews.map((review) => (
            <div key={review.id} className="group space-y-6 pb-12 border-b border-[#4A3728]/5 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E5E2D9] flex items-center justify-center text-[#4A3728]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#4A3728]">{review.user}</h4>
                      {review.verified && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-olive/10 text-olive rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-[#4A3728]/40 uppercase tracking-widest mt-1">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#4A3728] text-[#4A3728]" : "text-[#4A3728]/20"}`} />
                  ))}
                </div>
              </div>
              
              <p className="text-[#4A3728] text-lg font-medium leading-relaxed max-w-2xl">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
