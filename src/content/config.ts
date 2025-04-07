import { defineCollection, z } from "astro:content";

const roadmapCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: z.object({
		title: z.string(),
	}),
});

const ideasCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date().optional(),
	}),
});

const logCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
	}),
});

export const collections = {
	roadmap: roadmapCollection,
	ideas: ideasCollection,
	log: logCollection,
};
