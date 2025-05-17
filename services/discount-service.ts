// services/discount-service.ts
import { Discount } from "@/types";
import { API_URL, fetcher } from "@/utils/api";

const URL = `${API_URL}/discounts`;

export const getDiscounts = async (): Promise<Discount[]> => {
  return fetcher(URL);
};

export const getDiscount = async (id: string): Promise<Discount> => {
  return fetcher(`${URL}/${id}`);
};