import type React from 'react';
import { History, Notebook, Star, Zap, Shield, ChevronRight, Mail, Phone, MapPin, Send, Plus, Minus, ShoppingCart, Headset, Gift, ArrowLeftRight, Repeat, Coins, BookOpen, Sparkle, MessageCircle, QrCode, ChevronDown, AlertCircle, Check, Home } from "lucide-react";

export interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  icon: React.ReactNode;
  features: string[];
  rating: number;
  reviews: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  trxId: string;
  payerNumber: string;
}

export interface OrderHistoryProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
}

export default function OrderHistory({ orders, onSelectOrder, onReorder }: OrderHistoryProps) {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Order History
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View all your past orders
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : order.status === "processing"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : order.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ৳{order.total}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Items:
                  </h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Payment Details:
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Method:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        TrxID:
                      </span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {order.trxId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onSelectOrder(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
                {order.status === "completed" && (
                  <button
                    onClick={() => onReorder(order)}
                    className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20 transition-colors"
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Order History
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
