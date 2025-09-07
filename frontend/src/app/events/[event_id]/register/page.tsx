"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Mail, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Event, EventRegistrationFormData } from "@/app/types"
import { registerAttendee } from "@/app/actions/register-attendee"
import { getEvent } from "@/app/actions/get-event"

export default function EventRegisterPage({ params }: { params: Promise<{ event_id: string }> }) {
    const { event_id } = use(params)
    const router = useRouter()

    const [formData, setFormData] = useState<EventRegistrationFormData>({
        name: "",
        email: ""
    })

    const [loading, setLoading] = useState(false)
    const [event, setEvent] = useState<Event | null>(null);
    const [eventLoading, setEventLoading] = useState(true)

    // Fetch event details on component mount
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventData = await getEvent(event_id);
                setEvent(eventData);
            } catch {
                toast.error('Failed to load event details', {
                    description: 'Please try again later.',
                })
            } finally {
                setEventLoading(false);
            }
        }

        fetchEventDetails();
    }, [event_id])

    const handleInputChange = (field: keyof EventRegistrationFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic form validation
        if (!formData.name.trim()) {
            toast.error('Name is required', { description: 'Please enter your name.' })
            return
        }

        if (!formData.email.trim()) {
            toast.error('Email is required', { description: 'Please enter your email address.' })
            return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast.error('Invalid email format', { description: 'Please enter a valid email address.' })
            return
        }

        setLoading(true)

        try {
            const attendee = await registerAttendee(event_id, formData)

            toast.success('Registration successful!', {
                description: `Welcome ${attendee.name}! You're now registered for this event.`,
                duration: 4000,
            })

            setFormData({ name: "", email: "" })

            // Redirect to event details page after a short delay
            setTimeout(() => {
                router.push(`/events`)
            }, 2000)

        } catch (error) {
            console.error('Error registering for event:', error)
            toast.error('Registration failed', {
                description: error instanceof Error ? error.message : 'Unknown error occurred. Please try again.',
                duration: 5000,
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

    if (eventLoading) {
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

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
                    <p className="text-muted-foreground mb-4">The event you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/events">
                        <Button variant="outline">Back to Events</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="mb-6">
                <Link href={`/events`}>
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                    </Button>
                </Link>
            </div>

            <div className="max-w-2xl mx-auto">
                {/* Event Info Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Register for Event
                        </CardTitle>
                        <CardDescription>
                            Complete the form below to register for this event
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">{event.name}</h3>
                                <p className="text-muted-foreground">{event.description || 'No description available'}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{formatDate(event.start_time)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Time: {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Registration Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Registration Form
                        </CardTitle>
                        <CardDescription>
                            Please provide your details to complete the registration
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Registering..." : "Register for Event"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
