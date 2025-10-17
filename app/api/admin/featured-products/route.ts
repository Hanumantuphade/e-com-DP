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

export async function POST(req: Request) {
  try {
    await connectDB();
    const contentType = req.headers.get("content-type") || "";

    let productId = "";
    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      productId = String(body?.productId || "").trim();
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      productId = String(form.get("productId") || "").trim();
    } else {
      productId = (await req.text()).trim();
    }

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const doc = await ProductModel.findById(productId);
    if (!doc) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (!doc.isFeatured) {
      doc.isFeatured = true;
      doc.featuredAt = new Date();
      await doc.save();
    }

    return NextResponse.json(toProductDTO(doc), { status: 200 });
  } catch (err) {
    console.error("POST /api/admin/featured-products error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
