import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import ProductModel from "@/models/Product";
import mongoose from "mongoose";

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

function toDTO(doc: any) {
  const id = doc._id?.toString();
  const createdAt = doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString();
  const updatedAt = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : createdAt;
  return {
    id,
    name: doc.name,
    slug: doc.slug || null,
    createdAt,
    updatedAt,
  };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const inputName = String(body?.name ?? "");
    const { name, errors } = validateName(inputName);
    if (Object.keys(errors).length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const existing = await CategoryModel.findOne({ _id: { $ne: id }, name })
      .collation({ locale: "en", strength: 2 });
    if (existing) {
      return NextResponse.json({ errors: { name: "Category name must be unique" } }, { status: 409 });
    }

    const updated = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(toDTO(updated), { status: 200 });
  } catch (err) {
    console.error("PATCH /api/admin/categories/[id] error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const inUse = await ProductModel.exists({ categoryId: id });
    if (inUse) {
      return NextResponse.json(
        { error: "Category is in use by one or more products. Move products first." },
        { status: 409 }
      );
    }

    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/admin/categories/[id] error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
