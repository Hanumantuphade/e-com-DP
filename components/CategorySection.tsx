"use client";

import Image from 'next/image';
import { useState } from 'react';

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategorySectionProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategorySection({
  categories,
  activeCategory,
  setActiveCategory
}: CategorySectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="py-10 bg-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 bg-blue-500 w-12 rounded mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <div className="h-1 bg-blue-500 w-12 rounded ml-3"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="flex flex-col items-center justify-center text-center space-y-2 cursor-pointer"
            >
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                  hoveredCategory === category.id ? "transform -translate-y-1 scale-105" : ""
                } ${
                  activeCategory === category.id
                    ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                    : "bg-white shadow hover:shadow-md"
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className={`object-contain transition-transform duration-300 ${
                    hoveredCategory === category.id ? "scale-110" : ""
                  }`}
                />
              </div>
              <h3
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category.id
                    ? "text-blue-600"
                    : hoveredCategory === category.id
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
