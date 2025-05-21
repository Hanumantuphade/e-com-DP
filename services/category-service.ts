//services/category-service.ts
import { CategoryWithImage } from "@/types";

// Define hardcoded category data with IDs matching the API responses
export const categoryData: CategoryWithImage[] = [
  
  {
    id: "e932d5a2-cd99-4ec2-b798-3a9393495610", // This ID matches the Ayurveda category in the API
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
  },
  {
    id: "0a0be642-926f-40b0-91cc-6ab482df5108", // This ID matches the Hair Care category in the API
    name: "Hair Care",
    image: "/hair-care.png"
  }
];

export const getCategories = async (): Promise<CategoryWithImage[]> => {
  try {
    const response = await fetch('/api/proxy/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const apiCategories: { id: string; name: string; }[] = await response.json();
    
    // Transform API categories to CategoryWithImage format
    // Use the actual ID from the API response for proper matching
    const transformedCategories: CategoryWithImage[] = apiCategories.map(category => ({
      id: category.id, // Use the actual ID from API
      name: category.name,
      image: `/${category.name.toLowerCase().replace(/\s+/g, '-')}.png`
    }));

    // Start with the hardcoded "all" category
    const allCategory = categoryData.find(c => c.id === "all");
    const combinedCategories = allCategory ? [allCategory] : [];
    
    // Add API categories, using hardcoded images when available
    transformedCategories.forEach(apiCat => {
      // Check if we have a hardcoded category with matching ID or name
      const hardcodedMatch = categoryData.find(
        hc => hc.id === apiCat.id || hc.name.toLowerCase() === apiCat.name.toLowerCase()
      );
      
      if (hardcodedMatch) {
        // Use the API category ID with hardcoded image
        combinedCategories.push({
          id: apiCat.id, // Keep the original API ID
          name: apiCat.name,
          image: hardcodedMatch.image
        });
      } else {
        // Use the API category as is
        combinedCategories.push(apiCat);
      }
    });

    // Add any remaining hardcoded categories (except "all" which we added first)
    categoryData
      .filter(c => c.id !== "all")
      .forEach(cat => {
        if (!combinedCategories.find(c => c.id === cat.id || c.name.toLowerCase() === cat.name.toLowerCase())) {
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