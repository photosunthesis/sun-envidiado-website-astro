import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getCollection, render } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const items = [];
  for (const post of posts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    items.push({
      ...post.data,
      link: `/blog/${post.slug}`,
      content: content
        .replaceAll('src="/', `src="${context.site}/`)
        .replaceAll('href="/', `href="${context.site}/`)
        .replaceAll('srcset="/', `srcset="${context.site}/`),
      pubDate: post.data.pubDate,
    });
  }

  return rss({
    title: 'Sun Envidiado Blog',
    description:
      'Random thoughts from Sun about coding, gaming, life updates, and whatever else crosses my mind.',
    site: context.site?.toString() || 'https://sun-envidiado.com',
    items,
    customData: `<language>en-us</language>`,
  });
};
