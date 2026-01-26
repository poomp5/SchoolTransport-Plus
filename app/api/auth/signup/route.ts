import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "กรอกอีเมลและรหัสผ่าน" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้แล้ว" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user;
    try {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          name: name || null,
        },
        select: { id: true, email: true, name: true, createdAt: true },
      });
    } catch (err: unknown) {
      // Handle rare race: unique constraint
      if (err instanceof Error && "code" in err && (err as { code: string }).code === "P2002") {
        return NextResponse.json({ error: "อีเมลนี้ถูกใช้แล้ว" }, { status: 409 });
      }
      throw err;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Signup error", error);
    if (error instanceof Error && /ENOTFOUND|ECONNREFUSED|timeout/i.test(error.message)) {
      return NextResponse.json(
        { error: "เชื่อมต่อฐานข้อมูลไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตหรือ DATABASE_URL" },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "ไม่สามารถสมัครสมาชิกได้" }, { status: 500 });
  }
}
