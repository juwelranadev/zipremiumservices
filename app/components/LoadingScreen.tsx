"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  // Function to detect internet speed
  const detectInternetSpeed = async () => {
    const startTime = Date.now();
    const imageUrl = "https://picsum.photos/seed/speedtest/100/100.jpg";
    
    try {
      const response = await fetch(imageUrl, { cache: "no-store" });
      const blob = await response.blob();
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // in seconds
      const fileSize = blob.size / 1024 / 1024; // in MB
      const speedMbps = (fileSize / duration) * 8; // Convert to Mbps
      
      return speedMbps;
    } catch (error) {
      return 1; // Default to 1 Mbps if detection fails
    }
  };

  // Function to preload critical assets
  const preloadCriticalAssets = () => {
    const criticalAssets = [
      '/zi-logo.svg',
      '/images/binance-logo.webp',
      '/images/bkash-logo.webp',
      '/images/nagad-logo.webp',
      '/images/bitget-logo.webp',
      '/images/rocket-logo.webp'
    ];

    const promises = criticalAssets.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    });

    return Promise.all(promises);
  };

  // Function to check if fonts are loaded
  const checkFontsLoaded = () => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => resolve(true));
      } else {
        setTimeout(() => resolve(true), 1000); // Fallback
      }
    });
  };

  useEffect(() => {
    const initLoading = async () => {
      setLoadingStatus("Detecting connection speed...");
      
      // Detect internet speed
      const speed = await detectInternetSpeed();
      
      // Calculate base duration based on speed (faster = shorter minimum time)
      let baseDuration = 2000; // Default for slow connections
      if (speed > 10) baseDuration = 1500; // Fast connection
      else if (speed > 5) baseDuration = 2000; // Medium connection
      else if (speed > 1) baseDuration = 3000; // Slow connection
      else baseDuration = 4000; // Very slow connection

      setLoadingStatus("Loading assets...");
      
      // Start asset loading in parallel
      const assetPromise = preloadCriticalAssets();
      const fontPromise = checkFontsLoaded();
      
      // Progress simulation based on actual loading
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= 85) {
          clearInterval(progressInterval);
        }
        setProgress(currentProgress);
      }, baseDuration / 42); // Reach 85% by the time assets should be loaded

      // Wait for assets to actually load
      const [assetsLoaded, fontsLoaded] = await Promise.all([assetPromise, fontPromise]);
      
      clearInterval(progressInterval);
      
      setLoadingStatus("Finalizing...");
      
      // Move to 100% when assets are loaded
      const finalProgress = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(finalProgress);
            
            // Trigger exit sequence only when 100% is reached and assets are loaded
            setFadeOut(true);
            setTimeout(() => {
              handleFinish();
            }, 600);
            
            return 100;
          }
          return next;
        });
      }, 50);
    };

    initLoading();
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
        {/* Background particles */}
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
          {/* Logo with spinning rings */}
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
                backgroundSize: "contain",   // or "cover" if you want it cropped
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

          {/* Progress bar */}
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
                style={{
                  height: "100%",
                  borderRadius: 9999,
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #fb923c, #ec4899, #8b5cf6)",
                  transition: "width 100ms linear",
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
              {loadingStatus} {Math.round(progress)}%
            </span>
          </div>

          {/* Animated dots */}
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
