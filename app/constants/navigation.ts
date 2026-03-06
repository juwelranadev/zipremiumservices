import React from "react";
import {
  Gift,
  ArrowLeftRight,
  Repeat,
  Coins,
  BookOpen,
} from "lucide-react";

export interface NavItem {
  name: string;
  icon: React.ReactElement;
  badge: string;
  color: string;
  desc: string;
  slug: string;
}

export const navItems: NavItem[] = [
  { 
    name: "Airdrop", 
    icon: React.createElement(Gift, { className: "w-5 h-5" }), 
    badge: "New", 
    color: "from-pink-500 to-rose-500", 
    desc: "Latest rewards", 
    slug: "airdrop" 
  },
  { 
    name: "Trade", 
    icon: React.createElement(ArrowLeftRight, { className: "w-5 h-5" }), 
    badge: "Pro", 
    color: "from-blue-500 to-cyan-500", 
    desc: "Exchange assets", 
    slug: "trade" 
  },
  { 
    name: "Buy / Sell", 
    icon: React.createElement(Repeat, { className: "w-5 h-5" }), 
    badge: "Safe", 
    color: "from-green-500 to-emerald-500", 
    desc: "Instant crypto", 
    slug: "trade" 
  },
  { 
    name: "Crypto", 
    icon: React.createElement(Coins, { className: "w-5 h-5" }), 
    badge: "Hot", 
    color: "from-yellow-400 to-orange-500", 
    desc: "Top tokens", 
    slug: "all" 
  },
  { 
    name: "Blogs", 
    icon: React.createElement(BookOpen, { className: "w-5 h-5" }), 
    badge: "Read", 
    color: "from-purple-500 to-indigo-500", 
    desc: "Market news", 
    slug: "all" 
  },
];

export const tokenOptions = [
  'USDT', 
  'USDC', 
  'BNB', 
  'ETH', 
  'SOL', 
  'TON'
];

export const networkOptions = [
  'Ethereum',
  'BNB Chain',
  'Tron',
  'Solana',
  'Polygon',
  'Arbitrum',
  'Optimism',
  'TON',
  'Avalanche',
  'Fantom',
  'Base',
  'Cronos'
];
