import type { MetadataRoute } from 'next';

const SITE = 'https://abishek.wiozen.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE + '/', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: SITE + '/portfolio', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
