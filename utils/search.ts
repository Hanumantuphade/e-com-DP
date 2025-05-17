// utils/search.ts
import { Product, Category } from "@/types";

export interface SearchResult {
  searchTerm: string;
  matches: Product[];
  relatedProducts: Product[];
}

/**
 * Search products by name or category
 * @param products All products to search through
 * @param searchTerm The search term entered by the user
 * @returns Object with matches and related products
 */
export const searchProducts = (products: Product[], searchTerm: string): SearchResult => {
  if (!searchTerm || searchTerm.trim() === '') {
    return {
      searchTerm: '',
      matches: [],
      relatedProducts: []
    };
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  // Search by product name
  const productMatches = products.filter(product => 
    product.name.toLowerCase().includes(normalizedSearchTerm)
  );
  
  // Search by category name (if category data is available)
  const categoryMatches = products.filter(product => 
    product.category && product.category.name.toLowerCase().includes(normalizedSearchTerm)
  );
  
  // Combine unique matches from both sources
  const allMatches = [...productMatches];
  
  // Add category matches that aren't already in productMatches
  categoryMatches.forEach(product => {
    if (!allMatches.some(p => p.id === product.id)) {
      allMatches.push(product);
    }
  });

  // Find related products that share the same categoryId and colorId with any match
  const relatedProducts = findRelatedProducts(products, allMatches);
  
  return {
    searchTerm,
    matches: allMatches,
    relatedProducts
  };
};

/**
 * Find related products that share the same categoryId and colorId with matches
 */
const findRelatedProducts = (allProducts: Product[], matches: Product[]): Product[] => {
  if (!matches.length) return [];

  // Extract all unique category and color combinations from matches
  const categoryColorPairs = matches.map(product => ({
    categoryId: product.categoryId,
    colorId: product.colorId
  }));
  
  // Find all products that match any of these category-color combinations
  // but aren't already in the matches array
  const related = allProducts.filter(product => 
    // Check if this product matches any categoryId-colorId pair
    categoryColorPairs.some(pair => 
      product.categoryId === pair.categoryId && 
      product.colorId === pair.colorId
    ) && 
    // Make sure it's not already in the matches array
    !matches.some(match => match.id === product.id)
  );
  
  return related;
};