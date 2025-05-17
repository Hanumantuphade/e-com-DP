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

export const getCategories = (): CategoryWithImage[] => {
  return categoryData;
};

export const getCategoryById = (id: string): CategoryWithImage | undefined => {
  return categoryData.find(category => category.id === id);
};