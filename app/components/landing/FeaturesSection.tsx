"use client";

import { Shield, Zap, Globe, Lock, Headset, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Get your premium accounts delivered within minutes. Our automated system ensures lightning-fast delivery 24/7.",
  },
  {
    icon: Shield,
    title: "Verified & Secure",
    description:
      "All accounts are thoroughly verified before delivery. We guarantee authenticity and full functionality.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Access premium services from anywhere in the world. No geographic restrictions on your subscriptions.",
  },
  {
    icon: RefreshCcw,
    title: "Replacement Guarantee",
    description:
      "Free replacement if any issues arise. Our commitment to customer satisfaction is unconditional.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your data is encrypted and never shared. We prioritize your privacy and security above all.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support via live chat, WhatsApp, and Telegram. We are always here to help.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block text-sm text-white/40 uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-responsive-3xl font-bold text-white mb-6 text-balance">
            Faster iteration.
            <br />
            <span className="text-white/50">More innovation.</span>
          </h2>
          <p className="text-lg text-white/40 leading-relaxed">
            The platform for rapid progress. Let your team focus on enjoying
            premium services instead of managing subscriptions.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6 group-hover:border-white/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-24 text-center">
          <div className="inline-flex items-center gap-4 p-2 pl-6 rounded-full bg-white/5 border border-white/10">
            <span className="text-sm text-white/60">
              Ready to get started?
            </span>
            <a
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
