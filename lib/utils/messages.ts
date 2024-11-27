import { Message } from '@/types/message'
import { formatDisplayDate } from './date'
import dataMessages from '@/@data/messages.json'

export function getAllMessageIds(): { id: string }[] {
  return dataMessages.map((item) => ({
    id: item.Id,
  }))
}

export function getAllMessages(): Message[] {
  return dataMessages
}

export function getMessageData(id: string): Message | undefined {
  return dataMessages.find((item) => item.Id === id)
}

export function getMessageSummary(msg: Message | undefined): string {    
  const summary = msg?.Details?.find((item) => item.Name === "Summary")
  return summary?.Value?.toString() || ""
}

export function getMessageRoadmapID(msg: Message | undefined): string {    
  const roadmapId = msg?.Details?.find((item) => item.Name === "RoadmapIds")
  return roadmapId?.Value?.toString() || ""
}

export function getMessagePlatforms(msg: Message | undefined): string {    
  const platforms = msg?.Details?.find((item) => item.Name === "Platforms")
  return platforms?.Value?.toString() || ""
}

export function getFormattedDate(dateInput: string | undefined | null): string {
  return formatDisplayDate(dateInput)
}