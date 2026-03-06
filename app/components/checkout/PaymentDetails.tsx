"use client";

import React from "react";

interface PaymentDetailsProps {
  paymentMethod: "bkash" | "nagad" | "paycrypto";
  payerNumber: string;
  setPayerNumber: (value: string) => void;
  trxId: string;
  setTrxId: (value: string) => void;
  canConfirm: boolean;
  onConfirm: () => void;
  paymentType?: "network" | "uid";
}

export default function PaymentDetails({
  paymentMethod,
  payerNumber,
  setPayerNumber,
  trxId,
  setTrxId,
  canConfirm,
  onConfirm,
  paymentType = "network"
}: PaymentDetailsProps) {
  
  const isPayCrypto = paymentMethod === "paycrypto";
  const isBDMobileMethod = paymentMethod === "bkash" || paymentMethod === "nagad";
  const isValidBDPhoneStrict = (val: string) => /^\+8801[3-9]\d{8}$/.test(val);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            {isPayCrypto && paymentType === "network"
              ? "Your Wallet Address"
              : isPayCrypto && paymentType === "uid"
                ? "Your UID"
                : "Your Payment Number"}
          </label>
          <input
            type={isPayCrypto ? "text" : "tel"}
            value={payerNumber}
            onChange={(e) => {
              if (isBDMobileMethod) {
                let v = e.target.value;
                v = v.replace(/[^+\d]/g, "");
                if (v === "+") v = "+880";
                if (v.startsWith("880")) v = "+" + v;
                if (v.startsWith("01")) v = "+880" + v.slice(1);
                if (v.startsWith("1")) v = "+880" + v;
                if (!v.startsWith("+880")) {
                  if (v === "" || v === "+") v = "+880";
                }
                if (v.length > 14) v = v.slice(0, 14);
                setPayerNumber(v);
              } else {
                // For crypto network mode, just set the value directly
                setPayerNumber(e.target.value);
              }
            }}
            placeholder={isPayCrypto && paymentType === "network" ? "Enter your wallet address" : isPayCrypto && paymentType === "uid" ? "Enter your UID" : "+8801XXXXXXXXX"}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
          />
          {isBDMobileMethod &&
            payerNumber &&
            !isValidBDPhoneStrict(payerNumber) && (
              <p className="mt-1 text-xs text-red-500">
                Enter a valid Bangladeshi number like +8801XXXXXXXXX.
              </p>
            )}
        </div>

        {/* Show Transaction ID field only for Network mode or mobile banking */}
        {(isBDMobileMethod || (isPayCrypto && paymentType === "network")) && (
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Transaction ID / Hash
            </label>
            <input
              type="text"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder={isPayCrypto ? "Enter transaction hash" : "Enter transaction ID"}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        )}
      </div>
      <div className="mt-6 space-y-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
          {isPayCrypto && paymentType === "network"
            ? "Make sure you have sent to correct address and pasted the correct Transaction Hash. Your payment will be verified manually for security."
            : isPayCrypto && paymentType === "uid"
              ? "Make sure you have sent to correct UID and pasted the correct Transaction Hash. Your payment will be verified manually for security."
              : "Make sure you have sent to correct account and pasted the correct Transaction ID / Hash. Your payment will be verified manually for security."
          }
        </div>
        <div>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={onConfirm}
            className={`w-full mt-1 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-60 ${
              canConfirm
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
            }`}
          >
            Confirm Order Securely
          </button>
        </div>
      </div>
    </div>
  );
}
