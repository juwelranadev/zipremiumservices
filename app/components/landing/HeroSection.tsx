"use client";

import { ArrowRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/[0.03] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/70">
                Trusted by 10,000+ customers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-responsive-4xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
              <span className="text-white">The complete platform</span>
              <br />
              <span className="text-white">for </span>
              <span className="text-white/60">premium digital</span>
              <br />
              <span className="text-white/60">services.</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/50 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
              Access Netflix, Spotify, YouTube Premium, VPNs, and productivity
              tools at unbeatable prices. Enterprise-grade reliability with
              instant delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animate-delay-300">
              <button
                onClick={() => router.push("/sign-up")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-black bg-white rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  const services = document.getElementById("services");
                  services?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white/70 bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                <Play className="w-5 h-5" />
                Explore Services
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/5 animate-fade-in-up animate-delay-500">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-4">
                Trusted payment methods
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6 text-white/30">
                <span className="text-sm font-medium">bKash</span>
                <span className="text-sm font-medium">Nagad</span>
                <span className="text-sm font-medium">Crypto</span>
                <span className="text-sm font-medium">Bank</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main feature card */}
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-fade-in-right">
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-white/30 font-mono">
                    Live Activity
                  </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">98%</p>
                    <p className="text-sm text-white/40">Instant delivery rate</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">24/7</p>
                    <p className="text-sm text-white/40">Customer support</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">50+</p>
                    <p className="text-sm text-white/40">Premium services</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-white">10K+</p>
                    <p className="text-sm text-white/40">Happy customers</p>
                  </div>
                </div>

                {/* Live orders ticker */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/50 uppercase tracking-wider">
                      Recent orders
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { user: "R***m", service: "Netflix Premium", time: "2m ago" },
                      { user: "F***a", service: "Spotify Premium", time: "5m ago" },
                      { user: "M***i", service: "YouTube Premium", time: "8m ago" },
                    ].map((order, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                            {order.user[0]}
                          </div>
                          <div>
                            <p className="text-white/80">{order.user}</p>
                            <p className="text-xs text-white/40">{order.service}</p>
                          </div>
                        </div>
                        <span className="text-xs text-white/30">{order.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2 animate-float">
                <span className="text-sm text-emerald-400 font-medium">
                  Verified Safe
                </span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 animate-float animate-delay-500">
                <span className="text-sm text-white/60">Instant Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animate-delay-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
