'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.push('/admin/login');
  };

  // Get active tab from pathname
  const getActiveTab = () => {
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/products')) return 'products';
    if (pathname.includes('/airdrops')) return 'airdrops';
    if (pathname.includes('/customers')) return 'customers';
    if (pathname.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero Section */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-background.webp')" }}
      ></div>

      {/* Dark Overlay for better readability */}
      <div className="fixed inset-0 bg-black/60"></div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Sidebar Component */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={getActiveTab()}
          handleLogout={handleLogout}
        />

        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Header Component */}
          <Header setSidebarOpen={setSidebarOpen} activeTab={getActiveTab()} />

          {/* Page Content */}
          <main className="p-6 space-y-6">
            {children}
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
