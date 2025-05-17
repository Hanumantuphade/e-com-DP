// utils/product-search.ts

/**
 * Creates a Google search URL for a product
 * 
 * @param productName - Name of the product
 * @param categoryName - Category name of the product (optional)
 * @returns URL to Google search for the product details
 */
export const createProductSearchUrl = (productName: string, categoryName?: string): string => {
    // Build search query
    let searchQuery = `${productName} medicine details`;
    
    // Add category if available
    if (categoryName) {
      searchQuery += ` ${categoryName}`;
    }
    
    // Encode for URL
    const encodedQuery = encodeURIComponent(searchQuery);
    
    // Return Google search URL
    return `https://www.google.com/search?q=${encodedQuery}`;
  };