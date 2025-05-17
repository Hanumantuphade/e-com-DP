// app/api/proxy/products/[productId]/route.ts
import { NextResponse } from 'next/server';

// Store ID constant
const STORE_ID = "84100d54-bdae-467f-812c-81fd415e03c9";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const API_URL = `https://pharma-admin.vercel.app/api/${STORE_ID}/products/${productId}`;

    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });
    

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}