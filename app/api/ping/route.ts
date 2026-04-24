// eslint-disable-next-line @typescript-eslint/no-unused-vars
let latest = { uid: "—", label: "—", id: "" };

export async function POST(req: Request) {
  const { uid, studentId } = await req.json();

  latest = {
    uid,
    label: "Student",   // or anything you want
    id: studentId ?? ""
  };

  return Response.json({ ok: true });
}