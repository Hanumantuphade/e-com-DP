import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PromotionCarouselItem from "@/models/PromotionCarouselItem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toDTO(doc: any) {
  return {
    id: doc._id?.toString(),
    name: doc.name,
    description: doc.description,
    offer: doc.offer,
    imageUrl: doc.imageUrl,
    active: Boolean(doc.active),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  } as const;
}

export async function GET() {
  try {
    await connectDB();
    const docs = await PromotionCarouselItem.find({}).sort({ createdAt: -1 });
    const data = docs.map((d) => toDTO(d));
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/promotion-carousel error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function validate({ name, description, offer, imageUrl }: { name?: string; description?: string; offer?: string; imageUrl?: string; }) {
  const errors: Record<string, string> = {};
  const t = (s?: string) => (s ?? "").trim();
  if (name !== undefined) {
    const v = t(name);
    if (!v) errors.name = "Name is required";
    else if (v.length < 2 || v.length > 100) errors.name = "Name must be 2-100 chars";
  }
  if (description !== undefined) {
    const v = t(description);
    if (!v) errors.description = "Description is required";
    else if (v.length < 1 || v.length > 500) errors.description = "Description must be 1-500 chars";
  }
  if (offer !== undefined) {
    const v = t(offer);
    if (!v) errors.offer = "Offer is required";
    else if (v.length < 1 || v.length > 50) errors.offer = "Offer must be 1-50 chars";
  }
  if (imageUrl !== undefined) {
    const v = t(imageUrl);
    if (!v) errors.imageUrl = "Image URL is required";
  }
  return errors;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const contentType = req.headers.get("content-type") || "";

    let payload: any = {};
    if (contentType.includes("application/json")) {
      payload = await req.json().catch(() => ({}));
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      payload = {
        name: String(form.get("name") || ""),
        description: String(form.get("description") || ""),
        offer: String(form.get("offer") || ""),
        imageUrl: String(form.get("imageUrl") || ""),
        active: String(form.get("active") || "").toLowerCase() === "true" ? true : true,
      };
    } else {
      const text = await req.text();
      try { payload = JSON.parse(text); } catch { payload = {}; }
    }

    const name = String(payload.name || "").trim();
    const description = String(payload.description || "").trim();
    const offer = String(payload.offer || "").trim();
    const imageUrl = String(payload.imageUrl || "").trim();
    const active = payload.active === false ? false : true;

    const errors = validate({ name, description, offer, imageUrl });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const created = await PromotionCarouselItem.create({ name, description, offer, imageUrl, active });
    return NextResponse.json(toDTO(created), { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/promotion-carousel error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
