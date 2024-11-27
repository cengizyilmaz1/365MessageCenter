"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, SlidersHorizontal, AlertCircle, X, Calendar } from "lucide-react"
import { getAllMessages, getFormattedDate } from "@/lib/messages"
import { Message } from "@/types/message"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function MessagesTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
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
    const matchesDate = !selectedDate || 
      new Date(message.LastModifiedDateTime || "").toDateString() === selectedDate.toDateString()
    return matchesSearch && matchesServices && matchesTags && matchesDate
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

  return (
    <div className="flex flex-col gap-4">
      <div className="search-filter-container">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Search messages by ID, title, service, or tags..."
                className="pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search messages"
              />
              <Search 
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            
            <div className="flex gap-2">
              <Popover>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline"
                          className="gap-2 whitespace-nowrap"
                          aria-label="Filter by date"
                        >
                          <Calendar className="h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            "Pick date"
                          )}
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter messages by date</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline"
                          className="gap-2"
                          aria-label="Filter messages"
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                          Filters
                          {(selectedServices.length > 0 || selectedTags.length > 0) && (
                            <Badge variant="secondary" className="ml-1">
                              {selectedServices.length + selectedTags.length}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter messages by service and tags</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
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
                      <h4 className="font-medium mb-2">Tags</h4>
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
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {(selectedServices.length > 0 || selectedTags.length > 0 || selectedDate) && (
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
              {selectedDate && (
                <Badge
                  variant="secondary"
                  className="px-2 py-1"
                >
                  {format(selectedDate, "PPP")}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  setSelectedServices([])
                  setSelectedTags([])
                  setSelectedDate(undefined)
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="table-container overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead className="min-w-[300px]">Title</TableHead>
              <TableHead className="min-w-[200px]">Services</TableHead>
              <TableHead className="min-w-[150px]">Tags</TableHead>
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
                <TableCell>
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
