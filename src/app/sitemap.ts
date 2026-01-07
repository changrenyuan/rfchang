import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rf-research.com';

  // 静态页面列表
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // 技术札记页面（示例数据）
  const notes = [
    {
      slug: 'wi-fi-7-rf-frontend-architecture',
      lastModified: new Date('2025-01-15'),
    },
    {
      slug: 'smith-chart-impedance-matching',
      lastModified: new Date('2025-01-10'),
    },
    {
      slug: 'mmwave-pa-linearization',
      lastModified: new Date('2025-01-05'),
    },
    {
      slug: '5g-massive-mimo-design',
      lastModified: new Date('2024-12-28'),
    },
    {
      slug: 'high-speed-signal-integrity',
      lastModified: new Date('2024-12-20'),
    },
  ];

  const noteRoutes = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: note.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...noteRoutes];
}
