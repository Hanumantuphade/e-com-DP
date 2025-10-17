import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    const doc = await ProductModel.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (doc.isFeatured) {
      doc.isFeatured = false;
      doc.featuredAt = undefined;
      await doc.save();
    }

    return NextResponse.json(toProductDTO(doc), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/admin/featured-products/:id error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
