import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://counter.robloxwikihub.com';

  const routes = [
    '',
    '/linkedin-character-counter',
    '/twitter-character-counter',
    '/seo-meta-length-checker',
    '/instagram-character-counter',
    '/amazon-listing-character-counter',
    '/words-to-time-calculator',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
