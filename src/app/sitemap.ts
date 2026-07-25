import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://fixed-landing-beta.vercel.app';
  const locales = ['es', 'en'];
  const paths = ['', '/faq', '/plans', '/cookies', '/privacy', '/terms'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const isHome = path === '';
    const priorityMap: Record<string, number> = {
      '': 1.0,
      '/plans': 0.8,
      '/faq': 0.7,
      '/cookies': 0.4,
      '/privacy': 0.4,
      '/terms': 0.4,
    };
    const priority = priorityMap[path] ?? 0.5;

    const changeFrequency = isHome ? ('daily' as const) : ('weekly' as const);

    for (const lang of locales) {
      const url = `${baseUrl}/${lang}${path}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return sitemapEntries;
}
