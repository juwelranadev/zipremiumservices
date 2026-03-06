"use client";

import React from "react";
import { Zap, Gift, Diamond, Rocket, Flame, Sparkles, TrendingUp } from "lucide-react";

const marqueeItems = [
    {
        icon: <Zap className="w-4 h-4 text-yellow-300" />,
        text: "Flash Sale: YouTube Premium only ৳299 today!",
        badge: "HOT",
        badgeColor: "bg-red-500",
        textColor: "text-white"
    },
    {
        icon: <Gift className="w-4 h-4 text-pink-300" />,
        text: "Special Offer: Buy 2 Get 1 Free on all Social Services!",
        badge: "GIFT",
        badgeColor: "bg-purple-500",
        textColor: "text-white"
    },
    {
        icon: <Diamond className="w-4 h-4 text-cyan-300" />,
        text: "Premium VPN Services starting from ৳379!",
        badge: "PRO",
        badgeColor: "bg-blue-500",
        textColor: "text-white"
    },
    {
        icon: <Rocket className="w-4 h-4 text-purple-300" />,
        text: "24/7 Instant Delivery Available!",
        badge: "FAST",
        badgeColor: "bg-green-500",
        textColor: "text-white"
    },
    {
        icon: <Flame className="w-4 h-4 text-orange-400" />,
        text: "New: Netflix Premium now available at 75%",
        badge: "NEW",
        badgeColor: "bg-orange-500",
        textColor: "text-white"
    },
];

const PromoMarquee = () => {
    return (
        <div className="relative w-full overflow-hidden py-3 group cursor-default shadow-lg z-40 border-y border-white/10 bg-[#0f172a]">
            {/* Static background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-90" />

            <div className="relative z-20 flex animate-marquee whitespace-nowrap items-center hover:[animation-play-state:paused] transition-all">
                {[...Array(3)].map((_, groupIndex) => (
                    <React.Fragment key={`group-${groupIndex}`}>
                        {marqueeItems.map((item, index) => (
                            <div key={`item-${groupIndex}-${index}`} className="flex items-center gap-4 mx-10 group/item">
                                {/* Icon Container */}
                                <div className="relative flex items-center justify-center">
                                    <span className="flex-shrink-0 relative z-10 animate-bounce-subtle group-hover/item:scale-125 transition-transform duration-300">
                                        {item.icon}
                                    </span>
                                </div>

                                {/* Text content */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className={`${item.textColor} text-[13px] sm:text-sm font-black tracking-wide group-hover/item:text-yellow-200 transition-colors duration-300`}>
                                            {item.text}
                                        </span>
                                        {item.badge && (
                                            <span className={`${item.badgeColor} text-[8px] font-black text-white px-1.5 py-0.5 rounded-md shadow-lg border border-white/20 animate-pulse`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Simple Separator */}
                                <div className="flex items-center gap-1.5 opacity-30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>


            {/* Enhanced Side Masks */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-30 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-30 pointer-events-none" />
        </div>
    );
};

export default PromoMarquee;
