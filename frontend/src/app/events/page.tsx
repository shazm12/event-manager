"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner";
import { Event, PaginatedEventsResponse } from "../types";
import { getEvents } from "../actions/get-events";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [pagination, setPagination] = useState<PaginatedEventsResponse['pagination'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 100;
  

  useEffect(() => {
    fetchEvents();
  }, [currentPage])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const skip = (currentPage - 1) * itemsPerPage;
      const data = await getEvents(skip, itemsPerPage);
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load events', {
        description: 'Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getEventStatus = (startTime: string, endTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)

    if (now < start) {
      return { status: 'upcoming', color: 'bg-blue-100 text-blue-800' }
    } else if (now >= start && now <= end) {
      return { status: 'ongoing', color: 'bg-green-100 text-green-800' }
    } else {
      return { status: 'ended', color: 'bg-gray-100 text-gray-800' }
    }
  }

  const getCapacityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 95) {
      return { status: 'full', color: 'bg-red-100 text-red-800' }
    } else if (percentage >= 70) {
      return { status: 'almost-full', color: 'bg-yellow-100 text-yellow-800' }
    } else {
      return { status: 'available', color: 'bg-green-100 text-green-800' }
    }
  }

  const handlePreviousPage = () => {
    if (pagination?.has_prev) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  const handleNextPage = () => {
    if (pagination?.has_next) {
      setCurrentPage(currentPage + 1);
    }
  }

  


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchEvents} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">All Events</h1>
          <p className="text-muted-foreground">
            Discover and join amazing events happening around you
          </p>
        </div>
        <Link href="/">
          <Button className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Events Yet</h2>
          <p className="text-muted-foreground mb-6">
            Be the first to create an event and get the community started!
          </p>
          <Link href="/">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const eventStatus = getEventStatus(event.start_time, event.end_time)
            const capacityStatus = getCapacityStatus(event.attendees.length, event.max_capacity)
            
            return (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-2">{event.name}</CardTitle>
                    <Badge className={eventStatus.color}>
                      {eventStatus.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Date & Time */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(event.start_time)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>
                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                      </span>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>
                        {event.attendees.length} / {event.max_capacity} attendees
                      </span>
                    </div>
                    <Badge variant="outline" className={capacityStatus.color}>
                      {capacityStatus.status}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        capacityStatus.status === 'full' ? 'bg-red-500' :
                        capacityStatus.status === 'almost-full' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((event.attendees.length / event.max_capacity) * 100, 100)}%`
                      }}
                    ></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {eventStatus.status === 'ended' || capacityStatus.status === 'full' ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        disabled
                      >
                        {eventStatus.status === 'ended' ? 'Event Ended' : 'Full'}
                      </Button>
                    ) : (
                      <Link href={`/events/${event.id}/register`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Register
                        </Button>
                      </Link>
                    )}
                    <Link href={`/events/${event.id}/attendees`}>
                      <Button variant="outline" size="sm">
                        Show Attendees
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && pagination.total > pagination.limit && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handlePreviousPage}
            disabled={!pagination.has_prev}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Showing {pagination.skip + 1}-{Math.min(pagination.skip + pagination.limit, pagination.total)} of {pagination.total} events
          </span>
          <Button 
            variant="outline" 
            onClick={handleNextPage}
            disabled={!pagination.has_next}
          >
            Next
          </Button>
        </div>
      )}

      {/* Stats */}
      {events.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{pagination?.total || events.length}</div>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {events.filter(e => getEventStatus(e.start_time, e.end_time).status === 'upcoming').length}
              </div>
              <p className="text-xs text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {events.reduce((sum, event) => sum + event.attendees.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total Attendees</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
