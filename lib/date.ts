import { format as formatDate, parseISO } from "date-fns"

export function formatDisplayDate(date: Date | string | undefined | null): string {
  if (!date) return ""
  const parsedDate = typeof date === "string" ? parseISO(date) : date
  return formatDate(parsedDate, "MMM d, yyyy")
}

export function formatCalendarDate(date: Date): string {
  return formatDate(date, "PPP")
}
