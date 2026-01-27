import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		layout: z.string().optional(), // Kept for backward compatibility, though usually handled in the page
	}),
});

export const collections = { blog };
