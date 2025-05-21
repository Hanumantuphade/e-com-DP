"use client";
import { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import DiscountProductCard from "./DiscountProductCard";
import { getProductsByCategory, getFeaturedProducts } from "@/services/product-service";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  category: string;
  discountedOnly?: boolean;
  isFeatured?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  category,
  discountedOnly = false,
  isFeatured = false
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let fetchedProducts: Product[];

        // Handle different product fetching based on flags and category
        if (discountedOnly) {
          // This section is for discounted products only
          const { getDiscountedProducts } = await import("@/services/product-service");
          fetchedProducts = await getDiscountedProducts();
        } else if (isFeatured) {
          // Always fetch featured products for the featured section
          fetchedProducts = await getFeaturedProducts();
        } else if (category === "all") {
          // Don't fetch anything for "all" in the category-filtered section
          fetchedProducts = [];
        } else {
          // Fetch products by selected category
          fetchedProducts = await getProductsByCategory(category);
        }
        
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, discountedOnly, isFeatured]);

  // Check if scrolling is possible
  useEffect(() => {
    const checkScrollability = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Small buffer
      }
    };

    checkScrollability();
    // Add resize listener
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of visible width
      
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }

      // Update scroll position for button visibility
      setTimeout(() => {
        if (sliderRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  // Loading state UI
  if (loading) {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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

  // Error state UI
  if (error) {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
            {error}
          </div>
        </div>
      </section>
    );
  }

  // For the empty state when no category is selected
  if (!isFeatured && category === "all") {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-green-600 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a category to view products</h3>
            <p className="text-gray-700">
              Choose a category from above to browse our selection of products.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // For no products found state
  if (products.length === 0) {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-700">No products found in this category.</p>
          </div>
        </div>
      </section>
    );
  }

  // For featured products with horizontal scroll
  if (isFeatured) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <Link 
              href="/allproducts"
              className="flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="relative">
            {/* Left scroll button */}
            {canScrollLeft && (
              <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {/* Scrollable product list */}
            <div 
              ref={sliderRef} 
              className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={() => {
                if (sliderRef.current) {
                  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
                  setCanScrollLeft(scrollLeft > 0);
                  setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
                }
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-64 flex-shrink-0">
                  {product.discountId ? (
                    <DiscountProductCard product={product} />
                  ) : (
                    <ProductCard product={product} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Right scroll button */}
            {canScrollRight && (
              <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // For regular category-filtered products with grid layout
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              {discountedOnly || product.discountId ? (
                <DiscountProductCard product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;