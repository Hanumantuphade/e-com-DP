// services/billboard-service.ts
import { Billboard } from "@/types";

const BASE_URL = "/api/proxy/billboards";

export const getBillboards = async (): Promise<Billboard[]> => {
  try {
    const response = await fetch(BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching billboards:", error);
    throw error;
  }
};

export const getBillboard = async (id: string): Promise<Billboard> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching billboard ${id}:`, error);
    throw error;
  }
};