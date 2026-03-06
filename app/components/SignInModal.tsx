import React from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => void;
  onSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onSignIn, onSignUp }: SignInModalProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
      onSignIn(email, password);
      setEmail('');
      setPassword('');
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {/* Modal Content */}
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl transform transition-all">

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

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Animated Icon */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 transform hover:scale-110 hover:rotate-3 transition-all duration-500 group">
                  <User className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-2xl"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-purple-900 shadow-lg shadow-green-500/40 animate-bounce" style={{ animationDuration: '2s' }}>
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                {/* Orbiting dot */}
                <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2 animate-gradient-x">
                Welcome Back
              </h2>
              <p className="text-purple-200/80">Sign in to continue your journey</p>

              {/* Feature badges */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-green-500/30 hover:scale-105 transition-transform cursor-default">
                  <Shield className="w-3.5 h-3.5 text-green-400" /> Secure
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-yellow-500/30 hover:scale-105 transition-transform cursor-default">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" /> Fast
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-purple-500/30 hover:scale-105 transition-transform cursor-default">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Easy
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-purple-500/30">1</span>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                  <input
                    type="email"
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
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-purple-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>

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
                          <span className="text-white">{suggestion}</span>
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
              <div className="group">
                <label className="block text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-pink-500/30">2</span>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/5 border-2 border-purple-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                    ) : (
                      <Eye className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
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
                className="relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-purple-500/30 overflow-hidden group/btn transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {/* Animated border */}
                <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500"></span>
                </span>

                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-xl animate-ping bg-pink-400/20 opacity-0 group-hover/btn:opacity-50" style={{ animationDuration: '1.5s' }}></span>

                {/* Button background */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500"></span>

                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>

                {/* Secondary sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 transform skew-x-12 translate-x-full group-hover/btn:-translate-x-full transition-transform duration-700 delay-100"></span>

                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </span>
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
              <p className="text-purple-200/80">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="text-transparent bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text hover:from-pink-300 hover:to-orange-300 font-bold transition-all inline-flex items-center gap-1 group"
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
  );
}
