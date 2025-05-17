//components/CategorySection.tsx
//
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CategoryWithImage } from "@/types";
import { getCategories } from "@/services/category-service";

interface CategorySectionProps {
  categories: CategoryWithImage[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categories: initialCategories,
  activeCategory,
  setActiveCategory,
}) => {
  const [categories, setCategories] = useState<CategoryWithImage[]>(initialCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await getCategories();
        setCategories(fetched);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);
  // bg-blue-300 py-10
  return (
    <section className="py-10 bg-gradient-to-r from-blue-300 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Shop by Category
        </h2>
        <p className="text-center text-green-300 mb-8">Select a category to explore our products</p>
        
        <div className="relative">
          {/* Arrow indicators for mobile */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:hidden">
            <div className="bg-white shadow-md rounded-full p-2 cursor-pointer border border-gray-200 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 sm:gap-8 lg:gap-10 overflow-x-auto py-3 px-1 justify-start md:justify-center">
              {categories.map((category) => {
                const imageSrc = category.image || `/${category.name.toLowerCase().replace(/\s+/g, "-")}.png`;
                return (
                  <div
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 px-4 py-3 rounded-xl
                      ${
                        activeCategory === category.id
                          ? "bg-blue-50 transform scale-105"
                          : "hover:bg-gray-50"
                      }
                    `}
                    title={category.name}
                  >
                    <div 
                      className={`relative h-20 w-20 sm:h-24 sm:w-24 mb-3 rounded-full overflow-hidden 
                        ${activeCategory === category.id 
                          ? "ring-4 ring-blue-400 shadow-lg" 
                          : "shadow-sm hover:shadow-md"
                        }`
                      }
                    >
                      <Image
                        src={imageSrc}
                        alt={category.name}
                        fill
                        className="object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/logo1.png"; // fallback
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium text-center w-24 truncate ${
                        activeCategory === category.id ? "text-blue-700 font-semibold" : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right arrow indicator for mobile */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:hidden">
            <div className="bg-white shadow-md rounded-full p-2 cursor-pointer border border-gray-200 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;