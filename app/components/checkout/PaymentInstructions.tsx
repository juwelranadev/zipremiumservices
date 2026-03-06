"use client";

import React from "react";
import { Copy } from "lucide-react";

interface PaymentInstructionsProps {
  paymentMethod: "bkash" | "nagad" | "paycrypto";
  getTotalPrice: () => number;
  cryptoCurrency?: string;
  setCryptoCurrency?: (value: string) => void;
  paymentType?: "network" | "uid";
  setPaymentType?: (value: "network" | "uid") => void;
  selectedNetwork?: string;
  setSelectedNetwork?: (value: string) => void;
  selectedPlatform?: string;
  setSelectedPlatform?: (value: string) => void;
  copiedAddress: boolean;
  setCopiedAddress: (value: boolean) => void;
}

export default function PaymentInstructions({
  paymentMethod,
  getTotalPrice,
  cryptoCurrency = "USDT",
  setCryptoCurrency = () => { },
  paymentType = "network",
  setPaymentType = () => { },
  selectedNetwork = "TRC20",
  setSelectedNetwork = () => { },
  selectedPlatform = "Binance",
  setSelectedPlatform = () => { },
  copiedAddress,
  setCopiedAddress
}: PaymentInstructionsProps) {
  
  const cryptoAddresses = {
    TRC20: "TXYZopQOMcEZ6JqZJzZjZzZzZzZzZzZzZ",
    ERC20: "0x742d35Cc6534452C5C44A9b4F4B4B4B4B4B4B4B4B4B4B4",
  };

  const cryptoUIDs = {
    Binance: "123456789",
    Bybit: "987654321",
    Bitget: "456789123",
    MEXC: "789123456",
  };

  const isPayCrypto = paymentMethod === "paycrypto";

  // bKash instructions
  if (paymentMethod === "bkash") {
    return (
      <div className="mt-2 rounded-xl border border-pink-200 dark:border-pink-400/30 bg-pink-50 dark:bg-pink-500/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              bKash Number
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white allow-copy">
              01733019261
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText("01733019261")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-pink-600 border border-pink-200 dark:border-pink-400/40 hover:bg-pink-100 dark:hover:bg-pink-500/10"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
        <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
          <li>Open bKash app and choose Send Money</li>
          <li>Enter the number above and amount: ${getTotalPrice().toFixed(2)}</li>
          <li>Confirm payment and copy the Transaction ID</li>
        </ul>
      </div>
    );
  }

  // Nagad instructions
  if (paymentMethod === "nagad") {
    return (
      <div className="mt-2 rounded-xl border border-orange-200 dark:border-orange-400/30 bg-orange-50 dark:bg-orange-500/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Nagad Number
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white allow-copy">
              01733019261
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText("01733019261")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-orange-600 border border-orange-200 dark:border-orange-400/40 hover:bg-orange-100 dark:hover:bg-orange-500/10"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
        <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
          <li>Open Nagad app and choose Send Money</li>
          <li>Enter the number above and amount: ${getTotalPrice().toFixed(2)}</li>
          <li>Confirm payment and copy the Transaction ID</li>
        </ul>
      </div>
    );
  }

  // Pay Crypto instructions
  if (isPayCrypto) {
    return (
      <div className="mt-2 rounded-xl border border-purple-200 dark:border-purple-400/30 bg-purple-50 dark:bg-purple-500/10 p-4">
        <div className="space-y-4">
          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Currency
            </label>
            <select
              value={cryptoCurrency}
              onChange={(e) => setCryptoCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          {/* Payment Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pay Via
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as "network" | "uid")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="network">Network</option>
              <option value="uid">UID</option>
            </select>
          </div>

          {/* Conditional UI based on payment type */}
          {paymentType === "network" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Network
              </label>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="TRC20">TRC20</option>
                <option value="ERC20">ERC20</option>
              </select>

              {/* Payment Address Display */}
              <div className="mt-3">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Payment Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cryptoAddresses[selectedNetwork as keyof typeof cryptoAddresses]}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        cryptoAddresses[selectedNetwork as keyof typeof cryptoAddresses]
                      );
                      setCopiedAddress(true);
                      setTimeout(() => setCopiedAddress(false), 2000);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-purple-600 border border-purple-200 dark:border-purple-400/40 hover:bg-purple-100 dark:hover:bg-purple-500/10"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedAddress ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {paymentType === "uid" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Platform
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="Binance">Binance</option>
                <option value="Bybit">Bybit</option>
                <option value="Bitget">Bitget</option>
                <option value="MEXC">MEXC</option>
              </select>

              {/* Payment UID Display */}
              <div className="mt-3">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Payment UID
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cryptoUIDs[selectedPlatform as keyof typeof cryptoUIDs]}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        cryptoUIDs[selectedPlatform as keyof typeof cryptoUIDs]
                      );
                      setCopiedAddress(true);
                      setTimeout(() => setCopiedAddress(false), 2000);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-transparent text-purple-600 border border-purple-200 dark:border-purple-400/40 hover:bg-purple-100 dark:hover:bg-purple-500/10"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedAddress ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
              <li>Send exact amount: ${getTotalPrice().toFixed(2)}</li>
              <li>Transaction hash will be your receipt</li>
              <li>Payment will be verified manually for security</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
