import { Metadata, ResolvingMetadata } from "next"
import { getAllMessageIds, getMessageSummary, getMessageData } from "@/lib/messages"
import MessageDetail from "./components/message-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
  const msg = getMessageData(params.id)

  return (
    <section className="container pb-8 pt-6 md:py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-background">
              <ArrowLeft className="h-4 w-4" />
              Back to Messages
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {msg?.Id} - {msg?.Title}
          </h1>
          <MessageDetail id={params.id} />
        </div>
      </div>
    </section>
  )
}

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

export async function generateStaticParams() {
  const paths = getAllMessageIds()
  return paths
}
