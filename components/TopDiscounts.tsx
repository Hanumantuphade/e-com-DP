// components/TopDiscounts.tsx
"use client";

"use client";
import { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import DiscountProductCard from "./DiscountProductCard";
import { getDiscountedProducts } from "@/services/product-service";
import { Tag, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const TopDiscounts: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of visible width
      
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setScrollPosition((prev) => Math.max(0, prev - scrollAmount));
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setScrollPosition((prev) => Math.min(scrollWidth - clientWidth, prev + scrollAmount));
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Top Discounts</h2>
            <Tag className="ml-2 h-5 w-5 text-red-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Top Discounts</h2>
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </section>
    );
  }

  // No discounted products
  if (discountedProducts.length === 0) {
    return null; // Don't show the section if there are no discounted products
  }

  // Sort products by discount percentage (highest first)
  const sortedProducts = [...discountedProducts].sort((a, b) => {
    const discountA = a.discount?.percentage || 0;
    const discountB = b.discount?.percentage || 0;
    return discountB - discountA;
  });

  return (
    <section className="py-12 bg-gradient-to-r from-red-300 to-pink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pb-4">
          {/* Top section with title and navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Top Discounts</h2>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => scroll("left")} 
                className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 focus:outline-none"
                disabled={scrollPosition <= 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => scroll("right")} 
                className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Red highlight line under title */}
          <div className="h-1 w-24 bg-red-500 rounded mb-6"></div>
          
          {/* Product slider */}
          <div className="relative overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 pb-4 pt-2 scroll-smooth scrollbar-hide"
            >
              {sortedProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <DiscountProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDiscounts;