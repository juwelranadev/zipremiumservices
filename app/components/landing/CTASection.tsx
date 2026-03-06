"use client";

import { ArrowRight, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 p-8 lg:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/60">Start saving today</span>
            </div>

            {/* Headline */}
            <h2 className="text-responsive-3xl font-bold text-white mb-6 text-balance">
              Ready to access premium
              <br />
              <span className="text-white/50">services for less?</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/40 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have switched to ZI
              Premium Services. Get instant access to Netflix, Spotify, YouTube
              Premium, VPNs, and more at unbeatable prices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/sign-up"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-black bg-white rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/live-support"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white/70 bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Sales
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://wa.me/8801733019261"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://t.me/trustedearningsources"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
