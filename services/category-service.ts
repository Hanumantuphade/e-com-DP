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
    name: " Baby Care",
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
    // Prefer local categories API (DB-backed)
    const response = await fetch('/api/categories', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const apiCategories: { id: string; name: string; slug?: string | null; imageUrl?: string | null }[] = await response.json();

    // Map to CategoryWithImage, preferring hardcoded images when available
    const mapped: CategoryWithImage[] = apiCategories.map((c) => {
      const hardcoded = categoryData.find(
        (hc) => hc.id === c.id || hc.name.toLowerCase() === c.name.toLowerCase()
      );
      return {
        id: c.id,
        name: c.name,
        image: (c.imageUrl ?? undefined) || hardcoded?.image || "/logo1.png",
      };
    });

    // Include any remaining hardcoded categories that aren't present (optional)
    const extras = categoryData.filter(
      (hc) => !mapped.find((m) => m.id === hc.id || m.name.toLowerCase() === hc.name.toLowerCase())
    );
    return [...mapped, ...extras];
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
    const response = await fetch(`/api/categories/${id}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    const category: { id: string; name: string; slug?: string | null; imageUrl?: string | null } = await response.json();
    return {
      id: category.id,
      name: category.name,
      image: category.imageUrl || "/logo1.png",
    };
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return undefined;
  }
};