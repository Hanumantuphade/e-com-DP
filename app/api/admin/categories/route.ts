import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-\&]+/g, "");
}

function validateName(nameRaw: string) {
  const name = nameRaw.trim().replace(/\s+/g, " ");
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (name.length < 2 || name.length > 50) errors.name = "Name must be 2-50 characters";
  if (!/^[A-Za-z0-9\s\-&]+$/.test(name)) errors.name = "Only letters, numbers, spaces, hyphen, ampersand allowed";
  return { name, errors } as const;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content-Type must be multipart/form-data" }, { status: 400 });
    }

    const form = await req.formData();
    const inputName = String(form.get("name") ?? "");
    const file = form.get("image");

    const { name, errors } = validateName(inputName);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    if (!file || typeof file === "string") {
      return NextResponse.json({ errors: { image: "Image is required" } }, { status: 400 });
    }

    // Validate file type and size
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const blob = file as File;
    if (!allowed.includes(blob.type)) {
      return NextResponse.json({ errors: { image: "Only PNG, JPEG, or WEBP allowed" } }, { status: 400 });
    }
    const sizeMb = blob.size / (1024 * 1024);
    if (sizeMb > 2) {
      return NextResponse.json({ errors: { image: "Image must be 2MB or less" } }, { status: 400 });
    }

    const existing = await CategoryModel.findOne({ name })
      .collation({ locale: "en", strength: 2 });
    if (existing) {
      return NextResponse.json({ errors: { name: "Category name must be unique" } }, { status: 409 });
    }

    // Prepare upload path
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "categories");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : "jpg";
    const fileBase = slugify(name);
    const filename = `${Date.now()}-${fileBase}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/categories/${filename}`;

    const created = await CategoryModel.create({ name, slug: slugify(name), imageUrl });
    const dto = {
      id: created._id.toString(),
      name: created.name,
      slug: created.slug || null,
      imageUrl: created.imageUrl,
      createdAt: created.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: created.updatedAt?.toISOString?.() ?? new Date().toISOString(),
    };
    return NextResponse.json(dto, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/categories error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
