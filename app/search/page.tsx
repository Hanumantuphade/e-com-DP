// app/search/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { search } from "@/services/search-service";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import DiscountProductCard from "@/components/DiscountProductCard";
import Link from "next/link";
// Import components
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const results = await search(query);
        setMatches(results.matches);
        setRelatedProducts(results.relatedProducts);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Search results content component
  const SearchResultsContent = () => {
    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h1>
        
        {matches.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-4">No products found for "{query}"</h2>
            <p className="text-gray-600 mb-6">Try using different keywords or browse our categories</p>
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">
                Found {matches.length} Product{matches.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {matches.map(product => (
                  product.discountId ? (
                    <DiscountProductCard key={product.id} product={product} />
                  ) : (
                    <ProductCard key={product.id} product={product} />
                  )
                ))}
              </div>
            </section>
            
            {relatedProducts.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-6 border-b pb-2">
                  Related Products
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(product => (
                    product.discountId ? (
                      <DiscountProductCard key={product.id} product={product} />
                    ) : (
                      <ProductCard key={product.id} product={product} />
                    )
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <HeroBanner />
      <SearchResultsContent />
      <Footer />
    </>
  );
}
