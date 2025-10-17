// services/discount-service.ts
import { Discount, Product } from "@/types";

const BASE_URL = "/api/proxy/discounts";

export const getDiscounts = async (): Promise<Discount[]> => {
  try {
    const response = await fetch(BASE_URL, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
};

export const getDiscount = async (id: string): Promise<Discount> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching discount ${id}:`, error);
    throw error;
  }
};

export const getActiveDiscounts = async (): Promise<Discount[]> => {
  try {
    const discounts = await getDiscounts();
    return discounts.filter(discount => discount.isActive);
  } catch (error) {
    console.error("Error fetching active discounts:", error);
    throw error;
  }
};

export const calculateDiscountedPrice = (price: string, discountPercentage: number): number => {
  const originalPrice = parseFloat(price);
  if (isNaN(originalPrice)) return 0;
  
  return originalPrice - (originalPrice * (discountPercentage / 100));
};