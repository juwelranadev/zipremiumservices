'use client';

import { useState } from 'react';
import ProductsTab from '../../components/ProductsTab';
import AddProductModal from '../../components/AddProductModal';

export default function ProductsPage() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Mock data
  const products = [
    { name: 'Netflix Premium', sales: 234, revenue: '$3,742', trend: '+12%', category: 'Entertainment', priceBDT: 1750, priceUSDT: 15.99, stock: 1000, description: 'Premium streaming service with 4K content', imageUrl: '', featured: true, available: true },
    { name: 'Spotify Family', sales: 189, revenue: '$3,778', trend: '+8%', category: 'Entertainment', priceBDT: 2200, priceUSDT: 19.99, stock: 500, description: 'Music streaming for up to 6 family members', imageUrl: '', featured: true, available: true },
    { name: 'YouTube Premium', sales: 156, revenue: '$1,870', trend: '+15%', category: 'Entertainment', priceBDT: 1300, priceUSDT: 11.99, stock: 750, description: 'Ad-free videos and background play', imageUrl: '', featured: false, available: true },
    { name: 'Disney+ Bundle', sales: 142, revenue: '$3,548', trend: '+5%', category: 'Entertainment', priceBDT: 2750, priceUSDT: 24.99, stock: 300, description: 'Disney+, Hulu, and ESPN+ bundle', imageUrl: '', featured: true, available: true },
    { name: 'Amazon Prime', sales: 128, revenue: '$1,919', trend: '+10%', category: 'Entertainment', priceBDT: 1650, priceUSDT: 14.99, stock: 600, description: 'Free shipping and streaming', imageUrl: '', featured: false, available: true },
    { name: 'Adobe Creative Suite', sales: 98, revenue: '$4,950', trend: '+18%', category: 'Design', priceBDT: 6600, priceUSDT: 59.99, stock: 200, description: 'Complete creative software suite', imageUrl: '', featured: true, available: true },
    { name: 'Figma Pro', sales: 87, revenue: '$2,175', trend: '+22%', category: 'Design', priceBDT: 2750, priceUSDT: 25.00, stock: 400, description: 'Collaborative design tool', imageUrl: '', featured: false, available: true },
    { name: 'NordVPN', sales: 203, revenue: '$4,060', trend: '+7%', category: 'Security', priceBDT: 2200, priceUSDT: 19.99, stock: 800, description: 'Secure VPN service worldwide', imageUrl: '', featured: true, available: true },
    { name: 'ExpressVPN', sales: 176, revenue: '$3,520', trend: '+9%', category: 'Security', priceBDT: 2200, priceUSDT: 20.00, stock: 350, description: 'High-speed VPN encryption', imageUrl: '', featured: false, available: true },
    { name: 'LinkedIn Premium', sales: 65, revenue: '$1,950', trend: '+11%', category: 'Social Services', priceBDT: 3300, priceUSDT: 30.00, stock: 250, description: 'Professional networking features', imageUrl: '', featured: false, available: true },
  ];

  return (
    <>
      <ProductsTab 
        products={products} 
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
