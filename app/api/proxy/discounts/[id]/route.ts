// app/api/proxy/discounts/[id]/route.ts
import { NextResponse } from 'next/server';

const STORE_ID = "84100d54-bdae-467f-812c-81fd415e03c9";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const API_URL = `https://pharma-admin.vercel.app/api/${STORE_ID}/discounts/${id}`;

  try {
    const response = await fetch(API_URL, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching discount ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch discount' },
      { status: 500 }
    );
  }
}
