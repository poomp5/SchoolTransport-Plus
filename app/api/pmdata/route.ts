import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `https://api.waqi.info/feed/geo:13.7563;100.5018/?token=${process.env.NEXT_PUBLIC_PM_API_TOKEN}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Log the full response to inspect the structure
        console.log(data);

        // Ensure the expected structure exists before sending the response
        if (data && data.data && data.data.iaqi && data.data.iaqi.pm25) {
            return NextResponse.json({
                aqi: data.data.aqi,
                pm25: data.data.iaqi.pm25.v,
            });
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Error fetching PM data:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
