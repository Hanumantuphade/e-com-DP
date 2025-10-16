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

export async function PATCH(_req: Request, ctx: { params: { id: string } }) {
  try {
    await connectDB();
    const id = ctx.params.id;

    const contentType = _req.headers.get("content-type") || "";
    let payload: any = {};
    if (contentType.includes("application/json")) {
      payload = await _req.json().catch(() => ({}));
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const form = await _req.formData();
      payload = {
        name: form.has("name") ? String(form.get("name") || "") : undefined,
        description: form.has("description") ? String(form.get("description") || "") : undefined,
        offer: form.has("offer") ? String(form.get("offer") || "") : undefined,
        imageUrl: form.has("imageUrl") ? String(form.get("imageUrl") || "") : undefined,
        active: form.has("active") ? String(form.get("active") || "").toLowerCase() === "true" : undefined,
      };
    } else {
      const text = await _req.text();
      try { payload = JSON.parse(text); } catch { payload = {}; }
    }

    const updates: any = {};
    if (payload.name !== undefined) updates.name = String(payload.name).trim();
    if (payload.description !== undefined) updates.description = String(payload.description).trim();
    if (payload.offer !== undefined) updates.offer = String(payload.offer).trim();
    if (payload.imageUrl !== undefined) updates.imageUrl = String(payload.imageUrl).trim();
    if (payload.active !== undefined) updates.active = Boolean(payload.active);

    const errors = validate(updates);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const doc = await PromotionCarouselItem.findByIdAndUpdate(id, updates, { new: true });
    if (!doc) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(toDTO(doc), { status: 200 });
  } catch (err) {
    console.error("PATCH /api/admin/promotion-carousel/:id error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  try {
    await connectDB();
    const id = ctx.params.id;
    const doc = await PromotionCarouselItem.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/admin/promotion-carousel/:id error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
