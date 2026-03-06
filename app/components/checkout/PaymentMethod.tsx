"use client";

import React from "react";
import { Wallet, Copy } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: "bkash" | "nagad" | "paycrypto";
  setPaymentMethod: (method: "bkash" | "nagad" | "paycrypto") => void;
  getTotalPrice: () => number;
}

export default function PaymentMethod({ 
  paymentMethod, 
  setPaymentMethod, 
  getTotalPrice 
}: PaymentMethodProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <div className="space-y-4">
        {/* bKash */}
        <label
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
            paymentMethod === "bkash"
              ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-pink-600" />
            <div>
              <div className="font-medium">bKash</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Send money to merchant number
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "bkash"}
            onChange={() => setPaymentMethod("bkash")}
          />
        </label>

        {/* Nagad */}
        <label
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
            paymentMethod === "nagad"
              ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-medium">Nagad</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Send money to merchant number
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "nagad"}
            onChange={() => setPaymentMethod("nagad")}
          />
        </label>

        {/* Pay Crypto */}
        <label
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer ${
            paymentMethod === "paycrypto"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ₿
            </div>
            <div>
              <div className="font-medium">Pay Crypto</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Multiple cryptocurrencies supported
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "paycrypto"}
            onChange={() => setPaymentMethod("paycrypto")}
          />
        </label>
      </div>
    </div>
  );
}
