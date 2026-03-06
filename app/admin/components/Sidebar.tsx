import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut, X, Sparkles, TrendingUp, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  handleLogout: () => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, handleLogout }: SidebarProps) {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard', href: '/admin/dashboard', badge: null },
    { name: 'Orders', icon: ShoppingCart, id: 'orders', href: '/admin/orders', badge: '12' },
    { name: 'Products', icon: Package, id: 'products', href: '/admin/products', badge: null },
    { name: 'Airdrops', icon: Gift, id: 'airdrops', href: '/admin/airdrops', badge: 'New' },
    { name: 'Customers', icon: Users, id: 'customers', href: '/admin/customers', badge: '5' },
    { name: 'Settings', icon: Settings, id: 'settings', href: '/admin/settings', badge: null },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-purple-900/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl blur-lg opacity-40 animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-purple-500/30">
                <Image
                  src="/zi-logo.svg"
                  alt="ZI Premium Services Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>

            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent whitespace-nowrap tracking-wide drop-shadow-sm">
                ZI PREMIUM SERVICES
              </h1>
              <p className="text-xs text-purple-300/70 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" /> Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Mini Card */}
        <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-300">Today's Revenue</span>
            <span className="flex items-center text-xs text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" /> +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">$2,450</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3">Main Menu</p>
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group relative w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === item.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${activeTab === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-500/20 text-purple-400'
                  }`}>
                  {item.badge}
                </span>
              )}
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
            </Link>
          ))}
        </nav>


        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
