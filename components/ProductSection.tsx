// components/ProductSection.tsx

"use client";
import { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import DiscountProductCard from "./DiscountProductCard";
import { getProductsByCategory, getFeaturedProducts } from "@/services/product-service";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Loading state UI
  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-r from-green-300 to-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{title}</h2>
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

  // Error state UI
  if (error) {
    return (
      <section className="py-12 bg-gradient-to-r from-green-300 to-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
          <p className="text-red-500 text-center py-4">{error}</p>
        </div>
      </section>
    );
  }

  // For the empty state when no category is selected
  if (!isFeatured && category === "all") {
    return (
      <section className="py-12 bg-gradient-to-r from-green-300 to-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Select a category to view products</h3>
            <p className="text-gray-600 max-w-md">Choose a category from above to browse our selection of products.</p>
          </div>
        </div>
      </section>
    );
  }

  // For no products found state
  if (products.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-r from-green-300 to-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
          <p className="text-gray-600 text-center py-4">No products found in this category.</p>
        </div>
      </section>
    );
  }

  // For regular category-filtered products with grid layout
  return (
    <section className="py-12 bg-gradient-to-r from-green-300 to-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
