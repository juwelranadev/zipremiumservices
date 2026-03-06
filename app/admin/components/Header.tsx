import { Menu, Search, Bell, ChevronDown, Sparkles, Calendar, Sun, Moon, LayoutDashboard, ShoppingCart, Package, Users, Settings, Gift } from 'lucide-react';
import { useState } from 'react';

const PAGE_META: Record<string, { title: string; Icon: React.ElementType }> = {
  dashboard: { title: 'Dashboard', Icon: LayoutDashboard },
  orders: { title: 'Orders', Icon: ShoppingCart },
  products: { title: 'Products', Icon: Package },
  airdrops: { title: 'Airdrops', Icon: Gift },
  customers: { title: 'Customers', Icon: Users },
  settings: { title: 'Settings', Icon: Settings },
};

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
}

export default function Header({ setSidebarOpen, activeTab }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(true);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const { title, Icon } = PAGE_META[activeTab] ?? PAGE_META.dashboard;

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-purple-900/80 backdrop-blur-xl border-b border-white/10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {title}
              </h2>
              <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30">
                <Sparkles className="w-3 h-3 inline mr-1" />Pro
              </span>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              {currentDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-2.5 border border-white/10 hover:border-purple-500/30 transition-all group">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-64"
            />
            <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs text-gray-500 bg-white/5 rounded border border-white/10">
              /
            </kbd>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/10"
          >
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/10 group">
            <Bell className="w-5 h-5 group-hover:animate-bounce" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">3</span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-purple-300">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
