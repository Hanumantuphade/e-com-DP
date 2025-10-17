// utils/api.ts
const storeId = '84100d54-bdae-467f-812c-81fd415e03c9';
export const API_URL = `https://pharma-admin.vercel.app/api/${storeId}`;

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText}`);
  }
  
  return res.json();
};