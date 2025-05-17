// components/TopDiscounts.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import DiscountProductCard from "./DiscountProductCard";
import { getDiscountedProducts } from "@/services/product-service";

const TopDiscounts: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const products = await getDiscountedProducts();
        setDiscountedProducts(products);
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
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Discounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Discounts</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (discountedProducts.length === 0) {
    return null; // Don't show the section if there are no discounted products
  }

  return (
    <section className="bg-green-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Top Discounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <DiscountProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDiscounts;