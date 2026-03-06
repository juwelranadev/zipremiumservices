'use client';

import OrdersTab from '../../components/OrdersTab';

export default function OrdersPage() {
  // Mock data
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Netflix Premium', amount: '$15.99', status: 'Completed', date: '2024-12-03', createdTime: '2024-12-03 10:30:00' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Spotify Family', amount: '$19.99', status: 'Pending', date: '2024-12-03', createdTime: '2024-12-03 14:15:00' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'YouTube Premium', amount: '$11.99', status: 'Completed', date: '2024-12-02', createdTime: '2024-12-02 09:45:00' },
    { id: '#ORD-004', customer: 'Sarah Williams', product: 'Disney+ Bundle', amount: '$24.99', status: 'Processing', date: '2024-12-02', createdTime: '2024-12-02 16:20:00' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Amazon Prime', amount: '$14.99', status: 'Completed', date: '2024-12-01', createdTime: '2024-12-01 11:00:00' },
    { id: '#ORD-006', customer: 'Emily Davis', product: 'NordVPN', amount: '$19.99', status: 'Completed', date: '2024-12-01', createdTime: '2024-12-01 15:30:00' },
    { id: '#ORD-007', customer: 'Chris Lee', product: 'Adobe Creative Suite', amount: '$59.99', status: 'Pending', date: '2024-11-30', createdTime: '2024-11-30 09:00:00' },
    { id: '#ORD-008', customer: 'Amanda White', product: 'Figma Pro', amount: '$25.00', status: 'Completed', date: '2024-11-30', createdTime: '2024-11-30 14:45:00' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return <OrdersTab orders={orders} getStatusColor={getStatusColor} />;
}
