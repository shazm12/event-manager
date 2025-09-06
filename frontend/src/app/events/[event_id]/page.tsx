"use client"

import { useState, useEffect, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, ArrowLeft, User, Mail } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Event, Attendee } from "../../types"

export default function EventDetailsPage({ params }: { params: Promise<{ event_id: string }> }) {
  const { event_id } = use(params)
  const [event, setEvent] = useState<Event | null>(null)
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEventDetails()
  }, [event_id])

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load event details', {
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
    if (percentage >= 90) {
      return { status: 'full', color: 'bg-red-100 text-red-800' }
    } else if (percentage >= 70) {
      return { status: 'almost-full', color: 'bg-yellow-100 text-yellow-800' }
    } else {
      return { status: 'available', color: 'bg-green-100 text-green-800' }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-4">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/events">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const eventStatus = getEventStatus(event.start_time, event.end_time)
  const capacityStatus = getCapacityStatus(attendees.length, event.max_capacity)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/events">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </Link>
      </div>

      {/* Event Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{event.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={eventStatus.color}>
                {eventStatus.status}
              </Badge>
              <Badge variant="outline" className={capacityStatus.color}>
                {capacityStatus.status}
              </Badge>
            </div>
          </div>
          {eventStatus.status === 'ended' || capacityStatus.status === 'full' ? (
            <Button 
              disabled
              className="mt-4 sm:mt-0"
            >
              {eventStatus.status === 'ended' ? 'Event Ended' : 'Event Full'}
            </Button>
          ) : (
            <Link href={`/events/${event_id}/register`}>
              <Button className="mt-4 sm:mt-0">
                Register
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-muted-foreground">{formatDate(event.start_time)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-semibold">Time</h3>
                  <p className="text-muted-foreground">
                    {formatTime(event.start_time)} - {formatTime(event.end_time)}
                  </p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold">Capacity</h3>
                  <p className="text-muted-foreground mb-2">
                    {attendees.length} / {event.max_capacity} attendees
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        capacityStatus.status === 'full' ? 'bg-red-500' :
                        capacityStatus.status === 'almost-full' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((attendees.length / event.max_capacity) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendees List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Attendees ({attendees.length})
              </CardTitle>
              <CardDescription>
                People registered for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              {attendees.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No attendees yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to register!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {attendees.slice(0, 3).map((attendee, index) => (
                      <div key={attendee.id || index} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{attendee.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span>{attendee.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {attendees.length > 3 && (
                    <div className="text-center pt-4 border-t">
                      <Link href={`/events/${event_id}/attendees`}>
                        <Button variant="outline" size="sm">
                          View All {attendees.length} Attendees
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}