// app/api/callback/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const urlParams = new URL(req.url).searchParams;
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    // Retrieve the expected state value from localStorage or a session cookie
    // For the server-side API route, you'll need to pass the state value securely via a session or cookies

    // Assuming `YOUR_EXPECTED_STATE_HERE` is stored in a secure location like cookies
    // In a real application, you might set and retrieve the state from cookies or a session
    const expectedState = req.headers.get('x-line-login-state');  // Example of retrieving from headers or session

    if (state !== expectedState) {
        return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
    }

    const clientId = process.env.LINE_CHANNEL_ID || '';
    const clientSecret = process.env.LINE_CHANNEL_SECRET || '';
    const redirectUri = process.env.LINE_CALLBACK_URL || '';

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code || '');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        // Request access token
        const tokenResponse = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            params
        );

        const accessToken = tokenResponse.data.access_token;

        // Fetch user profile
        const profileResponse = await axios.get(
            'https://api.line.me/v2/profile',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const userProfile = profileResponse.data;

        return NextResponse.json({ profile: userProfile });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to get user profile' }, { status: 500 });
    }
}
