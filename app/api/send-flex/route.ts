import axios from 'axios';

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export async function POST(req: Request) {
    const { userId, messageContent } = await req.json();

    const payload = {
        to: userId,
        messages: [
            {
                type: 'flex',
                altText: 'This is a Flex Message',
                contents: messageContent,
            },
        ],
    };

    try {
        const response = await axios.post(
            'https://api.line.me/v2/bot/message/push',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
                },
            }
        );

        return new Response(JSON.stringify({ success: true, data: response.data }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
