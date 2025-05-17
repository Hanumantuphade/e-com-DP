// services/category-service.ts
import { CategoryWithImage } from "@/types";

// Define hardcoded category data
export const categoryData: CategoryWithImage[] = [
  {
    id: "all",
    name: "All Products",
    image: "/logo1.png"
  },
  {
    id: "ayurveda",
    name: "Ayurveda",
    image: "/ayu.png"
  },
  {
    id: "skin-care",
    name: "Skin Care",
    image: "/skin.png"
  },
  {
    id: "cough",
    name: "Cold & Cough",
    image: "/cold.png"
  },
  {
    id: "baby",
    name: "Baby Care",
    image: "/baby.png"
  }
];

export const getCategories = async (): Promise<CategoryWithImage[]> => {
  try {
    const response = await fetch('/api/proxy/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const apiCategories: { id: string; name: string; }[] = await response.json();
    
    // Transform API categories to CategoryWithImage format with naming convention categoryname.png
    const transformedCategories: CategoryWithImage[] = apiCategories.map(category => ({
      id: category.id,
      name: category.name,
      image: `/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`
    }));

    // Combine hardcoded and API categories, avoiding duplicates by id
    const combinedCategories = [...categoryData];
    transformedCategories.forEach(cat => {
      if (!combinedCategories.find(c => c.id === cat.id)) {
        combinedCategories.push(cat);
      }
    });

    return combinedCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return categoryData; // fallback to hardcoded
  }
};

export const getCategoryById = async (id: string): Promise<CategoryWithImage | undefined> => {
  // Check hardcoded first
  const hardcodedCategory = categoryData.find(category => category.id === id);
  if (hardcodedCategory) {
    return hardcodedCategory;
  }

  try {
    const response = await fetch(`/api/proxy/categories/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    const category: { id: string; name: string; } = await response.json();
    return {
      id: category.id,
      name: category.name,
      image: `/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`
    };
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return undefined;
  }
};
