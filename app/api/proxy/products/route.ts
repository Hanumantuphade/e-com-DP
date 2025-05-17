
// app/api/proxy/products/route.ts
import { NextResponse } from 'next/server';

// Store ID constant
const STORE_ID = "84100d54-bdae-467f-812c-81fd415e03c9";
const API_URL = `https://pharma-admin.vercel.app/api/${STORE_ID}/products`;

export async function GET() {
  try {
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
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}