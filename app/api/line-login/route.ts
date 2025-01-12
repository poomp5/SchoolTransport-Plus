// app/api/line-login/route.ts
import { NextResponse } from 'next/server';

export function GET() {
    const clientId = process.env.LINE_CHANNEL_ID; // Your Line Channel ID
    const redirectUri = 'https://your-domain.com/callback'; // The callback URL
    const state = 'some-random-state'; // Optional, but useful for CSRF protection

    const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=openid%20profile`;

    return NextResponse.redirect(url);
}
