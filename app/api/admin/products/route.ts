import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

function toProductDTO(doc: any) {
  const id = doc._id?.toString();
  const createdAt = doc.createdAt?.toISOString?.() ?? new Date().toISOString();
  const updatedAt = doc.updatedAt?.toISOString?.() ?? new Date().toISOString();
  const imageUrl = doc.image || "/placeholder.png";
  return {
    id,
    storeId: "",
    categoryId: doc.categoryId,
    name: doc.name,
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
    const docs = await ProductModel.find({}).sort({ createdAt: -1 });
    const data = docs.map((d) => toProductDTO(d));
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/products error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function uploadToBlob(file: File) {
  const safeName = `products/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const blob = await put(safeName, file, {
    access: "public",
  });
  return blob.url;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const priceStr = String(formData.get("price") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const image = formData.get("image");

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required";
    if (!description) errors.description = "Description is required";
    const priceNum = Number(priceStr);
    if (priceStr === "" || Number.isNaN(priceNum)) errors.price = "Price must be a valid number";
    else if (priceNum < 0) errors.price = "Price must be >= 0";
    if (!categoryId) errors.categoryId = "Category is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    let imageUrl: string | undefined = undefined;
    if (image && image instanceof File && image.size > 0) {
      const mime = image.type || "";
      if (!mime.startsWith("image/")) {
        return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
      }
      imageUrl = await uploadToBlob(image);
    }

    const created = await ProductModel.create({
      name,
      description,
      price: priceNum,
      categoryId,
      image: imageUrl,
    });

    return NextResponse.json(toProductDTO(created), { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/products error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
