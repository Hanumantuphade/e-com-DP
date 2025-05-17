// services/product-service.ts
import { Product } from "@/types";

const BASE_URL = "/api/proxy/products";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.isFeatured);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const products = await getProducts();
    
    if (categoryId === "all") {
      return products;
    }

    // Filter products by category ID instead of category name
    return products.filter(product => product.categoryId === categoryId);
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const getDiscountedProducts = async (): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.discountId !== null);
  } catch (error) {
    console.error("Error fetching discounted products:", error);
    throw error;
  }
};