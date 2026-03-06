"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Shield,
  Zap,
  Globe,
  Play,
  Palette,
  Lock,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Copy,
  CheckCircle2,
  MoreHorizontal,
  Sun,
  Moon,
  User,
  LogOut,
  History,
  Notebook,
  Home,
  MessageCircle,
  Send,
  QrCode,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Check,
  Headset,
  Gift,
  ArrowLeftRight,
  Repeat,
  Coins,
  BookOpen,
} from "lucide-react";

import Header from "./Header";
import ProductCard from "./ProductCard";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import MaintenanceBar from "./MaintenanceBar";
import EnhancedAlert, { AlertConfig } from "./EnhancedAlert";
import PromoMarquee from "./Marquee";
import HeroSection from "./HeroSection";
import RatingSection from "./RatingSection";
import { useShopContext } from "../context/ShopContext";
import { categories, allProducts, socialServices } from "../shopData";
import { navItems, tokenOptions, networkOptions } from "../constants/navigation";
import type { Product, Order, CartItem, Review } from "../types";


export default function MainShop({ categorySlug = "all" }: { categorySlug?: string }) {
  const router = useRouter();
  const {
    cart, setCart, addToCart, removeFromCart, getTotalPrice, getTotalItems,
    isCartOpen, setIsCartOpen,
    view, setView,
    paymentMethod, setPaymentMethod,
    cryptoCurrency, setCryptoCurrency,
    paymentType, setPaymentType,
    selectedNetwork, setSelectedNetwork,
    selectedPlatform, setSelectedPlatform,
    payerNumber, setPayerNumber,
    trxId, setTrxId,
    lastAddedProductId,
    orders, setOrders,
    copiedAddress, setCopiedAddress,
    selectedOrder, setSelectedOrder,
    isLoggedIn, setIsLoggedIn,
    showSignInModal, setShowSignInModal,
    showSignUpModal, setShowSignUpModal,
    isLoading, setIsLoading,
    menuOpen, setMenuOpen,
    theme, toggleTheme,
    username,
    handleSignIn,
    handleSignUp,
    alertConfig,
    setAlertConfig,
    showAlert
  } = useShopContext();

  const slugData = categories.find(c => (c.name === "All" ? "all" : c.name.toLowerCase().replace(/\s+/g, '-')) === categorySlug);
  const selectedCategory = slugData ? slugData.name : "All";

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Ahmed Rahman",
      rating: 5,
      comment: "Amazing service! Got my YouTube Premium instantly and it works perfectly. The process was smooth and the customer support was very helpful.",
      date: "2024-01-15",
      helpful: 24,
      verified: true,
      service: "YouTube Premium",
    },
    {
      id: "2",
      userName: "Fatima Khatun",
      rating: 5,
      comment: "Great prices and quick delivery. My Canva Pro account is working flawlessly. Highly recommend this service!",
      date: "2024-01-12",
      helpful: 18,
      verified: true,
      service: "Canva Pro",
    },
    {
      id: "3",
      userName: "Mohammad Ali",
      rating: 4,
      comment: "Excellent VPN service at fraction of the cost. The setup was easy and it works perfectly. Would definitely buy again.",
      date: "2024-01-08",
      helpful: 15,
      verified: false,
      service: "ExpressVPN",
    },
    {
      id: "4",
      userName: "Sara Islam",
      rating: 5,
      comment: "Outstanding service! Got my Spotify Premium account within minutes. The quality is exactly as described.",
      date: "2024-01-05",
      helpful: 12,
      verified: true,
      service: "Spotify Premium",
    },
    {
      id: "5",
      userName: "Rahim Khan",
      rating: 5,
      comment: "Very satisfied with the purchase. The Netflix account works great and the price was unbeatable. Thank you!",
      date: "2024-01-03",
      helpful: 9,
      verified: true,
      service: "Netflix",
    },
  ]);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const menuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll visibility and progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Quick Order form state
  const [qName, setQName] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qText, setQText] = useState("");
  const [qSending, setQSending] = useState(false);
  const [qFeedback, setQFeedback] = useState<
    null | { type: "success" | "error"; message: string }
  >(null);

  const [isSideSliderOpen, setIsSideSliderOpen] = useState(false);
  const sideSliderRef = useRef<HTMLDivElement>(null);

  // Close side slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideSliderRef.current && !sideSliderRef.current.contains(event.target as Node)) {
        setIsSideSliderOpen(false);
      }
    };
    if (isSideSliderOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideSliderOpen]);


  // Web3 P2P Fee form state
  const [web3Form, setWeb3Form] = useState({
    token: '',
    network: '',
    amount: '',
    walletAddress: '',
  });
  const [web3FormErrors, setWeb3FormErrors] = useState<{
    token?: string;
    network?: string;
    amount?: string;
    walletAddress?: string;
  }>({});

  // Web3 form validation
  const validateWeb3Form = () => {
    const errors: typeof web3FormErrors = {};

    if (!web3Form.token) {
      errors.token = 'Please select a token';
    }

    if (!web3Form.network) {
      errors.network = 'Please select a network';
    }

    if (!web3Form.amount) {
      errors.amount = 'Please enter an amount';
    } else {
      const amount = parseFloat(web3Form.amount);
      if (isNaN(amount) || amount < 0.10) {
        errors.amount = 'Minimum amount is $0.10';
      }
    }

    if (!web3Form.walletAddress) {
      errors.walletAddress = 'Please enter your wallet address';
    } else if (web3Form.walletAddress.length < 26) {
      errors.walletAddress = 'Please enter a valid wallet address';
    }

    setWeb3FormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWeb3FormChange = (field: keyof typeof web3Form, value: string) => {
    setWeb3Form(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (web3FormErrors[field]) {
      setWeb3FormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleWeb3FormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateWeb3Form()) {
      // Web3 P2P Fee Request

      // Add P2P fee product to cart with custom amount
      const p2pProduct = {
        id: 999,
        name: `P2P Fee - ${web3Form.token} on ${web3Form.network}`,
        description: `P2P trading fee payment: ${web3Form.amount} USD`,
        price: parseFloat(web3Form.amount),
        originalPrice: parseFloat(web3Form.amount),
        category: "Trade",
        icon: <Wallet className="w-6 h-6 text-blue-500" />,
        features: ["Instant processing", "Secure payment", "24/7 support"],
        rating: 5.0,
        reviews: 1000,
      };
      addToCart(p2pProduct);

      // Open cart
      setIsCartOpen(true);

      // Reset form
      setWeb3Form({ token: '', network: '', amount: '', walletAddress: '' });
      setWeb3FormErrors({});
    }
  };

  const handleReviewSubmit = async (newReview: Omit<Review, "id" | "date" | "helpful">) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    
    setReviews(prev => [review, ...prev]);
    
    showAlert(
      'success',
      'Review Submitted!',
      'Thank you for your review! It has been published successfully.'
    );
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // Auto-close hamburger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);


  // Send Quick Order message to Telegram
  const sendQuickOrder = async () => {
    setQFeedback(null);
    const isValidBDPhoneStrict = /^\+8801[3-9]\d{8}$/.test(qPhone);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(qEmail);
    if (!qName || !qEmail || !qPhone || !qText) {
      setQFeedback({
        type: "error",
        message:
          "All fields are required. Please fill in Name, Email, Phone, and Message.",
      });
      return;
    }
    if (!isValidEmail) {
      setQFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!isValidBDPhoneStrict) {
      setQFeedback({
        type: "error",
        message:
          "Please enter a valid Bangladeshi phone number in +880 format (e.g., +8801XXXXXXXXX).",
      });
      return;
    }
    const token =
      (process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string | undefined) ||
      "8142852929:AAGZqHy3tH84iApseliA1ByZh-3-QGSJ1OI";
    const chatId =
      (process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID as string | undefined) ||
      "6789527271";
    if (!token || !chatId) {
      setQFeedback({
        type: "error",
        message:
          "Telegram configuration missing. Please set NEXT_PUBLIC_TELEGRAM_BOT_TOKEN and NEXT_PUBLIC_TELEGRAM_CHAT_ID.",
      });
      return;
    }
    // Build Telegram payload and send via a CORS-friendly proxy
    const text = `New Quick Order\nName: ${qName}\nEmail: ${qEmail}\nPhone: ${qPhone}\nMessage: ${qText}`;
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const proxyUrl = `https://cors.isomorphic-git.org/${tgUrl}`;
    try {
      setQSending(true);
      const endpoints = [
        proxyUrl,
        `https://thingproxy.freeboard.io/fetch/${tgUrl}`,
      ];
      let ok = false;
      let lastStatus = 0;
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
          });
          lastStatus = res.status;
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.ok) {
            ok = true;
            break;
          }
        } catch (_) {
          // Try next endpoint
        }
      }
      if (!ok) {
        const beacon = new Image();
        const beaconUrl = `${tgUrl}?chat_id=${encodeURIComponent(
          chatId
        )}&text=${encodeURIComponent(text)}`;
        beacon.src = beaconUrl;
        if (lastStatus === 404) {
          throw new Error("404");
        }
        setQFeedback({
          type: "success",
          message: "Your message has been sent successfully.",
        });
      } else {
        setQFeedback({
          type: "success",
          message: "Your message has been sent successfully.",
        });
      }
      setQName("");
      setQEmail("");
      setQPhone("");
      setQText("");
    } catch (e) {
      const whatsAppNumber = "01733019261";
      const encoded = encodeURIComponent(
        `Hello, I couldn't send the Quick Order via the website.\nName: ${qName}\nEmail: ${qEmail}${qPhone ? `\nPhone: ${qPhone}` : ""
        }\nMessage: ${qText}`
      );
      const waLink = `https://wa.me/88${whatsAppNumber}?text=${encoded}`;
      const msg =
        (e as Error)?.message === "404"
          ? `Telegram returned 404 Not Found. Please verify the Bot Token and Chat ID. Or contact on <a class="underline" href="${waLink}" target="_blank" rel="noreferrer">WhatsApp</a>.`
          : `Failed to send. Please try again, or contact on <a class="underline" href="${waLink}" target="_blank" rel="noreferrer">WhatsApp</a>.`;
      setQFeedback({ type: "error", message: msg });
    } finally {
      setQSending(false);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-gray-100 transition-colors">

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 z-[100] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Live Support Floating Button - Right Side Bottom */}
      <a
        href="/live-support"
        className="fixed right-0 z-50 group scale-90 sm:scale-100"
        style={{ right: '-18px', bottom: '-22px' }}
        aria-label="Live Support Chat"
      >
        <div className="relative flex items-center justify-center">
          {/* Main Button */}
          <div className="relative w-32 h-32 flex items-center justify-center hover:scale-105 transition-all duration-300">

            {/* Custom Icon */}
            <Image 
              src="/images/live-button-floating.png" 
              alt="Live Support" 
              width={112}
              height={112}
              className="w-28 h-28 object-contain"
              loading="lazy"
            />

          </div>

          {/* Expandable text on hover - Now to the LEFT */}
          <div className="absolute z-50 min-w-max right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg
                    opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap font-medium text-sm">
            Support
          </div>
        </div>
      </a>


      {/* SIDE SLIDER SYSTEM — Triggered from left edge (Mobile/Tablet only) */}
      <div
        ref={sideSliderRef}
        className={`fixed left-0 top-0 h-full w-[280px] sm:w-[320px] bg-black/60 backdrop-blur-2xl border-r border-white/10 z-30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col xl:hidden ${isSideSliderOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header Spacer — Ensures slider content starts below the header while the background remains flush */}
        <div className="h-[56px] sm:h-[64px] flex-shrink-0" />

        <div className="flex-1 overflow-y-auto p-2 space-y-6 custom-scrollbar">
          {/* Main Navigation */}
          <div className="space-y-3">
            {[
              { name: "Airdrop", icon: <Gift className="w-5 h-5" />, badge: "New", color: "from-pink-500 to-rose-500", desc: "Latest rewards", slug: "airdrop" },
              { name: "Trade", icon: <ArrowLeftRight className="w-5 h-5" />, badge: "Pro", color: "from-blue-500 to-cyan-500", desc: "Exchange assets", slug: "trade" },
              { name: "Buy / Sell", icon: <Repeat className="w-5 h-5" />, badge: "Safe", color: "from-green-500 to-emerald-500", desc: "Instant crypto", slug: "trade" },
              { name: "Crypto", icon: <Coins className="w-5 h-5" />, badge: "Hot", color: "from-yellow-400 to-orange-500", desc: "Top tokens", slug: "all" },
              { name: "Blogs", icon: <BookOpen className="w-5 h-5" />, badge: "Read", color: "from-purple-500 to-indigo-500", desc: "Market news", slug: "all" },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  router.push(item.slug === "all" ? "/" : `/${item.slug}`);
                  setIsSideSliderOpen(false);
                  window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
                }}
                className="w-full group relative flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-400"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="text-white scale-90">{item.icon}</div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-white font-bold text-xs truncate">{item.name}</p>
                  </div>
                  <p className="text-white/40 text-[9px] truncate group-hover:text-white/60 transition-colors uppercase tracking-wider">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* Mirroring Bottom Content from Desktop Sidebar */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Live Order Ticker */}
            <div className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-white/50 text-[9px] font-bold tracking-wider uppercase">Live Activity</span>
              </div>
              <div className="overflow-hidden h-[48px] relative">
                <div className="animate-[slideUp_8s_linear_infinite]">
                  {[
                    { user: "R***m", service: "Airdrop Claimed", time: "2m", flag: "🎁" },
                    { user: "F***a", service: "Asset Traded", time: "5m", flag: "🔄" },
                    { user: "M***i", service: "Crypto Bought", time: "8m", flag: "🪙" },
                  ].map((order, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs">{order.flag}</span>
                        <div className="min-w-0">
                          <span className="text-white/70 text-[9px] font-semibold truncate block">{order.user}</span>
                          <span className="text-purple-300/60 text-[8px] truncate block">{order.service}</span>
                        </div>
                      </div>
                      <span className="text-white/20 text-[8px] flex-shrink-0">{order.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Trust Badges */}
            <div className="grid grid-cols-2 gap-2">
              {/* Safe Badge */}
              <div className="group relative flex flex-col items-center gap-0.5 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-green-400/30 hover:bg-green-400/5 transition-all duration-500 cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer-slide_1s_ease-in-out]" />
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <Shield className="w-3.5 h-3.5 text-green-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-white/40 group-hover:text-green-300/90 text-[8px] font-bold text-center leading-tight uppercase tracking-tighter">Safe</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Fast Badge */}
              <div className="group relative flex flex-col items-center gap-0.5 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-orange-400/30 hover:bg-orange-400/5 transition-all duration-500 cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer-slide_1s_ease-in-out]" />
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <Zap className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 group-hover:-rotate-12 group-hover:animate-pulse transition-all duration-300" />
                  <span className="text-white/40 group-hover:text-orange-300/90 text-[8px] font-bold text-center leading-tight uppercase tracking-tighter">Fast</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/40 border-t border-white/10">
          <div className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-gradient-to-br from-blue-350 to-purple-600 rounded-lg shadow-lg flex-shrink-0">
              <img src="/zi-logo.svg" alt="ZI Logo" className="w-5 h-5 object-contain" loading="lazy" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm font-black leading-tight whitespace-nowrap">
                <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                  ZI PREMIUM SERVICES
                </span>
              </h1>
              <p className="text-[10px] text-gray-400/80 font-medium">Your Digital Gateway</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Side Slider Toggle Button — Right Side Center (Mobile/Tablet only) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 xl:hidden">
        <button
          onClick={() => setIsSideSliderOpen(!isSideSliderOpen)}
          className={`relative flex items-center justify-center w-6 h-16 text-white border-l rounded-l-lg transition-all duration-300
            ${isSideSliderOpen
              ? 'opacity-0 pointer-events-none translate-x-2'
              : 'bg-white/5 border border-purple-500/30 hover:bg-white/10 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20'
            }`}
          aria-label="Open Navigation Slider"
        >
          {/* Three vertical dots matching header style */}
          <div className="relative flex flex-col items-center justify-center gap-[5px]">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </button>
      </div>

      <MaintenanceBar />
      <Header
        view={view}
        setView={setView}
        setIsCartOpen={setIsCartOpen}
        getTotalItems={getTotalItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuRef={menuRef}
        theme={theme}
        toggleTheme={toggleTheme}
        username={username}
        isLoggedIn={isLoggedIn}
        onSignInClick={() => router.push('/sign-in')}
        onSignUpClick={() => setShowSignUpModal(true)}
        onAlert={showAlert}
      />

      {view === "home" && (
        <>
          {categorySlug !== 'trade' && (
            <>
              <HeroSection heroRef={heroRef} />
            </>
          )}

          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${categorySlug === 'trade' ? 'py-12 sm:py-20' : 'py-8 sm:py-12'}`}>
            {categorySlug !== 'trade' && (
              <>
                <div id="category-filters" className="-mx-4 px-4 overflow-x-auto mb-6 sm:mb-8">
                  <div className="flex gap-3 sm:gap-4 whitespace-nowrap">
                    {categories.map((category) => {
                      const categorySlug = category.name === "All" ? "" : category.name.toLowerCase().replace(/\s+/g, '-');
                      const categoryHref = category.name === "All" ? "/" : `/${categorySlug}`;

                      return (
                        <button
                          key={category.name}
                          onClick={() => {
                            const slug = category.name === "All" ? "all" : category.name.toLowerCase().replace(/\s+/g, '-');
                            router.push(slug === "all" ? "/" : `/${slug}`);
                          }}
                          className={`relative px-4 sm:px-7 py-2 sm:py-3.5 rounded-full transition-all duration-300 font-semibold shadow-md overflow-hidden group flex items-center gap-2 min-w-max ${selectedCategory === category.name
                            ? "bg-gradient-to-r text-white shadow-lg transform scale-105"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-lg hover:scale-105 border border-gray-200 dark:border-gray-700"
                            }`}
                        >
                          <span
                            className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent text-lg`}
                          >
                            {category.icon}
                          </span>
                          <span className="relative z-10 text-xs sm:text-sm md:text-base">
                            {category.name}
                          </span>

                          {selectedCategory === category.name && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-100`}
                              ></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {selectedCategory !== "Trade" && filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      lastAddedProductId={lastAddedProductId}
                      addToCart={(p) => {
                        if (lastAddedProductId === p.id) {
                          setIsCartOpen(true);
                        } else {
                          addToCart(p);
                        }
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Web3 P2P Fee Request Form */}
            {selectedCategory === "Trade" && (
              <div className="max-w-2xl mx-auto mb-16">
                <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl p-5 sm:p-8 border border-purple-500/50 overflow-hidden group/form">
                  {/* Animated background effects */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400/50 rounded-full animate-float"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>

                  <div className="relative z-10 text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg shadow-yellow-500/30 mb-4">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                      Web3 P2P Fee Request
                    </h3>
                    <p className="text-purple-200">
                      Submit your P2P trading fee request with instant processing
                    </p>
                  </div>

                  <form onSubmit={handleWeb3FormSubmit} className="relative z-10 space-y-5">
                    {/* Token Selection */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">1</span>
                        I Want:
                      </label>
                      <div className="relative">
                        <select
                          value={web3Form.token}
                          onChange={(e) => handleWeb3FormChange('token', e.target.value)}
                          className={`w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 ${web3FormErrors.token
                            ? 'border-red-400'
                            : 'border-purple-400/30 hover:border-purple-400/60 focus:border-purple-400'
                            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all duration-300`}
                        >
                          <option value="" className="bg-gray-800 text-white">Select a token</option>
                          {tokenOptions.map((token) => (
                            <option key={token} value={token} className="bg-gray-800 text-white">
                              {token}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300 pointer-events-none" />
                      </div>
                      {web3FormErrors.token && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          {web3FormErrors.token}
                        </div>
                      )}
                    </div>

                    {/* Network Selection */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">2</span>
                        Choose Network:
                      </label>
                      <div className="relative">
                        <select
                          value={web3Form.network}
                          onChange={(e) => handleWeb3FormChange('network', e.target.value)}
                          className={`w-full px-4 py-4 bg-white/5 backdrop-blur-sm border-2 ${web3FormErrors.network
                            ? 'border-red-400'
                            : 'border-purple-400/30 hover:border-purple-400/60 focus:border-purple-400'
                            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all duration-300`}
                        >
                          <option value="" className="bg-gray-800 text-white">Select a network</option>
                          {networkOptions.map((network) => (
                            <option key={network} value={network} className="bg-gray-800 text-white">
                              {network}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300 pointer-events-none" />
                      </div>
                      {web3FormErrors.network && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          {web3FormErrors.network}
                        </div>
                      )}
                    </div>

                    {/* Amount Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">3</span>
                        Enter Amount:
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 font-bold text-lg">
                          $
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0.10"
                          value={web3Form.amount}
                          onChange={(e) => handleWeb3FormChange('amount', e.target.value)}
                          placeholder="0.00"
                          className={`w-full pl-10 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 ${web3FormErrors.amount
                            ? 'border-red-400'
                            : 'border-purple-400/30 hover:border-purple-400/60 focus:border-purple-400'
                            } rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300`}
                        />
                      </div>
                      {web3FormErrors.amount && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          {web3FormErrors.amount}
                        </div>
                      )}
                      <p className="text-purple-300/70 text-sm mt-2 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        Minimum amount: $0.10
                      </p>
                    </div>

                    {/* Wallet Address Input */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-purple-100 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs">4</span>
                        Your Wallet Address:
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Wallet className="w-5 h-5 text-purple-400" />
                        </div>
                        <input
                          type="text"
                          value={web3Form.walletAddress}
                          onChange={(e) => handleWeb3FormChange('walletAddress', e.target.value)}
                          placeholder="Enter your wallet address (e.g., 0x...)"
                          className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 ${web3FormErrors.walletAddress
                            ? 'border-red-400'
                            : 'border-purple-400/30 hover:border-purple-400/60 focus:border-purple-400'
                            } rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 font-mono text-sm`}
                        />
                      </div>
                      {web3FormErrors.walletAddress && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          {web3FormErrors.walletAddress}
                        </div>
                      )}
                      <p className="text-purple-300/70 text-sm mt-2 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-green-400" />
                        Your wallet address will be used for receiving funds
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="relative w-full py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-gray-900 font-bold text-lg rounded-xl overflow-hidden group/btn transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-[1.02]"
                    >
                      {/* Button glow */}
                      <span className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 opacity-0 group-hover/btn:opacity-70 blur-sm transition-opacity duration-500"></span>
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"></span>

                      {/* Shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>

                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        Submit P2P Fee Request
                      </span>
                    </button>
                  </form>

                  {/* Form Info - Enhanced */}
                  <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-400/30 group hover:border-green-400/50 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-green-300 mb-1">Instant Processing</p>
                          <p className="text-purple-200/80">Processed instantly upon submission</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl border border-blue-400/30 group hover:border-blue-400/50 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-blue-300 mb-1">Secure & Encrypted</p>
                          <p className="text-purple-200/80">All transactions are protected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {categorySlug !== 'trade' && (
              <>
                {/* Rating Section with Grid Layout */}
                <RatingSection
                  productId={1}
                  productName="Premium Digital Services"
                  reviews={reviews}
                  averageRating={averageRating}
                  totalReviews={totalReviews}
                  onReviewSubmit={handleReviewSubmit}
                  onHelpfulClick={handleHelpfulClick}
                />

                <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl p-5 sm:p-8 mb-16 border border-gray-700 overflow-hidden">
                  {/* Static background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-6">
                      <div className="relative inline-block">
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                          Get In Touch
                        </h3>
                        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Have questions about our services? Need help with your order? Contact
                        us and we'll get back to you within 24 hours.
                      </p>
                      <div className="space-y-4">


                        {/* WhatsApp Card */}
                        <a
                          href="https://wa.me/message/HAOATN77ES6PL1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center space-x-4 p-5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl hover:from-green-500/20 hover:to-green-600/10 transition-all duration-500 border border-white/10 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1 no-underline"
                        >
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-green-400/0 group-hover:from-green-500/10 group-hover:to-green-400/5 transition-all duration-500"></div>
                          <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-green-500/30">
                            <Phone className="w-6 h-6 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity"></div>
                            {/* Online indicator */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse">
                              <span className="absolute inset-0.5 bg-green-400 rounded-full"></span>
                            </span>
                          </div>
                          <div className="relative">
                            <div className="text-sm text-green-300 font-medium tracking-wide uppercase">Phone</div>
                            <div className="text-white font-semibold text-lg group-hover:text-green-200 transition-colors duration-300 flex items-center gap-2">
                              WhatsApp
                              <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full">Online</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                        </a>

                        {/* Location Card */}
                        <div className="group relative flex items-center space-x-4 p-5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl hover:from-red-500/20 hover:to-red-600/10 transition-all duration-500 border border-white/10 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 cursor-pointer">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 to-red-400/0 group-hover:from-red-500/10 group-hover:to-red-400/5 transition-all duration-500"></div>
                          <div className="relative p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-red-500/30">
                            <MapPin className="w-6 h-6 text-white" />
                            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity"></div>
                          </div>
                          <div className="relative">
                            <div className="text-sm text-red-300 font-medium tracking-wide uppercase">Location</div>
                            <div className="text-white font-semibold text-lg group-hover:text-red-200 transition-colors duration-300">
                              Dhaka, Bangladesh
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-400/40 transition-all duration-500 group/form overflow-hidden">
                      {/* Form background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500"></div>

                      {/* Decorative corner accents */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full"></div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg shadow-yellow-500/30">
                            <Send className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                            Quick Order
                          </h4>
                        </div>

                        {/* Quick Order Marquee - Enhanced */}
                        <div className="relative bg-gradient-to-r from-orange-600/20 via-pink-600/20 to-purple-600/20 text-white py-3 px-4 rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 animate-pulse"></div>
                          <div className="relative flex animate-marquee whitespace-nowrap text-sm font-medium">
                            <span className="mx-4 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> Request any premium service here!</span>
                            <span className="mx-4 flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400" /> Fast response within 24 hours</span>
                            <span className="mx-4 flex items-center gap-1"><Shield className="w-4 h-4 text-green-400" /> Best prices guaranteed</span>
                            <span className="mx-4 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> Request any premium service here!</span>
                            <span className="mx-4 flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400" /> Fast response within 24 hours</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 space-y-4">
                        {/* Name Input */}
                        <div className="group relative">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={qName}
                            onChange={(e) => setQName(e.target.value)}
                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            required
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>

                        {/* Email Input */}
                        <div className="group relative">
                          <input
                            type="email"
                            placeholder="Your Email"
                            value={qEmail}
                            onChange={(e) => setQEmail(e.target.value)}
                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            required
                            autoComplete="email"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>

                        {/* Phone Input */}
                        <div className="group relative">
                          <input
                            type="tel"
                            placeholder="+8801XXXXXXXXX"
                            value={qPhone}
                            onChange={(e) => {
                              let v = e.target.value;
                              v = v.replace(/[^+\d]/g, "");
                              if (v === "+") v = "+880";
                              if (v.startsWith("880")) v = "+" + v;
                              if (v.startsWith("01")) v = "+880" + v.slice(1);
                              if (v.startsWith("1")) v = "+880" + v;
                              if (!v.startsWith("+880")) {
                                if (v === "" || v === "+") v = "+880";
                              }
                              if (v.length > 14) v = v.slice(0, 14);
                              setQPhone(v);
                            }}
                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            inputMode="numeric"
                            pattern="^\+8801[3-9][0-9]{8}$"
                            maxLength={14}
                            onFocus={() => {
                              if (!qPhone) setQPhone("+880");
                            }}
                            required
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                        {qPhone && !/^\+8801[3-9][0-9]{8}$/.test(qPhone) && (
                          <p className="text-xs text-red-300 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Enter a valid Bangladeshi number like +8801XXXXXXXXX.
                          </p>
                        )}

                        {/* Message Textarea */}
                        <div className="group relative">
                          <textarea
                            placeholder="Which service are you interested in?"
                            rows={3}
                            value={qText}
                            onChange={(e) => setQText(e.target.value)}
                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/20 resize-none"
                            required
                          ></textarea>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                        {qFeedback && (
                          <div
                            className={`${qFeedback.type === "success"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                              } text-sm p-3 rounded-xl border flex items-center gap-2`}
                          >
                            {qFeedback.type === "success" ? (
                              <Check className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span dangerouslySetInnerHTML={{ __html: qFeedback.message }} />
                          </div>
                        )}

                        {/* Enhanced Submit Button */}
                        <button
                          disabled={qSending}
                          onClick={sendQuickOrder}
                          className={`relative w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-purple-500/30 overflow-hidden group/btn transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 ${qSending ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                            }`}
                        >
                          {/* Animated border glow */}
                          <span className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-70 blur-sm transition-opacity duration-500"></span>
                          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></span>

                          {/* Shine effect */}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>

                          {/* Secondary sweep */}
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 transform skew-x-12 translate-x-full group-hover/btn:-translate-x-full transition-transform duration-700 delay-100"></span>

                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {qSending ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                <span>Send Message</span>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>


              </>
            )}
          </div>
        </>
      )}

      {view === "checkout" && (
        <Checkout
          cart={cart}
          setCart={setCart}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          payerNumber={payerNumber}
          setPayerNumber={setPayerNumber}
          trxId={trxId}
          setTrxId={setTrxId}
          copiedAddress={copiedAddress}
          setCopiedAddress={setCopiedAddress}
          getTotalPrice={getTotalPrice}
          onOrderConfirmed={() => {
            setPayerNumber("");
            setTrxId("");
            setPaymentMethod("bkash");
            setCryptoCurrency("USDT");
            setPaymentType("network");
            setSelectedNetwork("TRC20");
            setSelectedPlatform("Binance");
            router.push("/");
            setView("home");
          }}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          onAlert={showAlert}
        />
      )}

      {view === "orders" && (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Orders
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your current orders
              </p>
            </div>

            <div className="space-y-6">
              {orders
                .filter(
                  (order) =>
                    order.status === "pending" || order.status === "processing"
                )
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : order.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ৳{order.total}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Items:
                        </h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-300">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                ৳{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Payment Details:
                        </h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">
                              Method:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {order.paymentMethod}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">
                              TrxID:
                            </span>
                            <span className="text-gray-900 dark:text-white font-mono">
                              {order.trxId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setView("order-details");
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </button>
                      {order.status === "pending" && (
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to cancel this order?"
                              )
                            ) {
                              // In a real app, this would make an API call
                              alert(
                                "Order cancellation requested. We will contact you shortly."
                              );
                            }
                          }}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {orders.filter(
                (order) =>
                  order.status === "pending" || order.status === "processing"
              ).length === 0 && (
                  <div className="text-center py-12">
                    <Notebook className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Active Orders
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      You don't have any active orders at the moment.
                    </p>
                    <button
                      onClick={() => { router.push("/"); setView("home"); }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
            </div>
          </div>
        </section>
      )}

      {view === "order-history" && (
        <OrderHistory
          orders={orders}
          onSelectOrder={(order) => {
            setSelectedOrder(order);
            setView("order-details");
          }}
          onReorder={(order) => {
            order.items.forEach((item) => {
              for (let i = 0; i < item.quantity; i++) {
                addToCart(item);
              }
            });
            setView("home");
            showAlert("success", "Reorder", "Items added to cart for reorder!");
          }}
        />
      )}

      {view === "order-details" && selectedOrder && (
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button
                onClick={() => setView("order-history")}
                className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                ← Back to Order History
              </button>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Order #{selectedOrder.id}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Order Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Order ID:
                      </span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Date:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(
                          selectedOrder.date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : selectedOrder.status === "processing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : selectedOrder.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ৳{selectedOrder.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Payment Method:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Transaction ID:
                      </span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {selectedOrder.trxId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Payer Number:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedOrder.payerNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white dark:bg-gray-600 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ৳{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ৳{item.price} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ৳{selectedOrder.total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
