import { Feed } from "feed"
import { getAllMessages } from "@/lib/messages"

export async function GET() {
  const messages = getAllMessages()
  const siteURL = "https://messages.yilmazcengiz.tr"

  const feed = new Feed({
    title: "Microsoft 365 Message Center Archive",
    description: "Latest announcements and updates from Microsoft 365 Message Center",
    id: siteURL,
    link: siteURL,
    language: "en",
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Microsoft 365 Message Center Archive`,
    updated: messages[0] ? new Date(messages[0].LastModifiedDateTime || "") : new Date(),
    author: {
      name: "Microsoft 365 Message Center Archive",
      link: siteURL,
    },
  })

  messages.forEach((message) => {
    feed.addItem({
      title: message.Title,
      id: message.Id,
      link: `${siteURL}/message/${message.Id}`,
      description: message.Body?.Content || "",
      date: new Date(message.LastModifiedDateTime || ""),
      category: message.Services?.map(service => ({ name: service })),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}