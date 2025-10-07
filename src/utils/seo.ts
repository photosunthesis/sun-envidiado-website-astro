import type { ImageMetadata } from "astro";

/**
 * Site-wide configuration for SEO
 */
export const SITE_CONFIG = {
  siteName: "Sun Envidiado",
  authorName: "Sun Envidiado",
  defaultDescription:
    "Personal website where I share my thoughts about anything and everything.",
  defaultImage: "/default.png",
  siteUrl: "https://sun-envidiado.com",
} as const;

/**
 * Metadata structure for SEO
 */
export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  imageUrl: string;
  type: "website" | "article";
  noIndex?: boolean;
  author?: string;
  pubDate?: string;
  tags?: string[];
}

/**
 * Generate canonical URL from path and base
 */
export function generateCanonicalUrl(
  pathname: string,
  site?: URL | string,
): string {
  const baseUrl = site || SITE_CONFIG.siteUrl;
  return new URL(pathname, baseUrl).toString();
}

/**
 * Generate absolute image URL
 */
export function generateImageUrl(
  imageSrc: string,
  site?: URL | string,
): string {
  const baseUrl = site || SITE_CONFIG.siteUrl;
  return new URL(imageSrc, baseUrl).toString();
}

/**
 * Build SEO metadata from frontmatter and page context
 */
export function buildSEOMetadata(params: {
  frontmatter?: Record<string, unknown>;
  pathname: string;
  site?: URL | string;
  coverImage?: ImageMetadata;
}): SEOMetadata {
  const { frontmatter = {}, pathname, site, coverImage } = params;

  // Support both frontmatter and direct props for backwards compatibility
  const rawTitle = (frontmatter.title as string) || SITE_CONFIG.siteName;
  const pubDate = frontmatter.pubDate as string | undefined;
  
  // Append site name to blog posts
  const title = pubDate ? `${rawTitle} — Sun Envidiado` : rawTitle;
  
  const description =
    (frontmatter.description as string) || SITE_CONFIG.defaultDescription;
  const canonical = frontmatter.url
    ? (frontmatter.url as string)
    : generateCanonicalUrl(pathname, site);
  const tags = (frontmatter.tags as string[]) || [];
  const noIndex = (frontmatter.noIndex as boolean) || false;

  // Determine content type from frontmatter or default
  const explicitType = frontmatter.type as "website" | "article" | undefined;
  const type = explicitType || (pubDate ? "article" : "website");

  // Generate image URL
  let imageUrl: string;
  if (coverImage) {
    imageUrl = generateImageUrl(coverImage.src, site);
  } else if (frontmatter.image) {
    // If image is already a full URL, use it directly
    const imageValue = frontmatter.image as string;
    imageUrl = imageValue.startsWith("http")
      ? imageValue
      : generateImageUrl(imageValue, site);
  } else {
    imageUrl = generateImageUrl(SITE_CONFIG.defaultImage, site);
  }

  // Add author for blog posts
  const author = pubDate ? SITE_CONFIG.authorName : undefined;

  return {
    title,
    description,
    canonical,
    imageUrl,
    type,
    noIndex,
    author,
    pubDate,
    tags,
  };
}
