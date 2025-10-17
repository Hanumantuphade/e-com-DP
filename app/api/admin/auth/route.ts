import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let password = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      password = String(body?.password || "");
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      password = String(form.get("password") || "");
    } else {
      password = await req.text();
    }

    const expected = process.env.ADMIN_PASSWORD || "";
    if (!expected) {
      return NextResponse.json({ error: "Server not configured (ADMIN_PASSWORD missing)" }, { status: 500 });
    }

    if (password !== expected) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch (err) {
    console.error("POST /api/admin/auth error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
