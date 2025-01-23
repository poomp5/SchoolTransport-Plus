// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat") || "13.7328106";
    const lon = searchParams.get("lon") || "100.3699555";

    try {
        const response = await fetch(
            `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=${lat}&lon=${lon}`,
            {
                headers: {
                    accept: "application/json",
                    authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZlZDhjODY4MDE0YmE2ZDE3YTYwZTZiNmMxNjlmNTM3NmMyMDI2Y2Y2MWUwZWFmYjBjZjBmMmYzMDliMmRmOGJiODgzOGU0NzU1Yzg4NTYxIn0.eyJhdWQiOiIyIiwianRpIjoiNmVkOGM4NjgwMTRiYTZkMTdhNjBlNmI2YzE2OWY1Mzc2YzIwMjZjZjYxZTBlYWZiMGNmMGYyZjMwOWIyZGY4YmI4ODM4ZTQ3NTVjODg1NjEiLCJpYXQiOjE3MzcyNjY5NDIsIm5iZiI6MTczNzI2Njk0MiwiZXhwIjoxNzY4ODAyOTQyLCJzdWIiOiIzNjUyIiwic2NvcGVzIjpbXX0.ArbV6EWlmuVHmiEUffQL4-A-H_zVuNf3mdU-5SIkhQ5cma-Sgil6qCMrUy9E_GFdGWwf5e2vV-KvpJDE7-UvfzPfzCZ7sf1fvv7ieQNMfXM5yU1_01Up9L4YL0VMWiNBQUVfV5X1vNCAL2Un-TwKB8Gs86S1dQqm5hqFS7D-KRnoFDz9Zso-VCS8vplWG7OKSwcjmOpYkjYdQajrZWi47mwSxp8bQyqynggKWsd1iVX65_B5XcgwlQ0P_-ioQWVuu6WpvI1ZMeQbxHH7AMnDbiq-wxzeogBEC2oxdy9ut-nO-0vv1AA451GROMWF3DHhuatz8EkSdBSGx3XBWlXLc1XcWkI8H-ma2JlaYn1LriBHnSfI9wLPckttfvqQ7XjciKcE5wmc9M7onD0TD4N3S7GMiBbR5_K_zEbvpGzRY5H8Txu1cQqajS6iDz2ebTzf5MSLQZirTdubbjle2vOZtdNMDsmenoTW28oYHFJX7DcDR4FNDpDEfKzKv-IruZ0-0MtxHNiQAwA_JgAkB1qLtHwuJF5hz_yYB_Xalb1OoVWdL5W7KXK605Vj7OpKbD6lsWVHx3y--TpUCsLuS1fv6NObGfCxfZyw9xAPc6Y0VWcwOAiwM83lhFXSea3kQJVFVGXccPqaSOpnpmWIGXpPUbLNY1R1MOaExKWFJCT252E`,
                },
            }
        );

        if (!response.ok) {
            console.error(`API Error: ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

}
