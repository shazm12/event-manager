"use client"

import { use } from "react"
import { AttendeesList } from "@/components/attendees-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AttendeesPageProps {
  params: Promise<{ event_id: string }>
}

export default function AttendeesPage({ params }: AttendeesPageProps) {
  const { event_id } = use(params)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/events`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Event Attendees</h1>
        <p className="text-muted-foreground">
          View all attendees registered for this event
        </p>
      </div>

      {/* Attendees List Component */}
      <div className="max-w-4xl">
        <AttendeesList eventId={event_id} />
      </div>
    </div>
  )
}
