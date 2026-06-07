import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token =
    process.env.WAQI_TOKEN ||
    process.env.NEXT_PUBLIC_WAQI_TOKEN ||
    searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "WAQI_TOKEN is not configured" },
      { status: 400 },
    );
  }

  try {
    // St. John Fisher University — Rochester, NY
    const lat = searchParams.get("lat") || "43.1160653";
    const lon = searchParams.get("lon") || "-77.5119079";
    const response = await fetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { error: "Upstream AQI API error", status: response.status, body: text },
        { status: response.status },
      );
    }

    const data = await response.json();
    if (data && data.data && data.data.iaqi && data.data.iaqi.pm25) {
      const iaqi = data.data.iaqi;
      return NextResponse.json({
        aqi: data.data.aqi,
        pm25: iaqi.pm25.v,
        temp: iaqi.t?.v ?? null,
        humidity: iaqi.h?.v ?? null,
        city: data.data.city?.name ?? null,
      });
    }

    return NextResponse.json(
      { error: "Unexpected AQI response shape" },
      { status: 502 },
    );
  } catch (error) {
    console.error("PM route error:", error);
    return NextResponse.json(
      { error: "Unable to reach AQI API" },
      { status: 502 },
    );
  }
}
