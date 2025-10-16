import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("image")) as File | null;

    if (!file || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Unsupported file type. Allowed: jpeg, png, webp" }, { status: 415 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Payload too large. Max 2MB" }, { status: 413 });
    }

    const url = await saveLocalImage(file);
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error("POST /api/admin/uploads error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
