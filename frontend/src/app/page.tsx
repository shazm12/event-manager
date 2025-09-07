"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DateTimeInput } from "@/components/ui/datetime-input"
import { EventFormData } from "./types";
import { toast } from "sonner";
import { createEvent } from "./actions/create-event"
import { useRouter } from "next/navigation";

export default function Home() {

  // Helper function to get current datetime in the correct format
  const getCurrentDateTime = () => {
    const now = new Date()
    now.setHours(now.getHours() + 1)
    return now.toISOString().slice(0, 16)
  }

  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    location: "",
    startTime: getCurrentDateTime(),
    endTime: "",
    maxCapacity: "",
    description: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }

      // Auto-set end time to 2 hours after start time when start time changes
      if (field === 'startTime' && value && !prev.endTime) {
        const startDate = new Date(value)
        startDate.setHours(startDate.getHours() + 2)
        newData.endTime = startDate.toISOString().slice(0, 16)
      }

      return newData;
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic form validation
    if (!formData.name.trim()) {
      toast.error('Event name is required', {
        description: 'Please enter a name for your event.',
      })
      return
    }

    if (!formData.location.trim()) {
      toast.error('Location is required', {
        description: 'Please enter a location for your event.',
      })
      return
    }

    if (!formData.startTime || !formData.endTime) {
      toast.error('Date and time are required', {
        description: 'Please select both start and end times for your event.',
      })
      return;
    }

    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      toast.error('Invalid time range', {
        description: 'End time must be after start time.',
      })
      return;
    }

    if (!formData.maxCapacity || parseInt(formData.maxCapacity) <= 0) {
      toast.error('Invalid capacity', {
        description: 'Please enter a valid maximum capacity (greater than 0).',
      })
      return
    }

    setIsSubmitting(true);

    try {

      const response = await createEvent(formData);

      if (response.ok) {
        const event = await response.json();
        // Reset form
        setFormData({
          name: "",
          location: "",
          startTime: getCurrentDateTime(),
          endTime: "",
          maxCapacity: "",
          description: ""
        })

        toast.success('Event created successfully!', {
          description: `"${event.name}" has been created and is ready for attendees.`,
          duration: 4000,
        });
        // Redirect to event details page after a short delay
        setTimeout(() => {
          router.push(`/events`);
        }, 2000);

      } else {
        const error = await response.json()
        console.error('Error creating event:', error);
        toast.error('Failed to create event', {
          description: error.detail || 'Unknown error occurred. Please try again.',
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Network error', {
        description: error instanceof Error ? error.message : 'Unable to connect to server. Please check your connection.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to EventManager
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, manage, and track your events with ease. From small meetups to large conferences,
          we&apos;ve got you covered.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {/* Event Creation Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>
              Fill out the details below to create a new event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter event name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Date & Time</Label>
                  <DateTimeInput
                    id="startTime"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    required
                    className="w-1/2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Select when your event begins
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Date & Time</Label>
                  <DateTimeInput
                    id="endTime"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    required
                    className="w-1/2 px-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Select when your event ends
                  </p>
                </div>
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="maxCapacity">Maximum Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  placeholder="Enter maximum attendees"
                  value={formData.maxCapacity}
                  onChange={(e) => handleInputChange('maxCapacity', e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}