"use client";

import Link from "next/link";
import { Facebook, Instagram, Send, ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: {
    title: "Services",
    links: [
      { name: "Netflix Premium", href: "/products/netflix" },
      { name: "YouTube Premium", href: "/products/youtube" },
      { name: "Spotify Premium", href: "/products/spotify" },
      { name: "Canva Pro", href: "/products/canva" },
      { name: "VPN Services", href: "/products/vpn" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Contact", href: "/contact-us" },
      { name: "Live Support", href: "/live-support" },
      { name: "Airdrop", href: "/airdrop" },
      { name: "Trade", href: "/trade" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Refund Policy", href: "/terms-of-service" },
    ],
  },
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/zikrulislam.juwel",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/zikrulislam.juwel",
    icon: Instagram,
  },
  {
    name: "Telegram",
    href: "https://t.me/trustedearningsources",
    icon: Send,
  },
];

export default function PremiumFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                src="/zi-logo.svg"
                alt="ZI Premium Services"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold">
                <span className="text-white">ZI</span>
                <span className="text-white/60 ml-1">Premium</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed max-w-sm mb-8">
              Premium digital services at unbeatable prices. Trusted by
              thousands of customers worldwide with instant delivery and 24/7
              support.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {year} ZI Premium Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20">
              Secure Payments
            </span>
            <span className="text-xs text-white/20">
              Instant Delivery
            </span>
            <span className="text-xs text-white/20">
              24/7 Support
            </span>
          </div>
        </div>

        {/* Credit */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">
            Crafted by{" "}
            <a
              href="https://t.me/zikrulislamjuwel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              MD ZIKRUL ISLAM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
