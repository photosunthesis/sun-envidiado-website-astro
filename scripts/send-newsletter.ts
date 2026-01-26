import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_SEGMENT_ID = process.env.BLOG_SEGMENT_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://sun-envidiado.com';
const BLOG_DIR = path.join(__dirname, '../src/pages/blog');
const TRACKING_FILE = path.join(__dirname, 'newsletter-tracking.json');

interface BlogMetadata {
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

interface TrackingData {
  sent: Record<string, string>;
}

async function getBlogMetadata(blogPath: string): Promise<BlogMetadata | null> {
  try {
    const indexPath = path.join(blogPath, 'index.mdx');
    const content = await fs.readFile(indexPath, 'utf-8');

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const frontmatter = frontmatterMatch[1];

    const titleMatch = frontmatter.match(/title:\s*("(.*)"|'(.*)')/);
    const title = titleMatch ? titleMatch[2] || titleMatch[3] : null;

    const descriptionMatch = frontmatter.match(/description:\s*("(.*)"|'(.*)')/);
    const description = descriptionMatch ? descriptionMatch[2] || descriptionMatch[3] : null;

    const pubDateMatch = frontmatter.match(/pubDate:\s*("(.*)"|'(.*)')/);
    const pubDate = pubDateMatch ? pubDateMatch[2] || pubDateMatch[3] : null;

    const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/)?.[1];
    const tags = tagsMatch
      ? tagsMatch.split(',').map((tag) => tag.trim().replace(/["']/g, ''))
      : [];

    if (!title || !description || !pubDate) return null;

    return { title, description, pubDate, tags };
  } catch (error) {
    console.error(`Error reading blog metadata from ${blogPath}:`, error);
    return null;
  }
}

async function getNewBlogs(): Promise<Array<{ slug: string; metadata: BlogMetadata }>> {
  const trackingData: TrackingData = JSON.parse(await fs.readFile(TRACKING_FILE, 'utf-8'));

  const blogDirs = await fs.readdir(BLOG_DIR);
  const newBlogs: Array<{ slug: string; metadata: BlogMetadata }> = [];

  for (const dir of blogDirs) {
    if (dir.startsWith('.')) continue;

    const blogPath = path.join(BLOG_DIR, dir);
    const stats = await fs.stat(blogPath);

    if (!stats.isDirectory()) continue;
    if (trackingData.sent[dir]) continue;

    const metadata = await getBlogMetadata(blogPath);
    if (metadata) {
      newBlogs.push({ slug: dir, metadata });
    }
  }

  return newBlogs.sort(
    (a, b) => new Date(a.metadata.pubDate).getTime() - new Date(b.metadata.pubDate).getTime(),
  );
}

async function sendNewsletter(blog: { slug: string; metadata: BlogMetadata }) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not found in environment');
  }

  const resend = new Resend(RESEND_API_KEY);
  const blogUrl = `${SITE_URL}/blog/${blog.slug}`;

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222; max-width: 600px; padding: 20px; line-height: 1.6;">
      <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
        I just published a new blog post!
      </p>

      <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #09090b;">${blog.metadata.title}</h3>
      
      <p style="font-size: 16px; color: #666; margin-bottom: 24px; font-style: italic; border-left: 2px solid #e4e4e7; padding-left: 16px;">
        "${blog.metadata.description}"
      </p>
      
      <div style="margin: 32px 0;">
        <a href="${blogUrl}" style="background-color: #09090b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 15px;">Read Full Article</a>
      </div>
      
      <div style="margin-top: 48px;">
        <p style="margin: 0; font-size: 16px; color: #333; font-weight: 600;">
          Sun Envidiado
        </p>
        <p style="margin: 16px 0 0; font-size: 13px; color: #a1a1aa;">
          If you'd like to stop receiving these emails, you can <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #a1a1aa; text-decoration: underline;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  `;

  const { data, error } = await resend.broadcasts.create({
    segmentId: BLOG_SEGMENT_ID,
    from: `Sun Envidiado's Blogs <blogs@sun-envidiado.com>`,
    subject: `${blog.metadata.title} – Sun Envidiado`,
    html: emailHtml,
    send: true,
    name: blog.metadata.title,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function updateTracking(slug: string) {
  const trackingData: TrackingData = JSON.parse(await fs.readFile(TRACKING_FILE, 'utf-8'));

  trackingData.sent[slug] = new Date().toISOString();

  await fs.writeFile(TRACKING_FILE, JSON.stringify(trackingData, null, 2), 'utf-8');
}

async function main() {
  console.log('🔍 Checking for new blog posts...\n');

  const newBlogs = await getNewBlogs();

  if (newBlogs.length === 0) {
    console.log('✅ No new blogs to send newsletters for');
    return;
  }

  console.log(`📧 Found ${newBlogs.length} new blog(s) to send newsletters for:\n`);

  for (const blog of newBlogs) {
    console.log(`   - ${blog.metadata.title} (${blog.slug})`);
  }

  console.log('\n📮 Sending newsletters...\n');

  for (const blog of newBlogs) {
    try {
      console.log(`   Sending: ${blog.metadata.title}`);
      await sendNewsletter(blog);
      await updateTracking(blog.slug);
      console.log(`   ✅ Sent and tracked: ${blog.slug}\n`);
    } catch (error) {
      console.error(`   ❌ Failed to send newsletter for ${blog.slug}:`, error);
    }
  }

  console.log('🎉 Newsletter sending complete!');
  console.log('\n💡 Remember to commit newsletter-tracking.json to git');
}

main().catch(console.error);
