export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const msg = getMessageData(params.id)
  const summary = getMessageSummary(msg) || msg?.Body?.Content || ""
  const truncatedSummary = summary.substring(0, 160)

  return {
    title: `${msg?.Id} - ${msg?.Title}`,
    description: truncatedSummary,
    openGraph: {
      title: `${msg?.Id} - ${msg?.Title}`,
      description: truncatedSummary,
      type: 'article',
      url: `https://messages.yilmazcengiz.tr/message/${params.id}`,
      publishedTime: msg?.StartDateTime,
      modifiedTime: msg?.LastModifiedDateTime,
      authors: ['Microsoft 365 Message Center'],
      tags: msg?.Tags,
      images: [
        {
          url: `https://messages.yilmazcengiz.tr/api/og?id=${params.id}`,
          width: 1200,
          height: 630,
          alt: msg?.Title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${msg?.Id} - ${msg?.Title}`,
      description: truncatedSummary,
      images: [`https://messages.yilmazcengiz.tr/api/og?id=${params.id}`],
    },
    alternates: {
      canonical: `https://messages.yilmazcengiz.tr/message/${params.id}`,
    }
  }
}
