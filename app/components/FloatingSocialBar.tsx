"use client";

import React from 'react';
import { Facebook, Twitter, Send, Share2 } from 'lucide-react';

const FloatingSocialBar = () => {
    const socialLinks = [
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            href: 'https://t.me/trustedearningsources',
            color: 'from-sky-400 to-blue-600',
            glow: 'group-hover:shadow-sky-500/50'
        },
        {
            name: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            href: 'https://wa.me/+8801733019261',
            color: 'from-green-400 to-emerald-600',
            glow: 'group-hover:shadow-emerald-500/50'
        },
        {
            name: 'Twitter',
            icon: <Twitter className="w-5 h-5" />,
            href: 'https://x.com/juwelonlinejob',
            color: 'from-slate-800 to-black',
            glow: 'group-hover:shadow-black/50'
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-5 h-5" />,
            href: 'https://www.facebook.com/zikrulislam.juwel',
            color: 'from-blue-600 to-indigo-700',
            glow: 'group-hover:shadow-blue-600/50'
        },
    ];

    return (
        <div className="fixed z-[100] transition-all duration-500
            bottom-6 left-1/2 -translate-x-1/2 /* Mobile: Bottom Center */
            sm:bottom-auto sm:left-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 /* Desktop: Mid Right */
        ">
            {/* Main Container with Glassmorphism */}
            <div className="flex flex-row sm:flex-col gap-2.5 sm:gap-3 p-2 sm:p-2.5 bg-black/20 sm:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl">

                {/* Decorative Handle - Only visible on Desktop */}
                <div className="hidden sm:block w-8 h-1 bg-white/10 rounded-full mb-1" />

                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            relative group flex items-center justify-center
                            w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl
                            bg-gradient-to-br ${social.color}
                            text-white
                            transition-all duration-300 ease-out
                            hover:-translate-y-1 sm:hover:-translate-y-0 sm:hover:-translate-x-2 
                            hover:scale-110
                            hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]
                            ${social.glow}
                            active:scale-90
                        `}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-slide" />
                        </div>

                        {/* Icon */}
                        <div className="relative z-10 drop-shadow-md">
                            {social.icon}
                        </div>
                    </a>
                ))}

                {/* Share Button - Layout adapts for mobile */}
                <div className="pl-1 sm:pl-0 sm:pt-2 flex justify-center items-center border-l sm:border-l-0 sm:border-t border-white/10">
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'ZI PREMIUM SHOP',
                                    text: 'Check out ZI PREMIUM SHOP for the best deals!',
                                    url: window.location.href,
                                }).catch(() => { });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copied to clipboard!");
                            }
                        }}
                        className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg hover:shadow-purple-500/40 transition-all cursor-pointer active:scale-90"
                        title="Share Page"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FloatingSocialBar;

