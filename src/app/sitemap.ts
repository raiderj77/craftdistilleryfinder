import type { MetadataRoute } from 'next';

const INDEXABLE_PATHS = ['', '/about', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path, index) => ({
    url: `https://craftdistilleryfinder.com${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }));
}
