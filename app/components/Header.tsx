import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ShoppingCart, User, Notebook, History, Sun, Moon, LogOut, Sparkles, ChevronRight } from 'lucide-react';

export interface HeaderProps {
  view: 'home' | 'checkout' | 'orders' | 'order-history' | 'order-details';
  setView: (view: HeaderProps['view']) => void;
  setIsCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement> | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  username: string;
  isLoggedIn: boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onAlert?: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => void;
}

export default function Header({
  view,
  setView,
  setIsCartOpen,
  getTotalItems,
  menuOpen,
  setMenuOpen,
  menuRef,
  theme,
  toggleTheme,
  username,
  isLoggedIn,
  onSignInClick,
  onSignUpClick,
  onAlert
}: HeaderProps) {
  const router = useRouter();
  const [isGuestMenuOpen, setGuestMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg shadow-lg sticky top-0 z-40 border-b border-purple-500/20 relative">
      <div className="w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-14 sm:min-h-16 py-2">

          {/* Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 group">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-350 to-purple-600 rounded-lg shadow-lg flex-shrink-0">
              <img src="/zi-logo.svg" alt="ZI PREMIUM SERVICES Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="sm:text-2xl md:text-3xl font-extrabold leading-tight whitespace-nowrap" style={{ fontSize: 'clamp(0.8rem, 4.5vw, 1.5rem)' }}>
                <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm transition-all">
                  ZI PREMIUM SERVICES
                </span>
              </h1>
              <p className="text-xs text-gray-300">Your Digital Gateway</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { router.push('/'); setView('home'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg active:translate-y-[1px]"
                  aria-label="Go to Home"
                >
                  <Home className="w-5 h-5" />
                </button>
                {view === 'checkout' && (
                  <button onClick={() => { 
                    router.push('/'); 
                    setView('home'); 
                    setTimeout(() => {
                      const productsSection = document.getElementById('products');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }} className="hidden md:inline-flex px-3 py-2 text-sm rounded-lg border border-purple-500/30 hover:bg-white/10 text-gray-200">
                    Continue Shopping
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md text-[10px]">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* Menu Button */}
                <button
                  onClick={() => {
                    console.log('Menu button clicked, current menuOpen:', menuOpen);
                    setMenuOpen(!menuOpen);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className={`relative flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300
                    ${menuOpen
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/40 scale-95'
                      : 'bg-white/5 border border-purple-500/30 hover:bg-white/10 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20'
                    }`}
                >
                  {menuOpen && <span className="absolute inset-0 rounded-xl animate-ping bg-purple-500/30 pointer-events-none" style={{ animationDuration: '1.5s' }} />}
                  <span className="relative w-5 h-5 flex flex-col items-center justify-center gap-[5px]">
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-3.5 self-start'}`} />
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
                  </span>
                </button>
              </>
            ) : (
              <>
                <button onClick={onSignInClick} className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium border border-purple-500/30 rounded-lg hover:bg-white/10 text-gray-200 transition-all">
                  Sign In
                </button>
                <button onClick={onSignUpClick} className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md">
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    console.log('Guest menu button clicked, current isGuestMenuOpen:', isGuestMenuOpen);
                    setGuestMenuOpen(!isGuestMenuOpen);
                  }}
                  className="sm:hidden p-1.5 rounded-lg border border-purple-500/30 hover:bg-white/10 text-gray-200 flex-shrink-0"
                >
                  <span className="relative w-5 h-5 flex flex-col items-center justify-center gap-[5px]">
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${isGuestMenuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${isGuestMenuOpen ? 'w-0 opacity-0' : 'w-3.5 self-start'}`} />
                    <span className={`block h-[2px] rounded-full bg-white transition-all duration-300 origin-center ${isGuestMenuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Guest Dropdown ── */}
      {isGuestMenuOpen && !isLoggedIn && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 w-64 rounded-bl-2xl overflow-hidden z-[9999] shadow-2xl shadow-purple-900/50 border-l border-b border-white/10"
          style={{ background: 'linear-gradient(135deg, rgba(15,10,40,0.97) 0%, rgba(30,15,60,0.97) 100%)', backdropFilter: 'blur(20px)' }}
        >
          <div className="p-3 space-y-2">
            <button onClick={() => { onSignInClick(); setGuestMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium border border-purple-500/30 rounded-xl hover:bg-purple-500/20 text-gray-200 transition-all">Sign In</button>
            <button onClick={() => { onSignUpClick(); setGuestMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-md">Sign Up</button>
          </div>
        </div>
      )}

      {/* ── Premium Dropdown (card-style, fixed) ── */}
      {menuOpen && isLoggedIn && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 rounded-bl-2xl z-[9999] shadow-2xl shadow-purple-900/70 border-l border-b border-white/8"
          style={{
            width: 'min(340px, calc(100vw - 2rem))',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'linear-gradient(160deg, rgba(10,6,30,0.98) 0%, rgba(20,10,48,0.98) 60%, rgba(28,8,42,0.98) 100%)',
            backdropFilter: 'blur(28px)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(168,85,247,0.3) transparent',
          }}
        >
          {/* Top accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400" />

          <div className="p-3 space-y-2">

            {/* ── Profile Card ── */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.35) 0%, rgba(157,23,77,0.2) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/10 pointer-events-none" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex items-center gap-4 px-4 py-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 animate-spin" style={{ animationDuration: '4s' }} />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl shadow-purple-500/50 border-2 border-[#0a061e]">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0a061e] shadow-sm shadow-green-400/60" />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-white flex items-center gap-1.5 mb-0.5">
                    <span className="truncate">{username}</span>
                  </div>
                  <div className="text-xs text-purple-300/70 truncate mb-2">zi@example.com</div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Premium Member
                  </span>
                </div>
              </div>
            </div>

            {/* ── My Orders ── */}
            <button
              onClick={() => { setMenuOpen(false); setView('orders'); router.push("/"); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group/item relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover/item:from-purple-600/15 group-hover/item:to-pink-600/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/15 group-hover/item:bg-purple-500/30 transition-colors border border-purple-500/20 group-hover/item:border-purple-400/50 flex-shrink-0">
                <Notebook className="w-5 h-5 text-purple-400 group-hover/item:text-purple-300" />
              </span>
              <span className="relative flex-1 text-left">
                <span className="block text-sm font-semibold whitespace-nowrap">My Orders</span>
                <span className="block text-xs text-gray-500 group-hover/item:text-gray-400 whitespace-nowrap">View your active orders</span>
              </span>
              <ChevronRight className="relative w-4 h-4 text-gray-600 group-hover/item:text-purple-400 group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
            </button>

            {/* ── Order History ── */}
            <button
              onClick={() => { setMenuOpen(false); setView('order-history'); router.push("/order-history"); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group/item relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover/item:from-blue-600/15 group-hover/item:to-cyan-600/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/15 group-hover/item:bg-blue-500/30 transition-colors border border-blue-500/20 group-hover/item:border-blue-400/50 flex-shrink-0">
                <History className="w-5 h-5 text-blue-400 group-hover/item:text-blue-300" />
              </span>
              <span className="relative flex-1 text-left">
                <span className="block text-sm font-semibold whitespace-nowrap">Order History</span>
                <span className="block text-xs text-gray-500 group-hover/item:text-gray-400 whitespace-nowrap">Browse past purchases</span>
              </span>
              <ChevronRight className="relative w-4 h-4 text-gray-600 group-hover/item:text-blue-400 group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
            </button>

            {/* ── Theme ── */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group/item relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 to-orange-600/0 group-hover/item:from-amber-600/15 group-hover/item:to-orange-600/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 group-hover/item:bg-amber-500/30 transition-colors border border-amber-500/20 group-hover/item:border-amber-400/50 flex-shrink-0">
                {theme === 'dark'
                  ? <Moon className="w-5 h-5 text-amber-400 group-hover/item:text-amber-300" />
                  : <Sun className="w-5 h-5 text-amber-400 group-hover/item:text-amber-300" />
                }
              </span>
              <span className="relative flex-1 text-left">
                <span className="block text-sm font-semibold whitespace-nowrap">Theme</span>
                <span className="block text-xs text-gray-500 group-hover/item:text-gray-400 whitespace-nowrap">Switch appearance</span>
              </span>
              <span className={`relative flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap
                ${theme === 'dark' ? 'text-indigo-300 bg-indigo-500/20 border-indigo-500/40' : 'text-amber-300 bg-amber-500/20 border-amber-500/40'}`}>
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </span>
            </button>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent mx-1" />

            {/* ── Sign Out ── */}
            <button
              onClick={() => {
                setMenuOpen(false);
                if (onAlert) onAlert('success', 'Logged Out', 'You have been signed out successfully.');
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200 group/item relative overflow-hidden"
              style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-red-500/0 group-hover/item:bg-red-500/10 transition-all duration-300" />
              <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 group-hover/item:bg-red-500/20 transition-colors border border-red-500/20 group-hover/item:border-red-400/50 flex-shrink-0">
                <LogOut className="w-5 h-5 group-hover/item:translate-x-0.5 transition-transform" />
              </span>
              <span className="relative flex-1 text-left">
                <span className="block text-sm font-semibold whitespace-nowrap">Sign Out</span>
                <span className="block text-xs text-red-500/60 group-hover/item:text-red-400/80 whitespace-nowrap">End your session</span>
              </span>
            </button>

          </div>

          {/* Bottom accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600" />
        </div>
      )}

      {/* Header Bottom Accent "Edge" */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-80 shadow-[0_1px_10px_rgba(168,85,247,0.5)] z-[10000]" />
    </header>
  );
}
