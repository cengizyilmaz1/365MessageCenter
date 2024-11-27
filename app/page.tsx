import MessagesTable from "@/components/messages-table"
import { getAllMessages } from "@/lib/messages"
import { StatsCards } from "@/components/stats-cards"

export default function IndexPage() {
  const messages = getAllMessages()
  const stats = {
    totalMessages: messages.length,
    majorChanges: messages.filter(m => m.IsMajorChange).length,
    lastUpdated: messages[0]?.LastModifiedDateTime || new Date().toISOString()
  }

  return (
    <section className="container pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl gradient-heading">
            Microsoft 365 Message Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay updated with the latest announcements, changes, and updates from Microsoft 365 services.
          </p>
        </div>

        <StatsCards stats={stats} />
        <MessagesTable />
      </div>
    </section>
  )
}