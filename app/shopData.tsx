import React from "react";
import {
    Play,
    Palette,
    Shield,
    Zap,
    Lock,
    Globe,
    Wallet,
} from "lucide-react";
import type { Product, Order } from "./types";

export const socialServices = [
    {
        id: 7,
        name: "Facebook Followers",
        description:
            "Get real and active Facebook followers to boost your social presence",
        price: 99,
        originalPrice: 399,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold" >
                f
            </div>
        ),
        features: [
            "Real followers",
            "Fast delivery",
            "24/7 support",
            "Safe & secure",
        ],
        rating: 4.7,
        reviews: 890,
    },
    {
        id: 8,
        name: "YouTube Subscribers",
        description:
            "Increase your YouTube channel subscribers with real and active users",
        price: 149,
        originalPrice: 599,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold" >
                YT
            </div>
        ),
        features: ["Real subscribers", "Monetization ready", "Quick delivery", "No drops"],
        rating: 4.8,
        reviews: 1200,
    },
    {
        id: 9,
        name: "TikTok Followers",
        description: "Grow your TikTok presence with real and engaged followers",
        price: 79,
        originalPrice: 349,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold" >
                TT
            </div>
        ),
        features: ["Real followers", "Organic growth", "Fast delivery", "Privacy protected"],
        rating: 4.6,
        reviews: 750,
    },
    {
        id: 10,
        name: "Instagram Followers",
        description: "Boost your Instagram profile with real and active followers",
        price: 119,
        originalPrice: 499,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" >
                IG
            </div>
        ),
        features: ["Real followers", "High quality", "Instant delivery", "24/7 support"],
        rating: 4.9,
        reviews: 1500,
    },
    {
        id: 11,
        name: "Twitter Followers",
        description: "Increase your Twitter influence with real and engaged followers",
        price: 89,
        originalPrice: 399,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs font-bold" >
                X
            </div>
        ),
        features: ["Real followers", "Active accounts", "Quick delivery", "Safe method"],
        rating: 4.5,
        reviews: 680,
    },
    {
        id: 12,
        name: "LinkedIn Connections",
        description: "Expand your professional network with real LinkedIn connections",
        price: 199,
        originalPrice: 799,
        category: "Social Services",
        icon: (
            <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold" >
                in
            </div>
        ),
        features: [
            "Real connections",
            "Professional profiles",
            "Targeted growth",
            "B2B focused",
        ],
        rating: 4.7,
        reviews: 420,
    },
];

export const products: Product[] = [
    {
        id: 1,
        name: "YouTube Premium",
        description: "Ad-free videos, background play, and YouTube Music included",
        price: 299,
        originalPrice: 1200,
        category: "Entertainment",
        icon: <Play className="w-6 h-6 text-red-500" />,
        features: ["No ads", "Background play", "YouTube Music", "Offline downloads"],
        rating: 4.9,
        reviews: 1250,
    },
    {
        id: 2,
        name: "Canva Pro",
        description: "Professional design tools with premium templates and assets",
        price: 399,
        originalPrice: 1500,
        category: "Design",
        icon: <Palette className="w-6 h-6 text-purple-500" />,
        features: ["Premium templates", "Brand kit", "Background remover", "Magic resize"],
        rating: 4.8,
        reviews: 980,
    },
    {
        id: 3,
        name: "ExpressVPN Premium",
        description: "Ultra-fast, secure VPN with 160+ server locations worldwide",
        price: 459,
        originalPrice: 1800,
        category: "Security",
        icon: <Shield className="w-6 h-6 text-green-500" />,
        features: ["160+ locations", "No logs policy", "24/7 support", "5 devices"],
        rating: 4.7,
        reviews: 2100,
    },
    {
        id: 4,
        name: "Spotify Premium",
        description: "Ad-free music streaming with offline downloads",
        price: 199,
        originalPrice: 999,
        category: "Entertainment",
        icon: <Zap className="w-6 h-6 text-green-400" />,
        features: ["Ad-free music", "Offline downloads", "High quality", "Unlimited skips"],
        rating: 4.9,
        reviews: 3200,
    },
    {
        id: 5,
        name: "NordVPN Premium",
        description: "Advanced security features with double VPN encryption",
        price: 379,
        originalPrice: 1600,
        category: "Security",
        icon: <Lock className="w-6 h-6 text-blue-500" />,
        features: ["Double VPN", "Threat protection", "59 countries", "6 devices"],
        rating: 4.6,
        reviews: 1800,
    },
    {
        id: 6,
        name: "Netflix Premium",
        description: "4K streaming on multiple devices with full content library",
        price: 349,
        originalPrice: 1400,
        category: "Entertainment",
        icon: <Globe className="w-6 h-6 text-red-600" />,
        features: ["4K streaming", "4 screens", "Download content", "All regions"],
        rating: 4.8,
        reviews: 2800,
    },
];

export const allProducts = [...products, ...socialServices];

export const categories = [
    { name: "All", icon: "🌟", gradient: "from-purple-500 to-pink-500" },
    { name: "Entertainment", icon: "🎬", gradient: "from-red-500 to-orange-500" },
    { name: "Design", icon: "🎨", gradient: "from-blue-500 to-cyan-500" },
    { name: "Security", icon: "🔒", gradient: "from-green-500 to-emerald-500" },
    { name: "Social Services", icon: "📱", gradient: "from-indigo-500 to-purple-500" },
    { name: "Trade", icon: "💸", gradient: "from-yellow-500 to-amber-500" },
];

// Mock order data
export const mockOrders: Order[] = [
    {
        id: "ORD-001",
        date: "2024-01-15",
        status: "completed",
        total: 698,
        items: [
            { ...products[0], quantity: 1 }, // YouTube Premium
            { ...products[1], quantity: 1 }, // Canva Pro
        ],
        paymentMethod: "bKash",
        trxId: "7A1BCD2EFG",
        payerNumber: "01733019261",
    },
    {
        id: "ORD-002",
        date: "2024-01-10",
        status: "processing",
        total: 459,
        items: [{ ...products[2], quantity: 1 }], // ExpressVPN Premium
        paymentMethod: "bKash",
        trxId: "8B2CDE3FGH",
        payerNumber: "01733019261",
    },
    {
        id: "ORD-003",
        date: "2024-01-05",
        status: "completed",
        total: 548,
        items: [
            { ...products[3], quantity: 1 }, // Spotify Premium
            { ...products[5], quantity: 1 }, // Netflix Premium
        ],
        paymentMethod: "bKash",
        trxId: "9C3DEF4GHI",
        payerNumber: "01733019261",
    },
];
