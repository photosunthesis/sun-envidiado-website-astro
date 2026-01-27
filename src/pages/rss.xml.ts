import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { loadRenderers } from 'astro:container';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	const posts = (await getCollection('blog'))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const items = [];
	for (const post of posts) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);
		items.push({
			...post.data,
			link: `/blog/${post.slug}`,
			content,
			pubDate: post.data.pubDate,
		});
	}

	return rss({
		title: 'Sun Envidiado Blog',
		description: 'Random thoughts from Sun about coding, gaming, life updates, and whatever else crosses my mind.',
		site: context.site?.toString() || 'https://sun-envidiado.com',
		items,
		customData: `<language>en-us</language>`,
	});
};
