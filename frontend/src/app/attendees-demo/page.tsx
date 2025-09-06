"use client"

import { AttendeesList } from "@/components/attendees-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AttendeesDemoPage() {
  const [eventId, setEventId] = useState("1")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Attendees List Component Demo</h1>
        <p className="text-muted-foreground">
          Test the attendees list component with different event IDs
        </p>
      </div>

      {/* Event ID Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Different Event IDs</CardTitle>
          <CardDescription>
            Enter an event ID to see its attendees list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventId">Event ID</Label>
              <Input
                id="eventId"
                type="text"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Enter event ID (e.g., 1, 2, 3)"
                className="w-32"
              />
            </div>
            <div className="pt-6">
              <Button onClick={() => setEventId(eventId)}>
                Load Attendees
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendees List Component */}
      <div className="max-w-4xl">
        <AttendeesList eventId={eventId} />
      </div>

      {/* Component Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Component Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Shows event ID in the header</li>
            <li>• Displays attendees with name and email</li>
            <li>• Pagination with 10 items per page</li>
            <li>• Page numbers and navigation controls</li>
            <li>• Loading states and error handling</li>
            <li>• Empty state when no attendees</li>
            <li>• Responsive design</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
