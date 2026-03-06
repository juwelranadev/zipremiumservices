"use client";

import React, { useState } from "react";
import RatingSection from "./RatingSection";
import type { Review } from "../types";

// Example data - in a real app, this would come from your API/database
const exampleReviews: Review[] = [
  {
    id: "1",
    userName: "John Doe",
    rating: 5,
    comment: "Excellent product! Exactly what I was looking for. The quality is outstanding and the customer service was very helpful.",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    rating: 4,
    comment: "Great value for money. The product works as described. Minor issue with delivery but overall satisfied with the purchase.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    userName: "Mike Johnson",
    rating: 5,
    comment: "Absolutely love it! This exceeded my expectations. Would definitely recommend to friends and family.",
    date: "2024-01-05",
    helpful: 15,
    verified: false,
  },
  {
    id: "4",
    userName: "Sarah Wilson",
    rating: 3,
    comment: "Product is okay, but not as good as expected. The quality could be better for the price point.",
    date: "2023-12-28",
    helpful: 6,
    verified: true,
  },
];

export default function RatingExample() {
  const [reviews, setReviews] = useState<Review[]>(exampleReviews);
  
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const handleReviewSubmit = async (newReview: Omit<Review, "id" | "date" | "helpful">) => {
    // In a real app, this would make an API call to save the review
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    
    setReviews(prev => [review, ...prev]);
    
    // Show success message (you could use your alert system here)
    console.log("Review submitted successfully!");
  };

  const handleHelpfulClick = (reviewId: string) => {
    // In a real app, this would make an API call to update the helpful count
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Premium Digital Services
        </h1>
        
        <RatingSection
          productId={1}
          productName="Premium Digital Services"
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          onReviewSubmit={handleReviewSubmit}
          onHelpfulClick={handleHelpfulClick}
        />
      </div>
    </div>
  );
}
