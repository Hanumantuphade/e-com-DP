// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toCategoryDTO(doc: any) {
  const id = doc._id?.toString();
  const createdAt = doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString();
  const updatedAt = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : createdAt;
  return {
    id,
    name: doc.name,
    slug: doc.slug || null,
    imageUrl: doc.imageUrl || null,
    createdAt,
    updatedAt,
  };
}

export async function GET() {
  try {
    await connectDB();

    const docs = await CategoryModel.find({})
      .collation({ locale: "en", strength: 2 })
      .sort({ name: 1 });

    const data = docs.map(toCategoryDTO);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/categories error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
