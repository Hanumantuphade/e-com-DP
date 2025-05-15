"use client"

interface CategoryTabsProps {
    categories: {
      id: string;
      name: string;
    }[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
  }
  
  export default function CategoryTabs({ 
    categories, 
    activeCategory, 
    setActiveCategory 
  }: CategoryTabsProps) {
    return (
      <div className="bg-blue-300 py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Category</h2>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }