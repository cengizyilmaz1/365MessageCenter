"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, MessageSquare, Clock, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import CountUp from "react-countup"
import { format } from "date-fns"
import Link from "next/link"

interface StatsCardsProps {
  stats: {
    totalMessages: number
    majorChanges: number
    lastUpdated: string
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp end={stats.totalMessages} duration={2} />
          </div>
          <p className="text-xs text-muted-foreground">
            Active announcements and updates
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Major Changes</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp end={stats.majorChanges} duration={2} />
          </div>
          <p className="text-xs text-muted-foreground">
            Important updates requiring attention
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {format(new Date(stats.lastUpdated), "MMM d, yyyy")}
          </div>
          <p className="text-xs text-muted-foreground">
            Most recent message update
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">RSS Feed</CardTitle>
          <Rss className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Link href="/feed.xml" target="_blank">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 hover:bg-primary hover:text-primary-foreground"
              aria-label="Subscribe to RSS feed"
            >
              <Rss className="h-4 w-4" />
              Subscribe
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">
            Stay updated with RSS
          </p>
        </CardContent>
      </Card>
    </div>
  )
}