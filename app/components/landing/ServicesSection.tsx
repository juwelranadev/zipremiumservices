"use client";

import { ArrowUpRight, Play, Music, Youtube, Tv, Lock, Palette, Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    category: "Streaming",
    icon: Tv,
    items: [
      {
        name: "Netflix Premium",
        description: "4K UHD streaming with multiple profiles",
        price: "299",
        originalPrice: "899",
        features: ["4K Ultra HD", "5 Profiles", "Download Support"],
        popular: true,
      },
      {
        name: "YouTube Premium",
        description: "Ad-free videos and YouTube Music",
        price: "199",
        originalPrice: "499",
        features: ["No Ads", "Background Play", "YouTube Music"],
        popular: false,
      },
      {
        name: "Spotify Premium",
        description: "Unlimited music streaming",
        price: "149",
        originalPrice: "399",
        features: ["Ad-free", "Offline Mode", "High Quality"],
        popular: false,
      },
    ],
  },
  {
    category: "Security",
    icon: Lock,
    items: [
      {
        name: "ExpressVPN",
        description: "Fast and secure VPN service",
        price: "399",
        originalPrice: "999",
        features: ["3000+ Servers", "No Logs", "Kill Switch"],
        popular: true,
      },
      {
        name: "NordVPN",
        description: "Advanced security features",
        price: "349",
        originalPrice: "899",
        features: ["5500+ Servers", "Double VPN", "CyberSec"],
        popular: false,
      },
    ],
  },
  {
    category: "Productivity",
    icon: Palette,
    items: [
      {
        name: "Canva Pro",
        description: "Professional design tools",
        price: "249",
        originalPrice: "699",
        features: ["100M+ Templates", "Brand Kit", "Magic Resize"],
        popular: true,
      },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block text-sm text-white/40 uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-responsive-3xl font-bold text-white text-balance">
              Premium services,
              <br />
              <span className="text-white/50">unbeatable prices.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-md leading-relaxed">
            Access the world's best digital services at a fraction of the cost.
            All accounts verified and guaranteed.
          </p>
        </div>

        {/* Services categories */}
        <div className="space-y-16">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              {/* Services grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className={`group relative p-6 rounded-2xl border transition-all duration-500 ${
                      service.popular
                        ? "bg-white/[0.04] border-white/20"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                    }`}
                  >
                    {/* Popular badge */}
                    {service.popular && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                        Most Popular
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {service.name}
                      </h4>
                      <p className="text-sm text-white/40">
                        {service.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-bold text-white">
                        {service.price}
                      </span>
                      <span className="text-sm text-white/40">BDT/month</span>
                      <span className="ml-2 text-sm text-white/30 line-through">
                        {service.originalPrice}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm text-white/60"
                        >
                          <Check className="w-4 h-4 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/sign-up"
                      className={`group/btn w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        service.popular
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Get Started
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/streaming"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            View all services
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
