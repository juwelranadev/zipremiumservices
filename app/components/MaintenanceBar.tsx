'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert, Hammer, Zap, Server, Wifi, Activity } from 'lucide-react';

/* ───────────────────────────── types ─────────────────────────────── */
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
    shape: 'circle' | 'diamond';
}

/* ──────────────────── marquee content segments ─────────────────────── */
const SEGMENTS = [
    {
        icon: <ShieldAlert className="w-3.5 h-3.5" style={{ color: '#f87171' }} />,
        iconBg: 'rgba(239,68,68,0.18)',
        iconBorder: 'rgba(239,68,68,0.5)',
        iconGlow: 'rgba(239,68,68,0.6)',
        label: 'System Maintenance',
        labelGrad: 'linear-gradient(90deg,#ff6b6b,#ffd6d6,#ff6b6b)',
        desc: 'Upgrading for better performance',
        badge: {
            text: 'LIVE UPDATES',
            color: '#fbbf24',
            bg: 'rgba(251,191,36,0.12)',
            border: 'rgba(251,191,36,0.4)',
            glow: 'rgba(251,191,36,0.5)',
            icon: <Hammer className="w-2.5 h-2.5" />,
        },
    },
    {
        icon: <Server className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />,
        iconBg: 'rgba(139,92,246,0.18)',
        iconBorder: 'rgba(139,92,246,0.5)',
        iconGlow: 'rgba(139,92,246,0.6)',
        label: 'Infrastructure Upgrade',
        labelGrad: 'linear-gradient(90deg,#c084fc,#ede9fe,#c084fc)',
        desc: 'Servers are being optimized',
        badge: {
            text: 'IN PROGRESS',
            color: '#c084fc',
            bg: 'rgba(192,132,252,0.12)',
            border: 'rgba(192,132,252,0.4)',
            glow: 'rgba(192,132,252,0.5)',
            icon: <Activity className="w-2.5 h-2.5" />,
        },
    },
    {
        icon: <Zap className="w-3.5 h-3.5" style={{ color: '#fbbf24' }} />,
        iconBg: 'rgba(251,191,36,0.18)',
        iconBorder: 'rgba(251,191,36,0.5)',
        iconGlow: 'rgba(251,191,36,0.6)',
        label: 'Speed Enhancement',
        labelGrad: 'linear-gradient(90deg,#fde68a,#fffbeb,#fde68a)',
        desc: 'Boosting platform performance',
        badge: {
            text: 'TURBO MODE',
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.12)',
            border: 'rgba(245,158,11,0.4)',
            glow: 'rgba(245,158,11,0.5)',
            icon: <Zap className="w-2.5 h-2.5" />,
        },
    },
    {
        icon: <Wifi className="w-3.5 h-3.5" style={{ color: '#34d399' }} />,
        iconBg: 'rgba(52,211,153,0.18)',
        iconBorder: 'rgba(52,211,153,0.5)',
        iconGlow: 'rgba(52,211,153,0.6)',
        label: 'Network Optimization',
        labelGrad: 'linear-gradient(90deg,#6ee7b7,#ecfdf5,#6ee7b7)',
        desc: 'Enhancing connectivity worldwide',
        badge: {
            text: 'CONNECTING',
            color: '#34d399',
            bg: 'rgba(52,211,153,0.12)',
            border: 'rgba(52,211,153,0.4)',
            glow: 'rgba(52,211,153,0.5)',
            icon: <Wifi className="w-2.5 h-2.5" />,
        },
    },
];

/* ─────────────────────── animated status dot ─────────────────────── */
function LiveDot() {
    return (
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
            <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.5,
                animation: 'mbar-ping 1.3s cubic-bezier(0,0,0.2,1) infinite',
            }} />
            <span style={{
                position: 'absolute',
                inset: 3,
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.25)',
                animation: 'mbar-ping 1.3s cubic-bezier(0,0,0.2,1) 0.3s infinite',
            }} />
            <span style={{
                position: 'relative',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#fca5a5,#ef4444)',
                boxShadow: '0 0 8px #ef4444, 0 0 16px rgba(239,68,68,0.4)',
            }} />
        </span>
    );
}

/* ─────────────────── animated progress bar ─────────────────────── */
function ProgressBar() {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            overflow: 'hidden',
            zIndex: 20,
        }}>
            {/* base track */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.04)',
            }} />
            {/* moving gradient beam */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '-60%',
                width: '60%',
                height: '100%',
                background: 'linear-gradient(90deg,transparent,rgba(239,68,68,0.9),rgba(139,92,246,0.9),rgba(251,191,36,0.9),transparent)',
                animation: 'mbar-progress 3s linear infinite',
                boxShadow: '0 0 12px rgba(239,68,68,0.8), 0 0 24px rgba(139,92,246,0.5)',
            }} />
        </div>
    );
}

