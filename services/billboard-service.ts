// services/billboard-service.ts
import { Billboard } from "@/types";
import { API_URL, fetcher } from "@/utils/api";

const URL = `${API_URL}/billboards`;

export const getBillboards = async (): Promise<Billboard[]> => {
  return fetcher(URL);
};

export const getBillboard = async (id: string): Promise<Billboard> => {
  return fetcher(`${URL}/${id}`);
};