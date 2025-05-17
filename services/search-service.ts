// services/search-service.ts
import { Product } from "@/types";
import { getProducts } from "./product-service";
import { SearchResult, searchProducts } from "@/utils/search";

let cachedProducts: Product[] | null = null;

/**
 * Search products by name or category
 * Fetches products if they aren't already cached
 */
export const search = async (searchTerm: string): Promise<SearchResult> => {
  try {
    // If we don't have cached products, get them
    if (!cachedProducts) {
      cachedProducts = await getProducts();
    }
    
    return searchProducts(cachedProducts, searchTerm);
  } catch (error) {
    console.error("Error during search:", error);
    return {
      searchTerm,
      matches: [],
      relatedProducts: []
    };
  }
};

/**
 * Clear the product cache - useful when products might have changed
 */
export const clearProductCache = () => {
  cachedProducts = null;
};