"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, Shield, Zap, CheckCircle2, ArrowRight, Star, X } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

export default function UserSignInPage() {
  const router = useRouter();
  const { setAlertConfig } = useShopContext();
  
  // Clear any existing alerts when component mounts
  React.useEffect(() => {
    // Clear alerts immediately and also double-check after a tiny delay
    setAlertConfig(prev => ({ ...prev, isOpen: false }));
    const clearTimer = setTimeout(() => {
      setAlertConfig(prev => ({ ...prev, isOpen: false }));
    }, 100);
    return () => clearTimeout(clearTimer);
  }, [setAlertConfig]);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [emailSuggestions, setEmailSuggestions] = React.useState<string[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = React.useState(false);

  // Email domain suggestions
  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@icloud.com'];

  // Handle email input change
  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (value && !value.includes('@')) {
      setEmailSuggestions(emailDomains.map(domain => value + domain));
      setShowEmailSuggestions(true);
    } else if (value && value.includes('@')) {
      const [local, partial] = value.split('@');
      const filtered = emailDomains
        .filter(domain => domain.slice(1).startsWith(partial || ''))
        .map(domain => local + domain);
      setEmailSuggestions(filtered);
      setShowEmailSuggestions(filtered.length > 0 && partial !== emailDomains.find(d => d.slice(1) === partial)?.slice(1));
    } else {
      setShowEmailSuggestions(false);
    }
  };

  // Accept email suggestion
  const acceptEmailSuggestion = (suggestion: string) => {
    setEmail(suggestion);
    setShowEmailSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sign-in process
    setTimeout(() => {
      // Successful login - redirect to home
      router.push('/');
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      // Successful Google login - redirect to home
      router.push('/');
      setIsGoogleLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-float"></div>
          <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400/60 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-pink-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-16 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-green-400/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-orange-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-tl-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-white/10 text-left lg:flex max-h-[90vh] lg:max-h-none">

          {/* Left Side - Visuals & Branding (Desktop Only) */}
          <div className="hidden lg:flex lg:w-5/12 p-8 xl:p-12 flex-col justify-between overflow-hidden bg-[#0F0F1A] relative">
            {/* Animated Background on Left Panel */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-pink-600/20"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

              {/* 3D Shapes / Abstract Art */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.8)]"></div>
              </div>
            </div>

            {/* Logo / Brand Area */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <img src="/zi-logo.svg" alt="ZI Logo" className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-extrabold leading-tight whitespace-nowrap">
                  <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                    ZI PREMIUM SERVICES
                  </span>
                </h1>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Back</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                Sign in to access your premium account and continue your digital journey with us.
              </p>
            </div>

            {/* Testimonial / Trust badges */}
            <div className="relative z-10 mt-12 lg:mt-0 space-y-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0F0F1A] bg-gray-700 flex items-center justify-center overflow-hidden`}>
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0F0F1A] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">+2k</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-yellow-500" /></div>
                <span className="font-medium">Trusted by premium users</span>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form (Full width on mobile, 7/12 on desktop) */}
          <div className="relative w-full lg:w-7/12 bg-gray-900/50 backdrop-blur-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto max-h-[90vh] lg:max-h-none">
            {/* Close Button */}
            <button
              onClick={() => router.push('/')}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
            >
              <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="max-w-md mx-auto w-full">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <img src="/zi-logo.svg" alt="ZI Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                      ZI PREMIUM SERVICES
                    </span>
                  </h1>
                </div>
              </div>

              <div className="text-center lg:text-left mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-sm sm:text-base text-gray-400">Welcome back! Please enter your details to sign in.</p>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 font-semibold py-3.5 px-4 rounded-xl border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden mb-5"
              >
                {/* Subtle hover shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none" />
                {isGoogleLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                )}
                <span className="relative z-10">
                  {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">or sign in with email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm sm:text-base"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === 'Tab') && showEmailSuggestions && emailSuggestions.length > 0) {
                          e.preventDefault();
                          acceptEmailSuggestion(emailSuggestions[0]);
                        }
                      }}
                      onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
                      onFocus={() => {
                        if (email && !email.includes('@')) {
                          setEmailSuggestions(emailDomains.map(domain => email + domain));
                          setShowEmailSuggestions(true);
                        }
                      }}
                      required
                      autoComplete="off"
                    />
                    {/* Email Suggestions Dropdown */}
                    {showEmailSuggestions && emailSuggestions.length > 0 && (
                      <div className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden border border-purple-400/40 bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-purple-500/20">
                        {emailSuggestions.map((suggestion, index) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => acceptEmailSuggestion(suggestion)}
                            className={`w-full text-left px-4 py-3 hover:bg-purple-500/20 transition-colors flex items-center gap-3 ${index === 0 ? 'bg-purple-500/10' : ''}`}
                          >
                            <Mail className="w-4 h-4 text-purple-400" />
                            <span className="text-white text-sm">{suggestion}</span>
                            {index === 0 && (
                              <span className="ml-auto text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">Press Tab</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm sm:text-base"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-5 h-5 border-2 border-purple-400/50 rounded-md peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all"></div>
                      <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-purple-400 hover:text-pink-400 transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-400/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-purple-300/70">or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-xl border border-purple-500/20">
                <p className="text-purple-200/80 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/sign-up')}
                    className="text-transparent bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text hover:from-pink-300 hover:to-orange-300 font-bold transition-all inline-flex items-center gap-1 group text-sm sm:text-base"
                  >
                    Sign Up Now
                    <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
