// app/api/callback/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const urlParams = new URL(req.url).searchParams;
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    // Check for state to prevent CSRF attacks
    if (state !== 'some-random-state') {
        return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
    }

    const clientId = process.env.LINE_CHANNEL_ID || '';
    const clientSecret = process.env.LINE_CHANNEL_SECRET || '';
    const redirectUri = 'https://your-domain.com/callback'; // Your redirect URI

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code || '');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            params
        );

        const accessToken = tokenResponse.data.access_token;

        // Use the access token to fetch user profile info
        const profileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userProfile = profileResponse.data;
        console.log('User Profile:', userProfile); // Contains userId, displayName, pictureUrl, etc.

        // Optionally store user information in your database or session
        // For example, store the userId for later use
        return NextResponse.json(userProfile);
    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
