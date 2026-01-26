import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") || "13.7328106";
  const lon = searchParams.get("lon") || "100.3699555";
  const token =
    process.env.TMD_TOKEN ||
    process.env.NEXT_PUBLIC_TMD_TOKEN ||
    searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "TMD_TOKEN is not configured" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=${lat}&lon=${lon}`,
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { error: "Upstream weather API error", status: response.status, body: text },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather route error:", error);
    return NextResponse.json(
      { error: "Unable to reach weather API" },
      { status: 502 },
    );
  }
}
