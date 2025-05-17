// app/api/proxy/discounts/[discountId]/route.ts
import { NextResponse } from 'next/server';

// Store ID constant
const STORE_ID = "84100d54-bdae-467f-812c-81fd415e03c9";

export async function GET(
  request: Request,
  { params }: { params: { discountId: string } }
) {
  try {
    const { discountId } = params;
    const API_URL = `https://pharma-admin.vercel.app/api/${STORE_ID}/discounts/${discountId}`;

    const response = await fetch(API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching discount:', error);
    return NextResponse.json({ error: 'Failed to fetch discount' }, { status: 500 });
  }
}