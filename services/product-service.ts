// services/product-service.ts
import { Product } from "@/types";
import { API_URL, fetcher } from "@/utils/api";
import qs from "query-string";

const URL = `${API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (query: Query = {}): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  
  return fetcher(url);
};

export const getProduct = async (id: string): Promise<Product> => {
  return fetcher(`${URL}/${id}`);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return getProducts({ isFeatured: true });
};