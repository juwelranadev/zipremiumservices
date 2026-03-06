"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Headset,
  MessageCircle,
  Mail,
  Send,
  Clock,
  Shield,
  Zap,
  ArrowLeft,
  Sparkles,
  Globe,
  Facebook,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ThumbsUp,
  Timer,
  MessageSquare,
  X,
  BadgeCheck,
  Activity,
  AlertCircle,
  Check
} from 'lucide-react';


// ── Typing dots component ──────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white/10 rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  );
}

// ── Live Chat Bubble ───────────────────────────────────────────────────────────
function LiveChatBubble() {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    { from: 'agent', text: '👋 Hi! Welcome to ZI Premium Support. How can we help you today?', time: 'Just now' }
  ]);
  const [agentTyping, setAgentTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const autoReplies = [
    "Thanks for reaching out! Our team will be with you shortly. 😊",
    "Got it! Let me check that for you right away.",
    "Great question! We're happy to assist. Give us a moment.",
    "Sure! I'll connect you with the right person immediately."
  ];

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    const userMsg = { from: 'user', text: inputVal, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setAgentTyping(true);
    setTimeout(() => {
      setAgentTyping(false);
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages(prev => [...prev, { from: 'agent', text: reply, time: 'Just now' }]);
    }, 2000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, agentTyping]);

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-white/10 animate-in slide-in-from-bottom-4 duration-300"
          style={{ animation: 'slideUp 0.3s ease-out' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-orange-600 p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Headset className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-700 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">ZI Support Team</p>
              <p className="text-xs text-green-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                Online · Typically replies instantly
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="bg-gray-900/95 backdrop-blur-xl flex-1 p-4 space-y-3 overflow-y-auto" style={{ maxHeight: '320px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'agent' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-auto">
                    <Headset className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm'
                  : 'bg-white/10 text-white rounded-bl-sm'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {agentTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Headset className="w-3.5 h-3.5 text-white" />
                </div>
                <TypingDots />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-gray-900/95 border-t border-white/10 p-3 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

          </>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function LiveSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── Telegram Modal Form State ────────────────────────────────────────────────
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [qName, setQName] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qText, setQText] = useState("");
  const [qSending, setQSending] = useState(false);
  const [qFeedback, setQFeedback] = useState<
    null | { type: "success" | "error"; message: string }
  >(null);

  const emailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const computeEmailSuggestions = (val: string) => {
    if (!val) return [] as string[];
    const atIndex = val.indexOf("@");
    const local = atIndex === -1 ? val : val.slice(0, atIndex);
    const typedDomain = atIndex === -1 ? "" : val.slice(atIndex);
    if (!local) return [] as string[];
    if (!typedDomain) return emailDomains;
    if (typedDomain.includes(".")) return [] as string[];
    return emailDomains.filter((d) => d.startsWith(typedDomain));
  };
  const suggestions = computeEmailSuggestions(qEmail);
  const acceptSuggestion = (domain: string) => {
    const atIndex = qEmail.indexOf("@");
    const local = atIndex === -1 ? qEmail : qEmail.slice(0, atIndex);
    setQEmail(`${local}${domain}`);
  };

  const sendQuickOrder = async () => {
    setQFeedback(null);
    const isValidBDPhoneStrict = /^\+8801[3-9]\d{8}$/.test(qPhone);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(qEmail);
    if (!qName || !qEmail || !qPhone || !qText) {
      setQFeedback({
        type: "error",
        message: "All fields are required. Please fill in Name, Email, Phone, and Message.",
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
        message: "Please enter a valid Bangladeshi phone number in +880 format (e.g., +8801XXXXXXXXX).",
      });
      return;
    }

    const token = "8401956368:AAFTLWT2MeYN1UjTTLY9y63ApPAAM6jY0vk";
    const chatId = "8369421359";

    const text = `New Support Request via Telegram Modal\nName: ${qName}\nEmail: ${qEmail}\nPhone: ${qPhone}\nMessage: ${qText}`;
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const proxyUrl = `https://cors.isomorphic-git.org/${tgUrl}`;

    try {
      setQSending(true);
      const endpoints = [
        proxyUrl,
        `https://thingproxy.freeboard.io/fetch/${tgUrl}`,
      ];
      let ok = false;
      for (const ep of endpoints) {
        try {
          const res = await fetch(ep, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
          });
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.ok) {
            ok = true;
            break;
          }
        } catch (_) { }
      }

      if (ok) {
        setQFeedback({ type: "success", message: "Your message has been sent successfully!" });
        setQName(""); setQEmail(""); setQPhone(""); setQText("");
        setTimeout(() => setShowTelegramModal(false), 2000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (e) {
      setQFeedback({ type: "error", message: "Failed to send. Please try again or use WhatsApp." });
    } finally {
      setQSending(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Fastest way to reach us. Get instant replies from our team.',
      action: 'Start Chat',
      href: 'https://wa.me/message/HAOATN77ES6PL1',
      gradient: 'from-green-400 to-emerald-500',
      glow: 'rgba(34,197,94,0.3)',
      badge: '● Online',
      badgeBg: 'bg-green-500/20 text-green-300 border-green-500/30',
      responseTime: '< 5 min',
      emoji: '💬'
    },
    {
      icon: Send,
      title: 'Telegram',
      description: 'Super fast support via Telegram. Join for exclusive deals too.',
      action: 'Open Message Box',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setShowTelegramModal(true);
      },
      gradient: 'from-sky-400 to-blue-500',
      glow: 'rgba(56,189,248,0.3)',
      badge: '24/7',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      responseTime: '< 10 min',
      emoji: '✈️'
    },
    {
      icon: Facebook,
      title: 'Facebook',
      description: 'Connect with us on Facebook. Message us anytime on our page.',
      action: 'Visit Page',
      href: 'https://www.facebook.com/zikrulislam.juwel',
      gradient: 'from-blue-500 to-indigo-600',
      glow: 'rgba(99,102,241,0.3)',
      badge: 'Active',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      responseTime: '< 30 min',
      emoji: '📘'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Send a detailed message. Perfect for complex inquiries.',
      action: 'Send Email',
      href: 'mailto:juwelshop@gmail.com',
      gradient: 'from-purple-500 to-fuchsia-500',
      glow: 'rgba(168,85,247,0.3)',
      badge: 'Fast Reply',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      responseTime: '< 24 hours',
      emoji: '📩'
    }
  ];

  const faqs = [
    {
      q: 'What are your support hours?',
      a: 'We provide 24/7 support through WhatsApp and Telegram. Our team is always ready to assist you regardless of your time zone. Email response may take up to 24 hours on weekends.',
      icon: Clock
    },
    {
      q: 'How quickly will I get a response?',
      a: 'Most WhatsApp and Telegram messages are answered within 5-15 minutes. During peak hours this can be up to 30 minutes but we always prioritize urgent issues.',
      icon: Timer
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bKash, Nagad, Rocket, bank transfers, and various cryptocurrency payments. All transactions are secured and verified before product delivery.',
      icon: Shield
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. All communications are end-to-end encrypted. We never share personal data with third parties and follow strict data protection protocols.',
      icon: BadgeCheck
    },
    {
      q: 'What if I am not satisfied with my purchase?',
      a: 'Your satisfaction is our priority. If there is any issue with your order, contact support immediately and we will resolve it within hours — with a refund or replacement guarantee.',
      icon: ThumbsUp
    }
  ];



  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes orbitSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-gradient { 
          background-size: 300% 300%;
          animation: gradientShift 5s ease infinite; 
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
        }
        .faq-answer.open {
          max-height: 300px;
        }
      `}</style>

      {/* ── BACKGROUND ─────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950" />

        {/* Hero img */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/hero-background.webp')" }} />

        {/* Orbs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Particles */}
        {[
          { top: '10%', left: '5%', size: 3, color: 'bg-purple-400', delay: '0s', dur: '4s' },
          { top: '20%', right: '8%', size: 2, color: 'bg-pink-400', delay: '1s', dur: '3s' },
          { top: '60%', left: '3%', size: 4, color: 'bg-blue-400', delay: '2s', dur: '5s' },
          { bottom: '20%', right: '5%', size: 2, color: 'bg-yellow-400', delay: '0.5s', dur: '3s' },
          { top: '80%', left: '15%', size: 3, color: 'bg-green-400', delay: '1.5s', dur: '4s' },
          { top: '30%', left: '50%', size: 2, color: 'bg-cyan-400', delay: '2.5s', dur: '6s' },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.color}/50 rounded-full animate-ping`}
            style={{
              top: (p as any).top, left: (p as any).left,
              bottom: (p as any).bottom, right: (p as any).right,
              width: p.size * 4, height: p.size * 4,
              animationDelay: p.delay, animationDuration: p.dur
            }}
          />
        ))}
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div className="relative z-10">

        {/* ── STICKY HEADER ──────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Shop</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/40 rounded-full blur-md animate-pulse" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Headset className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Live Support</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                  Team is online now
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            {/* Animated icon */}
            <div className="relative inline-block mb-10">
              {/* Outer ring */}
              <div className="absolute inset-[-16px] rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '15s' }} />
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-60 animate-pulse" />
              {/* Icon box */}
              <div className="relative w-28 h-28 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl group hover:rotate-6 hover:scale-110 transition-all duration-500 cursor-pointer animate-gradient">
                <Headset className="w-14 h-14 text-white drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/10 rounded-3xl" />
                {/* Shimmer */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
              {/* Orbiting dot */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32" style={{ transform: 'translate(-50%,-50%)', animation: 'orbitSpin 6s linear infinite' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
              </div>
              {/* Sparkle badge */}
              <div className="absolute -top-3 -right-3 w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-gray-950 shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient">
                Live Support
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent animate-gradient text-4xl sm:text-5xl">
                We're Here For You ✨
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-200/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Get instant help from our dedicated support team — available{' '}
              <span className="text-green-400 font-semibold">24 hours a day, 7 days a week</span>.
              No waiting, no bots — just real friendly humans.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { icon: Clock, label: '24/7 Available', color: 'text-yellow-400' },
                { icon: Zap, label: 'Instant Reply', color: 'text-green-400' },
                { icon: Shield, label: 'Secure & Private', color: 'text-blue-400' },
                { icon: Globe, label: 'Global Support', color: 'text-pink-400' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-5 py-2.5 glass rounded-full hover:bg-white/10 hover:scale-105 transition-all cursor-default group"
                >
                  <f.icon className={`w-4 h-4 ${f.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-semibold text-white/90">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTA arrow */}
            <div className="flex justify-center mt-8">
              <a href="#contact" className="flex flex-col items-center gap-2 text-purple-300/60 hover:text-purple-300 transition-colors group">
                <span className="text-xs font-medium tracking-widest uppercase">Get Help Now</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </div>
        </section>


        {/* ── CONTACT METHODS ───────────────────────────────────────────── */}
        <section id="contact" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
                <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">All channels active</span>
              </div>
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Choose Your Channel
                </span>
              </h2>
              <p className="text-purple-200/60 max-w-xl mx-auto">Pick your preferred platform to connect with us instantly</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  onClick={(method as any).onClick}
                  target={method.href === '#' ? undefined : "_blank"}
                  rel={method.href === '#' ? undefined : "noopener noreferrer"}
                  className="relative glass rounded-2xl p-6 card-hover group overflow-hidden"
                  style={{ boxShadow: `0 0 0 0 ${method.glow}` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 40px ${method.glow}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${method.glow}`)}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                  {/* Badge */}
                  <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full border ${method.badgeBg}`}>
                    {method.badge}
                  </span>

                  {/* Emoji */}
                  <div className="text-3xl mb-4">{method.emoji}</div>

                  {/* Icon */}
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <method.icon className="w-7 h-7 text-white" />
                    {/* Shimmer */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black mb-2 text-white">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{method.description}</p>

                  {/* Response time */}
                  <div className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>Response: {method.responseTime}</span>
                  </div>

                  <div className={`flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                    <span>{method.action}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/60" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Common questions</span>
              </div>
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-white/50">Quick answers to the most common questions</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-purple-500/30' : ''}`}
                >
                  <button
                    className="w-full flex items-center gap-4 p-6 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="flex-1 font-bold text-white group-hover:text-purple-200 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/40 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180 text-purple-400' : ''}`}
                    />
                  </button>
                  <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                    <div className="px-6 pb-6 text-white/60 leading-relaxed ml-14 text-sm">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.06] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-1.5 bg-gradient-to-br from-blue-350 to-purple-600 rounded-lg shadow-lg flex-shrink-0">
                <img src="/zi-logo.svg" alt="ZI PREMIUM SERVICES Logo" className="w-7 h-7 object-contain" loading="lazy" />
              </div>
              <div className="text-left">
                <p className="font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                    ZI PREMIUM SERVICES
                  </span>
                </p>
                <p className="text-xs text-gray-400">Your Digital Gateway</p>
              </div>
            </div>
            <p className="text-white/30 text-sm mt-3">
              © {new Date().getFullYear()} ZI Premium Services. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* ── TELEGRAM QUICK ORDER MODAL ─────────────────────────────────────── */}
      {showTelegramModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" onClick={() => setShowTelegramModal(false)} />
          <div className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Quick Chat</h3>
                  <p className="text-xs text-sky-400 font-medium">Telegram Support Portal</p>
                </div>
              </div>
              <button onClick={() => setShowTelegramModal(false)} className="p-2 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Marquee Info */}
            <div className="relative bg-sky-500/10 text-sky-200 py-2.5 px-4 rounded-xl overflow-hidden mb-6 border border-sky-500/20">
              <div className="flex animate-marquee whitespace-nowrap text-xs font-semibold">
                <span className="mx-4 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Instant Support via Telegram Bot</span>
                <span className="mx-4 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 100% Secure & Private</span>
                <span className="mx-4 flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Fast Response within minutes</span>
                <span className="mx-4 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Instant Support via Telegram Bot</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 relative z-10">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400 ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={qName}
                  onChange={e => setQName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold text-gray-400 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={qEmail}
                  onChange={e => setQEmail(e.target.value)}
                  onKeyDown={e => {
                    if ((e.key === "Enter" || e.key === "Tab") && suggestions.length > 0) {
                      e.preventDefault();
                      acceptSuggestion(suggestions[0]);
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-xl overflow-hidden border border-sky-400/30 bg-gray-900/95 backdrop-blur-md text-white shadow-xl shadow-sky-500/20">
                    {suggestions.map(d => (
                      <button key={d} onClick={() => acceptSuggestion(d)} className="w-full text-left px-4 py-2.5 hover:bg-sky-500/20 transition-colors text-sm">
                        {(() => {
                          const atIndex = qEmail.indexOf("@");
                          const local = atIndex === -1 ? qEmail : qEmail.slice(0, atIndex);
                          return `${local}${d}`;
                        })()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400 ml-1">Phone (format: +8801...)</label>
                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  value={qPhone}
                  onChange={e => {
                    let v = e.target.value.replace(/[^+\d]/g, "");
                    if (v === "+") v = "+880";
                    if (v.startsWith("880") && !v.startsWith("+880")) v = "+" + v;
                    if (v.startsWith("01")) v = "+880" + v.slice(1);
                    if (v.length > 14) v = v.slice(0, 14);
                    setQPhone(v);
                  }}
                  onFocus={() => { if (!qPhone) setQPhone("+880"); }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400 ml-1">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={3}
                  value={qText}
                  onChange={e => setQText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all resize-none"
                />
              </div>

              {qFeedback && (
                <div className={`${qFeedback.type === "success" ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"} text-sm p-3.5 rounded-xl border flex items-center gap-2 animate-in slide-in-from-top-2`}>
                  {qFeedback.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{qFeedback.message}</span>
                </div>
              )}

              <button
                disabled={qSending}
                onClick={sendQuickOrder}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {qSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Notification...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send via Telegram Bot</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING LIVE CHAT BUBBLE ──────────────────────────────────── */}
      <LiveChatBubble />
    </div>
  );
}
