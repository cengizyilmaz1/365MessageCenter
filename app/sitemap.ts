import { MetadataRoute } from 'next'
import { getAllMessages } from '@/lib/messages'

export default function sitemap(): MetadataRoute.Sitemap {
  const messages = getAllMessages()
  const baseUrl = 'https://messages.yilmazcengiz.tr'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }
  ]

  const messageUrls = messages.map((message) => ({
    url: `${baseUrl}/message/${message.Id}`,
    lastModified: new Date(message.LastModifiedDateTime || ''),
    changeFrequency: 'monthly' as const,
    priority: message.IsMajorChange ? 0.9 : 0.8,
  }))

  return [...staticPages, ...messageUrls]
}
