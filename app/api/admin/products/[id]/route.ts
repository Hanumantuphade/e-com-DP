import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import path from "path";
import fs from "fs/promises";

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

async function ensureUploadsDir() {
  const uploadsPath = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsPath, { recursive: true });
  return uploadsPath;
}

async function saveLocalImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = await ensureUploadsDir();
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const dest = path.join(uploadsDir, safeName);
  await fs.writeFile(dest, buffer);
  return `/uploads/${safeName}`;
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    const contentType = req.headers.get("content-type") || "";

    const update: Record<string, any> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const name = formData.get("name");
      const description = formData.get("description");
      const priceStr = formData.get("price");
      const categoryId = formData.get("categoryId");
      const image = formData.get("image");

      if (name !== null) update.name = String(name).trim();
      if (description !== null) update.description = String(description).trim();
      if (priceStr !== null) {
        const priceNum = Number(String(priceStr));
        if (Number.isNaN(priceNum) || priceNum < 0) return NextResponse.json({ error: "Invalid price" }, { status: 400 });
        update.price = priceNum;
      }
      if (categoryId !== null) update.categoryId = String(categoryId).trim();

      if (image && image instanceof File && image.size > 0) {
        const mime = image.type || "";
        if (!mime.startsWith("image/")) return NextResponse.json({ error: "Only images allowed" }, { status: 400 });
        const imageUrl = await saveLocalImage(image);
        update.image = imageUrl;
      }
    } else {
      const body = await req.json().catch(() => ({}));
      if (typeof body.name === "string") update.name = body.name.trim();
      if (typeof body.description === "string") update.description = body.description.trim();
      if (typeof body.price !== "undefined") {
        const priceNum = Number(body.price);
        if (Number.isNaN(priceNum) || priceNum < 0) return NextResponse.json({ error: "Invalid price" }, { status: 400 });
        update.price = priceNum;
      }
      if (typeof body.categoryId === "string") update.categoryId = body.categoryId.trim();
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    const updated = await ProductModel.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(toProductDTO(updated), { status: 200 });
  } catch (err) {
    console.error("PATCH /api/admin/products/[id] error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    const deleted = await ProductModel.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/admin/products/[id] error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
