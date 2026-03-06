"use client";

import React from "react";
import { ShoppingCart, Star, CheckCircle2 } from "lucide-react";

import type { Product } from "../types";

export interface ProductCardProps {
  product: Product;
  lastAddedProductId: number | null;
  addToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  lastAddedProductId,
  addToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {product.icon}
            </div>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-semibold">
              {product.category}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {product.description}
        </p>

        <div className="space-y-2 mb-6">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              Save ${product.originalPrice - product.price}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            {lastAddedProductId === product.id && (
              <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" /> Added!
              </div>
            )}
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {lastAddedProductId === product.id ? "View Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}