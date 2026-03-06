import React from 'react';
import { X, Mail, User, Eye, EyeOff, Shield, CheckCircle2, Zap, ArrowRight, Star } from 'lucide-react';

export interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (userData: { name: string; email: string; phone: string; password: string }) => void;
  onSignIn: () => void;
  onGoogleSignUp?: () => void;
  onAlert?: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => void;
}

export default function SignUpModal({ isOpen, onClose, onSignUp, onSignIn, onGoogleSignUp, onAlert }: SignUpModalProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [emailSuggestions, setEmailSuggestions] = React.useState<string[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = React.useState(false);

  // Email domain suggestions
  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@icloud.com'];

  // Handle email input change
  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Show suggestions when user starts typing and hasn't entered @ yet
    if (value && !value.includes('@')) {
      setEmailSuggestions(emailDomains.map(domain => value + domain));
      setShowEmailSuggestions(true);
    } else if (value && value.includes('@')) {
      // Filter suggestions based on what user typed after @
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

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      if (onAlert) onAlert('error', 'Password Mismatch', 'The passwords you entered do not match. Please try again.');
      return;
    }

    setIsLoading(true);

    // Simulate sign-up process
    setTimeout(() => {
      onSignUp({ name, email, phone, password });
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      if (onGoogleSignUp) {
        onGoogleSignUp();
      } else {
        onSignUp({ name: 'Google User', email: 'user@gmail.com', phone: '', password: '' });
      }
      setIsGoogleLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        {/* Backdrop with animated gradient */}
        <div
          className="fixed inset-0 bg-gradient-to-br from-purple-900/90 via-black/95 to-pink-900/90 backdrop-blur-2xl transition-all duration-500"
          onClick={onClose}
        />

        {/* Main Container - Split Layout */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row bg-gray-900 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-slide-up text-left">

          {/* Left Side - Visuals & Branding */}
          <div className="hidden lg:flex lg:w-5/12 p-12 flex-col justify-between overflow-hidden bg-[#0F0F1A] relative">
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
                  <img src="/zi-logo.svg" alt="ZI Logo" className="w-8 h-8" loading="lazy" />
                </div>
                <h1 className="text-2xl font-extrabold leading-tight whitespace-nowrap">
                  <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                    ZI PREMIUM SERVICES
                  </span>
                </h1>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Premium</span> Journey.
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                Join thousands of users who are already experiencing the future of digital services. Secure, fast, and exclusive.
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
                <span className="font-medium">Trusted by top developers</span>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="relative w-full lg:w-7/12 bg-gray-900/50 backdrop-blur-3xl p-5 sm:p-10 md:p-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-md mx-auto">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <img src="/zi-logo.svg" alt="ZI Logo" className="w-8 h-8" loading="lazy" />
                  </div>
                  <h1 className="text-xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                      ZI PREMIUM SERVICES
                    </span>
                  </h1>
                </div>
              </div>

              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create an Account</h2>
                <p className="text-gray-400">Please enter your details to sign up to ZI PREMIUM SERVICES.</p>
              </div>

              {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
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
                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">or sign up with email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onFocus={() => {
                        if (email && !email.includes('@')) {
                          setEmailSuggestions(emailDomains.map(domain => email + domain));
                          setShowEmailSuggestions(true);
                        }
                      }}
                      onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
                      required
                    />
                    {/* Email Suggestions */}
                    {showEmailSuggestions && emailSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                        {emailSuggestions.map((suggestion) => (
                          <button
                            type="button"
                            key={suggestion}
                            onClick={() => acceptEmailSuggestion(suggestion)}
                            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-purple-500/20 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <Mail className="w-3 h-3" /> {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative group">
                    <input
                      type="tel"
                      className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono"
                      placeholder="+880 1XXX-XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>


                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-gray-800/50 border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-1">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirm</label>
                    <div className="relative group">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`w-full bg-gray-800/50 border rounded-xl pl-4 pr-10 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${confirmPassword && password !== confirmPassword
                          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500'
                          : 'border-white/10 focus:ring-purple-500/20 focus:border-purple-500'
                          }`}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      {confirmPassword && password === confirmPassword && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-in fade-in zoom-in" />
                      )}
                    </div>
                  </div>
                </div>



                {/* Agreements */}
                <div className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-800/50"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400 leading-tight select-none cursor-pointer">
                    I agree to the <span className="text-purple-400 hover:text-purple-300 underline">Terms of Service</span> and <span className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</span>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !agreedToTerms}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button onClick={onSignIn} className="text-white font-semibold hover:text-purple-400 transition-colors">Sign In</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
