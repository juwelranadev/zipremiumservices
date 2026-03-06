"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Amazing service! Got my YouTube Premium instantly and it works perfectly. The process was smooth and the customer support was very helpful.",
    author: "Ahmed Rahman",
    role: "Business Owner",
    service: "YouTube Premium",
    rating: 5,
  },
  {
    quote:
      "Great prices and quick delivery. My Canva Pro account is working flawlessly. Highly recommend this service!",
    author: "Fatima Khatun",
    role: "Graphic Designer",
    service: "Canva Pro",
    rating: 5,
  },
  {
    quote:
      "Excellent VPN service at fraction of the cost. The setup was easy and it works perfectly. Would definitely buy again.",
    author: "Mohammad Ali",
    role: "Software Engineer",
    service: "ExpressVPN",
    rating: 5,
  },
  {
    quote:
      "Outstanding service! Got my Spotify Premium account within minutes. The quality is exactly as described.",
    author: "Sara Islam",
    role: "Content Creator",
    service: "Spotify Premium",
    rating: 5,
  },
  {
    quote:
      "Very satisfied with the purchase. The Netflix account works great and the price was unbeatable. Thank you!",
    author: "Rahim Khan",
    role: "Student",
    service: "Netflix Premium",
    rating: 5,
  },
  {
    quote:
      "Been using their services for months now. Reliable, affordable, and great customer support. Highly recommended!",
    author: "Nadia Begum",
    role: "Marketing Manager",
    service: "Multiple Services",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm text-white/40 uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-responsive-3xl font-bold text-white mb-6">
            Loved by customers
            <br />
            <span className="text-white/50">worldwide.</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-white/40">{testimonial.role}</p>
                </div>
              </div>

              {/* Service badge */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-white/30">
                  Purchased: {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-2xl font-bold text-white">4.9 out of 5</p>
            <p className="text-sm text-white/40">Based on 500+ reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
