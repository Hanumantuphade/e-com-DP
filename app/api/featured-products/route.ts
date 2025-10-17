// app/api/featured-products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toProductDTO(doc: any) {
  const id = doc._id?.toString();
  const createdAt = doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString();
  const updatedAt = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : createdAt;
  const imageUrl = doc.image || "/placeholder.png";
  return {
    id,
    storeId: "",
    categoryId: doc.categoryId,
    name: doc.name,
    description: doc.description || "",
    price: String(doc.price),
    isFeatured: Boolean(doc.isFeatured),
    isArchived: false,
    sizeId: "",
    colorId: "",
    discountId: null,
    createdAt,
    updatedAt,
    images: imageUrl
      ? [
          {
            id,
            productId: id,
            url: imageUrl,
            createdAt,
            updatedAt,
          },
        ]
      : [],
  } as const;
}

export async function GET() {
  try {
    await connectDB();
    const docs = await ProductModel.find({ isFeatured: true }).sort({ featuredAt: -1, createdAt: -1 });
    const data = docs.map((d) => toProductDTO(d));
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/featured-products error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
