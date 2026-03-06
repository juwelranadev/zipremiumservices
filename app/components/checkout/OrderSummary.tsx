"use client";

import React from "react";
import type { CartItem } from "../../types";

interface OrderSummaryProps {
  cart: CartItem[];
  getTotalPrice: () => number;
}

export default function OrderSummary({ cart, getTotalPrice }: OrderSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      {cart.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="font-semibold">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
          <div className="border-t pt-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-2xl font-bold text-blue-600">
              ${getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
