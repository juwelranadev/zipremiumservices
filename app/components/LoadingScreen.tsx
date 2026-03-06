"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // Simple CSS-based loading with a fixed duration
    // The progress bar animation is handled entirely by CSS
    const loadingDuration = 2000; // 2 seconds

    const timer = setTimeout(() => {
      setFadeOut(true);
      // Allow fade out animation to complete
      setTimeout(() => {
        handleFinish();
      }, 500);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [handleFinish]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ls-bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes ls-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ls-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.3; }
        }
        @keyframes ls-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .ls-progress-bar {
          animation: ls-progress 2s ease-out forwards;
        }
      `}} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #020617 100%)",
          transition: "opacity 500ms ease",
          opacity: fadeOut ? 0 : 1,
          pointerEvents: fadeOut ? "none" : "auto",
        }}
      >
        {/* Background particles - using CSS animations instead of JS */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {[
            { w: 200, t: "10%", l: "15%", color: "139,92,246", delay: "0s" },
            { w: 150, t: "60%", l: "auto", r: "10%", color: "249,115,22", delay: "1s" },
            { w: 100, t: "auto", b: "20%", l: "25%", color: "236,72,153", delay: "2s" },
            { w: 180, t: "30%", l: "auto", r: "25%", color: "56,189,248", delay: "3s" },
            { w: 120, t: "auto", b: "10%", l: "auto", r: "30%", color: "139,92,246", delay: "4s" },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: p.w,
                height: p.w,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(${p.color},0.25), transparent)`,
                top: p.t !== "auto" ? p.t : undefined,
                bottom: p.b || undefined,
                left: p.l !== "auto" ? p.l : undefined,
                right: p.r || undefined,
                animation: `ls-float 6s ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Center content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          {/* Logo with spinning rings - CSS animations */}
          <div
            style={{
              position: "relative",
              width: 160,
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ring 1 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 130,
                height: 130,
                marginTop: -65,
                marginLeft: -65,
                border: "2px solid transparent",
                borderTopColor: "#f97316",
                borderRightColor: "#ec4899",
                borderRadius: "50%",
                animation: "ls-spin 2s linear infinite",
                boxSizing: "border-box",
              }}
            />
            {/* Ring 2 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 150,
                height: 150,
                marginTop: -75,
                marginLeft: -75,
                border: "2px solid transparent",
                borderTopColor: "#8b5cf6",
                borderRightColor: "#38bdf8",
                borderRadius: "50%",
                animation: "ls-spin 3s linear infinite reverse",
                boxSizing: "border-box",
              }}
            />
            {/* Logo box */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: 72,
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                backgroundImage: "url('/zi-logo.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
              }}
            />
          </div>

          {/* Brand name */}
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.25rem)",
                fontWeight: 800,
                background: "linear-gradient(90deg, #ec4899, #f59e0b, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              ZI PREMIUM SERVICES
            </h1>
            <p
              style={{
                marginTop: 8,
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                color: "rgba(196, 181, 253, 0.7)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Your Digital Gateway
            </p>
          </div>

          {/* Progress bar - Pure CSS animation */}
          <div style={{ width: "min(320px, 80vw)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: "100%",
                height: 6,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                className="ls-progress-bar"
                style={{
                  height: "100%",
                  borderRadius: 9999,
                  background: "linear-gradient(90deg, #fb923c, #ec4899, #8b5cf6)",
                  boxShadow: "0 0 12px rgba(236, 72, 153, 0.4)",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "rgba(196, 181, 253, 0.5)",
                letterSpacing: "0.1em",
              }}
            >
              Loading...
            </span>
          </div>

          {/* Animated dots - CSS only */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[0, 0.2, 0.4].map((delay) => (
              <span
                key={delay}
                style={{
                  display: "block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f97316, #ec4899)",
                  animation: "ls-bounce 1.4s infinite ease-in-out both",
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
