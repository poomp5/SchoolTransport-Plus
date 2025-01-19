// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat") || "13.7563";
    const lon = searchParams.get("lon") || "100.5018";

    try {
        const response = await fetch(
            `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=${lat}&lon=${lon}`,
            {
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
