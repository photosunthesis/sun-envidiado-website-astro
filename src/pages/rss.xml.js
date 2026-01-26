import rss from '@astrojs/rss';

export async function GET(context) {
	const postModules = import.meta.glob('./blog/**/*.{md,mdx}', { eager: true });

	const posts = Object.entries(postModules).map(([path, mod]) => {
		const slug = path
			.replace(/\.mdx?$/, '')
			.split('/blog/')[1]
			?.replace(/\/index$/, '') ?? '';

		const fm = mod.frontmatter ?? {};
		const pubDate = fm.pubDate ? new Date(fm.pubDate) : undefined;

		return {
			link: `/blog/${slug}`,
			title: fm.title ?? slug,
			pubDate: pubDate && !isNaN(pubDate.valueOf()) ? pubDate : new Date(),
			description: fm.description,
			...fm,
		};
	})
	.filter((post) => post.pubDate)
	.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: 'Sun Envidiado Blog',
		description: 'Random thoughts from Sun about coding, gaming, life updates, and whatever else crosses my mind.',
		site: context.site || 'https://sun-envidiado.com',
		items: posts.map((post) => ({
			title: post.title,
			pubDate: post.pubDate,
			description: post.description,
			link: post.link,
		})),
		customData: `<language>en-us</language>`,
	});
}
