// app/api/categories/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import mongoose from "mongoose";

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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const doc = await CategoryModel.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(toCategoryDTO(doc), { status: 200 });
  } catch (err) {
    console.error("GET /api/categories/[id] error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
