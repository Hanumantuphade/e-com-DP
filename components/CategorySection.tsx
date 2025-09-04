// components/CategorySection.tsx

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);

    if (categoryId === "all") {
      router.push("/allproducts");
    } else {
      router.push(`/category/${categoryId}`);
    }
  };

  return (
    <section className=" py-8 mt-14 mx-5 rounded-xl  relative overflow-hidden">
          {/* Background image */}
    <img
      className="absolute inset-0 w-full h-full object-cover z-0"
      src="/p4.png"
      alt=""
    />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-3 drop-shadow-sm">
          Shop by Category
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Pick a category to discover our best products
        </p>

        <div className="relative">
          {/* Left arrow for mobile */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:hidden z-20">
            <div className="bg-white shadow-lg rounded-full p-2 cursor-pointer border border-gray-200 hover:scale-110 hover:shadow-xl transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>

          {/* Scrollable categories */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 sm:gap-8 lg:gap-12 overflow-x-auto py-3 px-1 justify-start md:justify-center">
              {categories.map((category) => {
                const imageSrc =
                  category.image ||
                  `/${category.name.toLowerCase().replace(/\s+/g, "-")}.png`;
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 px-4 py-3 rounded-xl group
                      ${
                        activeCategory === category.id
                          ? "bg-white shadow-xl transform scale-105 ring-2 ring-blue-400"
                          : "hover:bg-white/70 hover:shadow-lg"
                      }
                    `}
                    title={category.name}
                  >
                    <div
                      className={`relative h-20 w-20 sm:h-24 sm:w-24 mb-3 rounded-full overflow-hidden border-2 
                        ${
                          activeCategory === category.id
                            ? "border-blue-500 shadow-lg scale-105"
                            : "border-zinc-600 group-hover:scale-105 transition-transform"
                        }`}
                    >
                      <Image
                        src={imageSrc}
                        alt={category.name}
                        fill
                        className="object-contain rounded-full p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/logo1.png";
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium text-center w-24 truncate transition-colors
                        ${
                          activeCategory === category.id
                            ? "text-blue-700 font-semibold"
                            : "text-gray-800 group-hover:text-blue-600"
                        }`}
                    >
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow for mobile */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:hidden z-20">
            <div className="bg-white shadow-lg rounded-full p-2 cursor-pointer border border-gray-200 hover:scale-110 hover:shadow-xl transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
