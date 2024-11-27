"use client"

import { getMessageData, getMessageSummary, getMessageRoadmapID } from "@/lib/messages"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Link2, Twitter, Linkedin, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import InfoCards from "./info-cards"

export default function MessageDetail(props: { id: string }) {
  const msg = getMessageData(props.id)
  const summary = getMessageSummary(msg)
  const roadmapId = getMessageRoadmapID(msg)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyId = () => {
    navigator.clipboard.writeText(props.id)
    toast.success("Message ID copied to clipboard")
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success("URL copied to clipboard")
  }

  const handleShareTwitter = () => {
    const text = `${msg?.Title}\n\n${currentUrl}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-lg">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyId}
                  className="transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Copy message ID"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ID
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy message ID to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyUrl}
                  className="transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Copy message URL"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy URL
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy message URL to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShareTwitter}
                  className="transition-all hover:bg-[#1DA1F2] hover:text-white"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on X
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this message on X (Twitter)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShareLinkedIn}
                  className="transition-all hover:bg-[#0A66C2] hover:text-white"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this message on LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <InfoCards id={props.id} />
      
      {summary && (
        <Card className="w-full overflow-hidden rounded-xl border shadow-lg glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              {summary}
            </p>
          </CardContent>
        </Card>
      )}

      {roadmapId && (
        <Card className="w-full overflow-hidden rounded-xl border shadow-lg glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href={`https://www.microsoft.com/en-US/microsoft-365/roadmap?filters=&searchterms=${roadmapId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg leading-relaxed hover:underline"
            >
              View in Microsoft 365 Roadmap ({roadmapId})
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="w-full overflow-hidden rounded-xl border shadow-lg">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle className="text-xl font-semibold">More information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div 
              className="space-y-4" 
              dangerouslySetInnerHTML={{ 
                __html: msg?.Body?.Content?.replace(
                  /<a /g, 
                  '<a class="text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer" '
                ) || '' 
              }} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}