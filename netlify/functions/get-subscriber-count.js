export const handler = async () => {
    const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
    const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

    const API_URL = `https://api.emailoctopus.com/lists/${LIST_ID}`;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Error fetching list: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        const subscriberCount = data.counts[0]?.subscribed ?? 0;

        return {
            statusCode: 200,
            body: JSON.stringify({ subscriberCount }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
