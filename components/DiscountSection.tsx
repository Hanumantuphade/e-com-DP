// components/DiscountSection.tsx
"use client"

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { getDiscounts } from "@/services/discount-service";
import DiscountProductCard from "@/components/DiscountProductCard";

interface DiscountSectionProps {
  title: string;
}

export default function DiscountSection({ title }: DiscountSectionProps) {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        setLoading(true);
        const discounts = await getDiscounts();
        
        if (discounts && discounts.length > 0) {
          // Get products from the first discount (for simplicity)
          // In a real app, you might want to gather products from all discounts
          const products = discounts[0]?.products || [];
          setDiscountedProducts(products);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching discounted products:", err);
        setError("Failed to load discounted products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-red-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10">Loading discounted products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10 text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <a href="#" className="text-blue-600 hover:underline">
            View All Discounts
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {discountedProducts.length > 0 ? (
            discountedProducts.slice(0, 5).map((product) => (
              <DiscountProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No discounted products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}