"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";

interface PremiumHeaderProps {
  scrolled: boolean;
}

const navLinks = [
  { name: "Products", href: "#services" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#services" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function PremiumHeader({ scrolled }: PremiumHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <img
                src="/zi-logo.svg"
                alt="ZI Premium Services"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-lg lg:text-xl font-semibold tracking-tight">
              <span className="text-white">ZI</span>
              <span className="text-white/60 ml-1">Premium</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => router.push("/sign-in")}
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 text-lg text-white/70 hover:text-white transition-colors border-b border-white/5"
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-white/30" />
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                router.push("/sign-in");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-white/70 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                router.push("/sign-up");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-black bg-white rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
