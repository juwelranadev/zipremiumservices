'use client';

import { useState } from 'react';
import DashboardTab from '../../components/DashboardTab';
import AddProductModal from '../../components/AddProductModal';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Mock data
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Netflix Premium', amount: '$15.99', status: 'Completed', date: '2024-12-03', createdTime: '2024-12-03 10:30:00' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Spotify Family', amount: '$19.99', status: 'Pending', date: '2024-12-03', createdTime: '2024-12-03 14:15:00' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'YouTube Premium', amount: '$11.99', status: 'Completed', date: '2024-12-02', createdTime: '2024-12-02 09:45:00' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Disney+ Bundle', amount: '$24.99', status: 'Processing', date: '2024-12-02', createdTime: '2024-12-02 16:20:00' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Amazon Prime', amount: '$14.99', status: 'Completed', date: '2024-12-01', createdTime: '2024-12-01 11:00:00' },
  ];

  const topProducts = [
    { name: 'Netflix Premium', sales: 234, revenue: '$3,742', trend: '+12%', category: 'Entertainment', priceBDT: 1750, priceUSDT: 15.99, stock: 1000, description: 'Premium streaming service', imageUrl: '', featured: true, available: true },
    { name: 'Spotify Family', sales: 189, revenue: '$3,778', trend: '+8%', category: 'Entertainment', priceBDT: 2200, priceUSDT: 19.99, stock: 500, description: 'Music streaming for family', imageUrl: '', featured: true, available: true },
    { name: 'YouTube Premium', sales: 156, revenue: '$1,870', trend: '+15%', category: 'Entertainment', priceBDT: 1300, priceUSDT: 11.99, stock: 750, description: 'Ad-free videos', imageUrl: '', featured: false, available: true },
    { name: 'Disney+ Bundle', sales: 142, revenue: '$3,548', trend: '+5%', category: 'Entertainment', priceBDT: 2750, priceUSDT: 24.99, stock: 300, description: 'Disney streaming bundle', imageUrl: '', featured: true, available: true },
    { name: 'Amazon Prime', sales: 128, revenue: '$1,919', trend: '+10%', category: 'Entertainment', priceBDT: 1650, priceUSDT: 14.99, stock: 600, description: 'Prime membership', imageUrl: '', featured: false, available: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleTabChange = (tab: string) => {
    router.push(`/admin/${tab}`);
  };

  return (
    <>
      <DashboardTab
        recentOrders={recentOrders}
        topProducts={topProducts}
        getStatusColor={getStatusColor}
        setActiveTab={handleTabChange}
        setShowProductModal={setShowProductModal}
        setEditingProduct={setEditingProduct}
      />
      
      <AddProductModal 
        showModal={showProductModal} 
        setShowModal={setShowProductModal}
        editingProduct={editingProduct}
        onProductAdded={(product) => {
          if (product) {
            console.log('Product added/updated:', product);
          }
          setEditingProduct(null);
        }}
      />
    </>
  );
}
