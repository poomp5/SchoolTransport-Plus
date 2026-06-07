import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Body = {
  uid?: string;
  label?: string;
  stuId?: string;
};

async function getPrismaSafe() {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch (err) {
    console.error("Prisma init failed in cards route", err);
    return null;
  }
}

export async function POST(req: Request) {
  const { uid, label, stuId }: Body = await req.json().catch(() => ({}));

  const trimmedUid = uid?.trim();
  const trimmedLabel = label?.trim();
  const trimmedStuId = stuId?.trim();

  if (!trimmedUid) {
    return NextResponse.json({ error: "uid is required" }, { status: 400 });
  }
  if (!trimmedLabel && !trimmedStuId) {
    return NextResponse.json(
      { error: "label or stuId is required" },
      { status: 400 },
    );
  }

  const prisma = await getPrismaSafe();
  if (!prisma) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured; cannot save card" },
      { status: 503 },
    );
  }

  try {
    const card = await prisma.card.upsert({
      where: { uid: trimmedUid },
      create: {
        uid: trimmedUid,
        label: trimmedLabel || trimmedStuId || "UNKNOWN",
        stuId: trimmedStuId || null,
      },
      update: {
        label: trimmedLabel || trimmedStuId || "UNKNOWN",
        stuId: trimmedStuId || null,
      },
    });

    return NextResponse.json({ card });
  } catch (err) {
    console.error("Save card failed", err);
    return NextResponse.json(
      { error: "unable to save card" },
      { status: 500 },
    );
  }
}
