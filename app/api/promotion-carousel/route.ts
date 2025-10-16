import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PromotionCarouselItem from "@/models/PromotionCarouselItem";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toDTO(doc: any) {
  return {
    id: doc._id?.toString(),
    name: doc.name,
    description: doc.description,
    offer: doc.offer,
    imageUrl: doc.imageUrl,
    active: Boolean(doc.active),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  } as const;
}

export async function GET() {
  try {
    await connectDB();
    const docs = await PromotionCarouselItem.find({ active: true }).sort({ createdAt: -1 });
    const data = docs.map((d) => toDTO(d));
    return NextResponse.json(data, { status: 200, headers: { "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300" } });
  } catch (err) {
    console.error("GET /api/promotion-carousel error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
