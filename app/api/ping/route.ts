type Latest = { uid: string; label: string; id: string };

// In-memory "last tapped card". Note: on serverless (Vercel) this is per-instance
// and may reset between requests; fine for a single long-running server / local dev.
let latest: Latest = { uid: "—", label: "—", id: "" };

// POST — called by the Arduino reader on each tap.
// Echoes back { label, id } so the device can show the student on its OLED.
export async function POST(req: Request) {
  const { uid, studentId } = await req.json().catch(() => ({}));

  const id = (studentId ?? "").toString().trim();
  const label = id ? "Student" : "UNKNOWN";

  latest = {
    uid: (uid ?? "").toString().trim() || "—",
    label,
    id,
  };

  // Keys match what the Arduino parses: jsonValue(resp, "label") / "id".
  return Response.json({ ok: true, ...latest });
}

// GET — polled by the /admin/rfid page to show the most recent tap.
export async function GET() {
  return Response.json(latest);
}
