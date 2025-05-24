// components/ProductSection.tsx
"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import DiscountProductCard from "./DiscountProductCard";
import FeaturedProductsSection from "./FeaturedProductsSection";
import { getProductsByCategory } from "@/services/product-service";

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

    // Only fetch if not featured section (featured section handles its own data)
    if (!isFeatured) {
      fetchProducts();
    }
  }, [category, discountedOnly, isFeatured]);

  // If this is a featured section, render the specialized component
  if (isFeatured) {
    return <FeaturedProductsSection title={title} />;
  }

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
  if (category === "all") {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-blue-600 mx-auto mb-4">
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
            <div className="text-gray-400 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6a2 2 0 00-2 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3a2 2 0 00-2-2H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-700">No products found in this category.</p>
          </div>
        </div>
      </section>
    );
  }

  // For regular category-filtered products with grid layout
  return (
    <section className="py-10 bg-gradient-to-r from-red-300 to-blue-300 overflow-hidden">
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