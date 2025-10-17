// app/api/proxy/billboards/route.ts
import { NextResponse } from 'next/server';

// Store ID constant
const STORE_ID = "84100d54-bdae-467f-812c-81fd415e03c9";
const API_URL = `https://pharma-admin.vercel.app/api/${STORE_ID}/billboards`;

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Upstream billboards responded with status: ${response.status}`);
      // Fallback gracefully to an empty list to avoid UI errors
      return NextResponse.json([]);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching billboards:', error);
    // Fallback gracefully to an empty list on network or other errors
    return NextResponse.json([]);
  }
}