/* ─────────────────── diamond separator ────────────────────────── */
function Diamond() {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            flexShrink: 0,
        }}>
            <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            <span style={{
                width: 5,
                height: 5,
                background: 'linear-gradient(135deg,rgba(239,68,68,0.6),rgba(139,92,246,0.6))',
                transform: 'rotate(45deg)',
                boxShadow: '0 0 4px rgba(139,92,246,0.4)',
                flexShrink: 0,
            }} />
            <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
        </span>
    );
}

/* ─────────────────── scanline overlay ─────────────────────────── */
function Scanlines() {
    return (
        <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 3px)',
            zIndex: 2,
        }} />
    );
}

/* ─────────────────── neon grid lines ───────────────────────────── */
function NeonGrid() {
    return (
        <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
                'linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px),' +
                'linear-gradient(0deg,rgba(239,68,68,0.03) 1px,transparent 1px)',
            backgroundSize: '40px 100%',
            zIndex: 1,
        }} />
    );
}

/* ─────────────────── floating particles ───────────────────────── */
function Particles({ particles }: { particles: Particle[] }) {
    return (
        <>
            {particles.map((p) => (
                <span
                    key={p.id}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        borderRadius: p.shape === 'circle' ? '50%' : '0',
                        transform: p.shape === 'diamond' ? 'rotate(45deg)' : undefined,
                        pointerEvents: 'none',
                        animation: `mbar-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
                        zIndex: 4,
                        filter: `blur(${p.shape === 'circle' ? 0.5 : 0}px)`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                />
            ))}
        </>
    );
}

/* ─────────────────────────── main component ────────────────────────── */
const STORAGE_KEY = 'zi_maintenance_mode';

export default function MaintenanceBar() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const idRef = useRef(0);

    const COLORS = [
        'rgba(239,68,68,0.8)',
        'rgba(139,92,246,0.8)',
        'rgba(251,191,36,0.8)',
        'rgba(52,211,153,0.7)',
        'rgba(96,165,250,0.7)',
    ];

    // Read maintenance mode from localStorage (polls every 3s for live sync)
    useEffect(() => {
        const read = () => setMaintenanceMode(localStorage.getItem(STORAGE_KEY) === 'true');
        read();
        const id = setInterval(read, 3000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const generated: Particle[] = Array.from({ length: 18 }, () => ({
            id: ++idRef.current,
            x: Math.random() * 100,
            y: 20 + Math.random() * 60,
            size: 1.5 + Math.random() * 3,
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            shape: Math.random() > 0.5 ? 'circle' : 'diamond',
        }));
        setParticles(generated);
    }, []);

    // Hide bar when maintenance mode is off
    if (!maintenanceMode) return null;

    return (
        <>
            {/* ── keyframes ── */}
            <style>{`
                @keyframes mbar-ping {
                    75%, 100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes mbar-float {
                    0%   { transform: translateY(0px) scale(1); opacity: 0; }
                    20%  { opacity: 1; }
                    80%  { opacity: 0.6; }
                    100% { transform: translateY(-22px) scale(0.4); opacity: 0; }
                }
                @keyframes mbar-shimmer {
                    0%   { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(500%) skewX(-20deg); }
                }
                @keyframes mbar-shimmer2 {
                    0%   { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(500%) skewX(-20deg); }
                }
                @keyframes mbar-border-pulse {
                    0%, 100% { opacity: 0.25; }
                    50%      { opacity: 1; }
                }
                @keyframes mbar-badge-pulse {
                    0%, 100% { opacity: 0.85; transform: scale(1); }
                    50%      { opacity: 1; transform: scale(1.03); }
                }
                @keyframes mbar-progress {
                    0%   { left: -60%; }
                    100% { left: 160%; }
                }
                @keyframes mbar-aurora {
                    0%   { opacity: 0.6; transform: scaleX(1); }
                    50%  { opacity: 1;   transform: scaleX(1.05); }
                    100% { opacity: 0.6; transform: scaleX(1); }
                }
                @keyframes mbar-icon-spin {
                    0%   { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes mbar-glitch {
                    0%, 90%, 100% { clip-path: none; transform: translate(0); }
                    92%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 1px); }
                    94%  { clip-path: inset(50% 0 30% 0); transform: translate(2px, -1px); }
                    96%  { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 0); }
                }
                @keyframes mbar-label-glow {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3) drop-shadow(0 0 4px currentColor); }
                }
                @keyframes mbar-news-ticker {
                    0%   { transform: translateX(100vw); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes mbar-tagline-blink {
                    0%, 48%, 100% { opacity: 1; }
                    50%, 98% { opacity: 0; }
                }
                @media (max-width: 640px) {
                    .mbar-track { animation-duration: 25s !important; }
                }
            `}</style>

            <div
                role="banner"
                aria-label="System Maintenance Notice"
                style={{
                    position: 'relative',
                    zIndex: 100,
                    background: 'linear-gradient(180deg,#0c0c1a 0%,#08080f 45%,#0c0c1a 100%)',
                    borderBottom: '1px solid rgba(139,92,246,0.2)',
                    boxShadow:
                        '0 0 60px rgba(139,92,246,0.15), ' +
                        '0 0 30px rgba(239,68,68,0.12)',
                    overflow: 'hidden',
                }}
            >
                {/* ── aurora glow background ── */}
                <div aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse 70% 200% at 10% 50%, rgba(239,68,68,0.14) 0%, transparent 55%),' +
                        'radial-gradient(ellipse 50% 200% at 50% 50%, rgba(139,92,246,0.10) 0%, transparent 55%),' +
                        'radial-gradient(ellipse 70% 200% at 90% 50%, rgba(52,211,153,0.07) 0%, transparent 55%)',
                    animation: 'mbar-aurora 5s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />

                <NeonGrid />
                <Scanlines />
                <Particles particles={particles} />

                {/* ── dual shimmer sweeps ── */}
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '12%', height: '100%',
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)',
                        animation: 'mbar-shimmer 4.5s ease-in-out 0s infinite',
                    }} />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '8%', height: '100%',
                        background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.09),transparent)',
                        animation: 'mbar-shimmer2 4.5s ease-in-out 2.2s infinite',
                    }} />
                </div>



                {/* ── marquee track ── */}
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        paddingTop: '0.6rem',
                        paddingBottom: '0.6rem',
                    }}
                >
                    {/* fade masks */}
                    <div aria-hidden="true" style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3rem',
                        background: 'linear-gradient(90deg,#09090f,transparent)',
                        zIndex: 20, pointerEvents: 'none',
                    }} />
                    <div aria-hidden="true" style={{
                        position: 'absolute', top: 0, right: 0, bottom: 0, width: '3rem',
                        background: 'linear-gradient(270deg,#09090f,transparent)',
                        zIndex: 20, pointerEvents: 'none',
                    }} className="hidden sm:block" />

                    <div
                        className="mbar-track"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            whiteSpace: 'nowrap',
                            animation: 'mbar-news-ticker 35s linear infinite',
                            willChange: 'transform',
                        }}
                    >
                        {SEGMENTS.map((seg, si) => (
                            <div
                                key={si}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    flex: '0 0 auto',
                                    minWidth: 'max-content',
                                    marginRight: '6rem',
                                }}
                            >
                                {/* ── icon pill ── */}
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: seg.iconBg,
                                    border: `1px solid ${seg.iconBorder}`,
                                    boxShadow: `0 0 10px ${seg.iconGlow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                                    flexShrink: 0,
                                    backdropFilter: 'blur(4px)',
                                }}>
                                    {seg.icon}
                                </span>

                                {/* ── label ── */}
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    backgroundImage: seg.labelGrad,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'mbar-label-glow 3s ease-in-out infinite',
                                }}>
                                    {seg.label}
                                </span>

                                {/* ── diamond separator ── */}
                                <Diamond />

                                {/* ── description ── */}
                                <span style={{
                                    fontSize: '0.68rem',
                                    fontWeight: 500,
                                    color: 'rgba(255,255,255,0.45)',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    fontStyle: 'italic',
                                }}>
                                    {seg.desc}
                                </span>

                                {/* ── diamond separator ── */}
                                <Diamond />

                                {/* ── badge ── */}
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.62rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    color: seg.badge.color,
                                    background: seg.badge.bg,
                                    border: `1px solid ${seg.badge.border}`,
                                    borderRadius: '999px',
                                    padding: '0.22rem 0.7rem',
                                    animation: 'mbar-badge-pulse 2.2s ease-in-out infinite',
                                    boxShadow: `0 0 10px ${seg.badge.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                                    flexShrink: 0,
                                    backdropFilter: 'blur(4px)',
                                }}>
                                    {seg.badge.icon}
                                    {seg.badge.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── top edge highlight (rainbow) ── */}
                <div aria-hidden="true" style={{
                    position: 'absolute',
                    inset: '0 0 auto 0',
                    height: 1,
                    background: 'linear-gradient(90deg,transparent 0%,rgba(239,68,68,0.4) 20%,rgba(139,92,246,0.5) 50%,rgba(52,211,153,0.4) 80%,transparent 100%)',
                    animation: 'mbar-border-pulse 3s ease-in-out infinite',
                }} />

                {/* ── progress bar at bottom ── */}
                <ProgressBar />
            </div>
        </>
    );
}
