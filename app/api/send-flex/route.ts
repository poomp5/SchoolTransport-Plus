import axios from 'axios';

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export async function POST(req: Request) {
    const { userId, messageContent } = await req.json();

    const payload = {
        to: userId,
        messages: [
            {
                type: 'flex',
                altText: 'test1',
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
    } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
    }
}
