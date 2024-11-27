import { MetadataRoute } from 'next'
import { getAllMessages } from '@/lib/messages'

export default function sitemap(): MetadataRoute.Sitemap {
  const messages = getAllMessages()
  const baseUrl = 'https://messages.yilmazcengiz.tr'

  const messageUrls = messages.map((message) => ({
    url: `${baseUrl}/message/${message.Id}`,
    lastModified: new Date(message.LastModifiedDateTime || ''),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...messageUrls,
  ]
}