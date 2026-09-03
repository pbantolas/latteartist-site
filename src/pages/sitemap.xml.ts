import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { guideSlug } from "../lib/guides";

export const GET: APIRoute = async ({ site }) => {
    const guides = await getCollection("guides");
    const staticPaths = [
        "/",
        "/learn/",
        "/releases/",
        "/support/",
        "/privacy-policy/",
    ];
    const urls = [
        ...staticPaths.map((path) => ({ loc: new URL(path, site).href })),
        ...guides.map((guide) => ({
            loc: new URL(`/learn/${guideSlug(guide.id)}/`, site).href,
            lastmod: (guide.data.updatedDate ?? guide.data.pubDate).toISOString().slice(0, 10),
        })),
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

    return new Response(body, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
};
