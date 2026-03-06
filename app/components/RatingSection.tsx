"use client";

import React, { useState } from "react";
import { Star, User, ThumbsUp, Clock, Send } from "lucide-react";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface RatingSectionProps {
  productId: number;
  productName: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onReviewSubmit: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  onHelpfulClick: (reviewId: string) => void;
}

export default function RatingSection({
  productId,
  productName,
  reviews,
  averageRating,
  totalReviews,
  onReviewSubmit,
  onHelpfulClick,
}: RatingSectionProps) {
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    comment: "",
    service: "",
    verified: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim() || !newReview.service.trim()) return;

    setIsSubmitting(true);
    try {
      await onReviewSubmit(newReview);
      setNewReview({ userName: "", rating: 5, comment: "", service: "", verified: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, size = "small") => {
    const starSize = size === "small" ? "w-4 h-4" : "w-5 h-5";
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {renderStars(averageRating, "large")}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Side - Reviews List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Reviews ({totalReviews})
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {renderStars(review.rating)}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {review.comment}
                </p>
                
                <button
                  onClick={() => onHelpfulClick(review.id)}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Leave a Review */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Leave a Review
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base placeholder-gray-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Rating
                </label>
                <div className="flex items-center justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {newReview.rating} out of 5 stars
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Service
                </label>
                <select
                  value={newReview.service}
                  onChange={(e) =>
                    setNewReview({ ...newReview, service: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base"
                  required
                >
                  <option value="" className="bg-gray-800 text-white">Select a service</option>
                  <option value="YouTube Premium" className="bg-gray-800 text-white">YouTube Premium</option>
                  <option value="Canva Pro" className="bg-gray-800 text-white">Canva Pro</option>
                  <option value="ExpressVPN" className="bg-gray-800 text-white">ExpressVPN</option>
                  <option value="Spotify Premium" className="bg-gray-800 text-white">Spotify Premium</option>
                  <option value="Netflix" className="bg-gray-800 text-white">Netflix</option>
                  <option value="Adobe Creative Cloud" className="bg-gray-800 text-white">Adobe Creative Cloud</option>
                  <option value="Microsoft 365" className="bg-gray-800 text-white">Microsoft 365</option>
                  <option value="Disney+" className="bg-gray-800 text-white">Disney+</option>
                  <option value="Amazon Prime" className="bg-gray-800 text-white">Amazon Prime</option>
                  <option value="Other" className="bg-gray-800 text-white">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-base placeholder-gray-400"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden space-y-6">
        {/* Leave a Review Form - Mobile */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
            Leave a Review
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.userName}
                onChange={(e) =>
                  setNewReview({ ...newReview, userName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base placeholder-gray-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Rating
              </label>
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                {newReview.rating} out of 5 stars
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Service
              </label>
              <select
                value={newReview.service}
                onChange={(e) =>
                  setNewReview({ ...newReview, service: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-base"
                required
              >
                <option value="" className="bg-gray-800 text-white">Select a service</option>
                <option value="YouTube Premium" className="bg-gray-800 text-white">YouTube Premium</option>
                <option value="Canva Pro" className="bg-gray-800 text-white">Canva Pro</option>
                <option value="ExpressVPN" className="bg-gray-800 text-white">ExpressVPN</option>
                <option value="Spotify Premium" className="bg-gray-800 text-white">Spotify Premium</option>
                <option value="Netflix" className="bg-gray-800 text-white">Netflix</option>
                <option value="Adobe Creative Cloud" className="bg-gray-800 text-white">Adobe Creative Cloud</option>
                <option value="Microsoft 365" className="bg-gray-800 text-white">Microsoft 365</option>
                <option value="Disney+" className="bg-gray-800 text-white">Disney+</option>
                <option value="Amazon Prime" className="bg-gray-800 text-white">Amazon Prime</option>
                <option value="Other" className="bg-gray-800 text-white">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-base placeholder-gray-400"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews List - Mobile */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Reviews ({totalReviews})
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {renderStars(review.rating)}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {review.comment}
                </p>
                
                <button
                  onClick={() => onHelpfulClick(review.id)}
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
