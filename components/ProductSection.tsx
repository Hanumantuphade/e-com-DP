// components/ProductSection.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import DiscountProductCard from "./DiscountProductCard";
import { getProductsByCategory, getFeaturedProducts } from "@/services/product-service";
import { getDiscountedProducts } from "@/services/product-service";

interface ProductSectionProps {
  title: string;
  category: string;
  discountedOnly?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  category, 
  discountedOnly = false 
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
        
        if (discountedOnly) {
          // Fetch only discounted products
          fetchedProducts = await getDiscountedProducts();
        } else if (category === "all") {
          // Fetch featured products when "all" is selected
          fetchedProducts = await getFeaturedProducts();
        } else {
          // Fetch products by category
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
  }, [category, discountedOnly]);

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{title}</h2>
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
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-200 py-12">
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