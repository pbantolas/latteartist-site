import { defineCollection, z } from "astro:content";

const roadmapCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
    }),
});

const logCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
    }),
});

const privacyCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
    }),
});

const guidesCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        eyebrow: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        readTime: z.string(),
        order: z.number(),
        featured: z.boolean().default(false),
        footerLabel: z.string().optional(),
        keywords: z.array(z.string()),
        ogImage: z.string().optional(),
        related: z.array(z.string()).default([]),
    }),
});

const releasesCollection = defineCollection({
    type: "content",
    schema: z.object({
        version: z.string(),
        title: z.string(),
        pubDate: z.date(),
    }),
});

export const collections = {
    releases: releasesCollection,
    roadmap: roadmapCollection,
    log: logCollection,
    privacy: privacyCollection,
    guides: guidesCollection,
};
