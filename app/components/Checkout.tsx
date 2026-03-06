"use client";

import React from "react";
import type { CartItem } from "../types";
import OrderSummary from "./checkout/OrderSummary";
import PaymentMethod from "./checkout/PaymentMethod";
import PaymentInstructions from "./checkout/PaymentInstructions";
import PaymentDetails from "./checkout/PaymentDetails";

export interface CheckoutProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  paymentMethod: "bkash" | "nagad" | "paycrypto";
  setPaymentMethod: (method: "bkash" | "nagad" | "paycrypto") => void;
  payerNumber: string;
  setPayerNumber: (value: string) => void;
  trxId: string;
  setTrxId: (value: string) => void;
  copiedAddress: boolean;
  setCopiedAddress: (value: boolean) => void;
  getTotalPrice: () => number;
  onOrderConfirmed: () => void;
  cryptoCurrency?: string;
  setCryptoCurrency?: (value: string) => void;
  paymentType?: "network" | "uid";
  setPaymentType?: (value: "network" | "uid") => void;
  selectedNetwork?: string;
  setSelectedNetwork?: (value: string) => void;
  selectedPlatform?: string;
  setSelectedPlatform?: (value: string) => void;
  onAlert?: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => void;
}

export default function Checkout({
  cart,
  setCart,
  paymentMethod,
  setPaymentMethod,
  payerNumber,
  setPayerNumber,
  trxId,
  setTrxId,
  copiedAddress,
  setCopiedAddress,
  getTotalPrice,
  onOrderConfirmed,
  cryptoCurrency = "USDT",
  setCryptoCurrency = () => { },
  paymentType = "network",
  setPaymentType = () => { },
  selectedNetwork = "TRC20",
  setSelectedNetwork = () => { },
  selectedPlatform = "Binance",
  setSelectedPlatform = () => { },
  onAlert
}: CheckoutProps) {
  const hasCartItems = cart.length > 0;
  const isPayCrypto = paymentMethod === "paycrypto";
  const isBDMobileMethod = paymentMethod === "bkash" || paymentMethod === "nagad";
  const isValidBDPhoneStrict = (val: string) => /^\+8801[3-9]\d{8}$/.test(val);
  const payerFilled = isPayCrypto
    ? payerNumber.trim().length >= 10
    : isValidBDPhoneStrict(payerNumber);
  const trxFilled = trxId.trim().length >= 6;

  const canConfirm: boolean = Boolean(
    hasCartItems &&
    payerFilled &&
    ((isBDMobileMethod || (isPayCrypto && paymentType === "network")) ? trxFilled : true) &&
    (!isPayCrypto ||
      (paymentType && (paymentType === "network" ? selectedNetwork : selectedPlatform)))
  );

  const handleConfirm = () => {
    if (!canConfirm) return;
    
    // Clear cart immediately when order is submitted
    setCart([]);
    
    if (onAlert) {
      onAlert(
        'success',
        'Order Submitted',
        'Thank you! Your order has been submitted. We will verify payment and contact you shortly.',
        onOrderConfirmed
      );
    } else {
      onOrderConfirmed();
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your purchase securely
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order summary */}
          <div className="lg:col-span-2 space-y-6">
            <OrderSummary cart={cart} getTotalPrice={getTotalPrice} />

            {/* Payment method */}
            <PaymentMethod 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod}
              getTotalPrice={getTotalPrice}
            />

            {/* Payment Instructions */}
            <PaymentInstructions
              paymentMethod={paymentMethod}
              getTotalPrice={getTotalPrice}
              cryptoCurrency={cryptoCurrency}
              setCryptoCurrency={setCryptoCurrency}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              copiedAddress={copiedAddress}
              setCopiedAddress={setCopiedAddress}
            />
          </div>

          {/* Payment details */}
          {(isBDMobileMethod || isPayCrypto) && (
            <PaymentDetails
              paymentMethod={paymentMethod}
              payerNumber={payerNumber}
              setPayerNumber={setPayerNumber}
              trxId={trxId}
              setTrxId={setTrxId}
              canConfirm={canConfirm}
              onConfirm={handleConfirm}
              paymentType={paymentType}
            />
          )}
        </div>
      </div>
    </section>
  );
}
