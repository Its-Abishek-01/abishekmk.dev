import type { MetadataRoute } from 'next';

const SITE = 'https://abishekmk.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE + '/', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: SITE + '/portfolio', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
