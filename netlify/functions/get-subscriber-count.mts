import type { Context } from "@netlify/functions";

interface EmailOctopusCount {
    subscribed?: number;
    pending?: number;
    unsubscribed?: number;
}

interface EmailOctopusListResponse {
    id?: string;
    name?: string;
    double_opt_in?: boolean;
    fields?: Array<unknown>; // Define further if needed
    tags?: Array<string>;
    counts?: Array<EmailOctopusCount>;
    created_at?: string;
    last_updated_at?: string;
}

export default async (req: Request, context: Context) => {
    const API_KEY = Netlify.env.get("EMAILOCTOPUS_API_KEY");
    const LIST_ID = Netlify.env.get("EMAILOCTOPUS_LIST_ID");

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
        const subscriberCount: number =
            (data as EmailOctopusListResponse)?.counts?.[0]?.subscribed ?? 0;

        const boostedSubscriberCount = boostSubscribers(subscriberCount);
        return new Response(
            JSON.stringify({ subscriberCount: boostedSubscriberCount })
        );
    } catch (e) {
        console.error("Error fetching subscriber count:", e);
        let errorMessage = "An unknown error occurred";
        if (e instanceof Error) {
            errorMessage = e.message;
        } else if (typeof e === "string") {
            errorMessage = e;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
        });
    }
};

function boostSubscribers(subscriberCount: number) {
    const today = new Date();
    const lastPushDate = new Date("2025-05-19");
    const daysSincePush = Math.floor(
        (today.getTime() - lastPushDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const maxInflation = 15; // never inflate more than this
    const earlyBoost = Math.max(0, 7 - daysSincePush); // higher early on
    const dailyDrift = Math.floor(Math.random() * 2); // 0 or 1
    const wave = Math.round(Math.sin(daysSincePush / 3) * 2); // slight natural variation

    const inflation = Math.min(maxInflation, earlyBoost + dailyDrift + wave);
    const inflatedCount = subscriberCount + inflation;

    // Round up to nearest 5
    const rounded = Math.ceil(inflatedCount / 5) * 5;

    return rounded;
}
