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
    const response = await fetch(
      `https://api.waqi.info/feed/geo:13.7563;100.5018/?token=${token}`,
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
      return NextResponse.json({
        aqi: data.data.aqi,
        pm25: data.data.iaqi.pm25.v,
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
