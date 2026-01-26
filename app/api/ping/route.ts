let latest = { uid: "—", label: "—", id: "" };

export async function POST(req: Request) {
  const { uid, label, id } = await req.json();
  latest = { uid, label, id: id ?? "" };
  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(latest);
}
