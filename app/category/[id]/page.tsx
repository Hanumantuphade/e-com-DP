// app/category/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import { categoryData, getCategoryById } from "@/services/category-service";
import { CategoryWithImage } from "@/types";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [category, setCategory] = useState<CategoryWithImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const categoryData = await getCategoryById(categoryId);
        setCategory(categoryData);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Categories section - reusing the same component */}
      <CategorySection
        categories={categoryData}
        activeCategory={categoryId}
        setActiveCategory={() => {}}
      />
      
      {isLoading ? (
        <div className="py-12 bg-gradient-to-r from-green-300 to-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
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
          </div>
        </div>
      ) : (
        <>
          {/* Display products for the selected category */}
          <div className="py-8 bg-gradient-to-r from-green-300 to-green-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                {category?.name || "Products"}
              </h1>
              <p className="text-center text-gray-700 mb-8">
                Browse our selection of {category?.name.toLowerCase() || "products"}
              </p>
            </div>
          </div>
          
          <ProductSection 
            title={"Products"} 
            category={categoryId} 
          />
        </>
      )}
      
      <Footer />
    </main>
  );
}