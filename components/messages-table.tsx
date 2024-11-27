"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, SlidersHorizontal, AlertCircle, X, ChevronDown } from "lucide-react"
import { DateRange } from "react-day-picker"
import { addDays, isWithinInterval, parseISO, startOfDay } from "date-fns"
import { getAllMessages, getFormattedDate } from "@/lib/utils"
import { Message } from "@/types/message"
import { DateRangePicker } from "@/components/date-range-picker"

export default function MessagesTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange>()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const messages = getAllMessages()

  // Get unique services and tags
  const uniqueServices = Array.from(new Set(messages.flatMap(m => m.Services || [])))
  const uniqueTags = Array.from(new Set(messages.flatMap(m => m.Tags || [])))

  const filteredMessages = messages.filter((message) => {
    const searchContent = `${message.Id} ${message.Title} ${message.Services?.join(" ")} ${message.Tags?.join(" ")}`.toLowerCase()
    const matchesSearch = searchContent.includes(searchQuery.toLowerCase())
    const matchesServices = selectedServices.length === 0 || 
      message.Services?.some(service => selectedServices.includes(service))
    const matchesTags = selectedTags.length === 0 || 
      message.Tags?.some(tag => selectedTags.includes(tag))
    
    let matchesDateRange = true
    if (dateRange?.from || dateRange?.to) {
      const messageDate = message.LastModifiedDateTime ? parseISO(message.LastModifiedDateTime) : null
      if (messageDate) {
        if (dateRange.from && dateRange.to) {
          matchesDateRange = isWithinInterval(messageDate, { 
            start: startOfDay(dateRange.from), 
            end: startOfDay(addDays(dateRange.to, 1)) 
          })
        } else if (dateRange.from) {
          matchesDateRange = messageDate >= startOfDay(dateRange.from)
        } else if (dateRange.to) {
          matchesDateRange = messageDate <= startOfDay(addDays(dateRange.to, 1))
        }
      }
    }

    return matchesSearch && matchesServices && matchesTags && matchesDateRange
  })

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearDateRange = () => {
    setDateRange(undefined)
  }

  const clearAllFilters = () => {
    setSelectedServices([])
    setSelectedTags([])
    clearDateRange()
  }

  const hasActiveFilters = selectedServices.length > 0 || selectedTags.length > 0 || dateRange?.from || dateRange?.to

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 border-b">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[300px]">
              <Input
                placeholder="Search messages by ID, title, service, or tags..."
                className="pl-9 pr-4 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search messages"
              />
              <Search 
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>

            <DateRangePicker
              date={dateRange}
              onChange={setDateRange}
              className="min-w-[240px]"
            />
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        aria-label="Filter messages"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-1">
                            {selectedServices.length + selectedTags.length + ((dateRange?.from || dateRange?.to) ? 1 : 0)}
                          </Badge>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter messages by service and tags</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <PopoverContent className="w-[400px] p-6" align="end">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Services</h4>
                      {selectedServices.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedServices([])}
                          className="h-8 px-2 text-xs"
                        >
                          Clear services
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                      {uniqueServices.map((service) => (
                        <Button
                          key={service}
                          variant={selectedServices.includes(service) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleService(service)}
                          className="h-7 text-xs"
                        >
                          {service}
                          {selectedServices.includes(service) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Tags</h4>
                      {selectedTags.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTags([])}
                          className="h-8 px-2 text-xs"
                        >
                          Clear tags
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTag(tag)}
                          className="h-7 text-xs"
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="w-full"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="px-2 py-1"
                >
                  {service}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => toggleService(service)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-1"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => toggleTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-background shadow">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead className="min-w-[300px]">Title</TableHead>
              <TableHead className="min-w-[200px]">Services</TableHead>
              <TableHead className="min-w-[200px]">Tags</TableHead>
              <TableHead className="w-[150px]">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow 
                key={message.Id} 
                className="group cursor-pointer hover:bg-muted/50"
                onClick={() => window.location.href = `/message/${message.Id}`}
              >
                <TableCell>
                  {message.IsMajorChange && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Major Change</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {message.Id}
                </TableCell>
                <TableCell className="font-medium">
                  {message.Title}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {message.Services?.map((service) => (
                      <Badge 
                        key={service} 
                        variant="outline" 
                        className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleService(service)
                        }}
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {message.Tags?.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTag(tag)
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {getFormattedDate(message.LastModifiedDateTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
