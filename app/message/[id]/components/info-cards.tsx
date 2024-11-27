"use client"

import { getFormattedDate, getMessageData, getMessagePlatforms, getMessageRoadmapID } from "@/lib/utils"
import { AlertCircle, Calendar, CalendarClock, ExternalLink, MessageSquare, MonitorSmartphone, Tag, Route } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function InfoCards({ id }: { id: string }) {
    const msg = getMessageData(id)
    const dates = {
        published: getFormattedDate(msg?.StartDateTime),
        actionBy: getFormattedDate(msg?.ActionRequiredByDateTime),
        updated: getFormattedDate(msg?.LastModifiedDateTime),
        end: getFormattedDate(msg?.EndDateTime)
    }

    const roadmapId = getMessageRoadmapID(msg)
    const platforms = getMessagePlatforms(msg)

    return (
        <div className="space-y-4 w-full">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {/* Message ID Card */}
                <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                    <a href={`https://admin.microsoft.com/#/MessageCenter/:/messages/${msg?.Id}`} target="_blank" rel="noopener noreferrer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium flex gap-1">
                                Message ID <ExternalLink className="h-4 w-4 text-gray-500" />
                            </CardTitle>
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex">{msg?.Id}</div>
                            <p className="text-xs text-muted-foreground">View in Message Center</p>
                        </CardContent>
                    </a>
                </Card>

                {/* Services Card */}
                {msg?.Services && msg.Services.length > 0 && (
                    <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Services</CardTitle>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M10 4v4" />
                                <path d="M2 8h20" />
                                <path d="M6 4v4" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-0.5">
                                {msg.Services.map((service) => (
                                    <Badge key={service} variant="secondary">
                                        {service}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Dates Card */}
                <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                        <Calendar className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            {dates.published && (
                                <div>
                                    <span className="text-muted-foreground">Published:</span>
                                    <br />
                                    {dates.published}
                                </div>
                            )}
                            {dates.updated && dates.updated !== dates.published && (
                                <div>
                                    <span className="text-muted-foreground">Updated:</span>
                                    <br />
                                    {dates.updated}
                                </div>
                            )}
                            {dates.end && (
                                <div>
                                    <span className="text-muted-foreground">End Date:</span>
                                    <br />
                                    {dates.end}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Status Card */}
                <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status & Tags</CardTitle>
                        <AlertCircle className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-0.5">
                            {msg?.IsMajorChange && (
                                <Badge variant="destructive" className="animate-pulse">
                                    Major Change
                                </Badge>
                            )}
                            {msg?.Tags?.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Roadmap ID Card */}
                {roadmapId && (
                    <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                        <a href={`https://www.microsoft.com/en-US/microsoft-365/roadmap?filters=&searchterms=${roadmapId}`} target="_blank" rel="noopener noreferrer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex gap-1">
                                    Roadmap ID <ExternalLink className="h-4 w-4 text-gray-500" />
                                </CardTitle>
                                <Route className="h-5 w-5 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{roadmapId}</div>
                                <p className="text-xs text-muted-foreground">View in M365 Roadmap</p>
                            </CardContent>
                        </a>
                    </Card>
                )}

                {/* Platforms Card */}
                {platforms && (
                    <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Platforms</CardTitle>
                            <MonitorSmartphone className="h-5 w-5 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-0.5">
                                {platforms.split(",").map((platform) => (
                                    <Badge key={platform} variant="secondary">
                                        {platform.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Action Required By Card */}
                {dates.actionBy && (
                    <Card className="overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Action Required By
                            </CardTitle>
                            <CalendarClock className="h-5 w-5 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dates.actionBy}</div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
