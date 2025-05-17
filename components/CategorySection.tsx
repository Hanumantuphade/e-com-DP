// components/CategorySection.tsx
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
  setActiveCategory 
}) => {
  const [categories, setCategories] = useState<CategoryWithImage[]>(initialCategories);

  useEffect(() => {
    // Combine hardcoded categories with any additional ones fetched
    const allCategories = getCategories();
    setCategories(allCategories);
  }, []);

  return (
    <section className="bg-grey-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 p-4 rounded-lg ${
                activeCategory === category.id 
                  ? "bg-blue-50 shadow-md" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="relative h-16 w-16 mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className={`text-sm font-medium text-center ${
                activeCategory === category.id 
                  ? "text-blue-600" 
                  : "text-gray-700"
              }`}>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;