"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Attendee, PaginatedAttendeesResponse } from "@/app/types"
import { getAttendees } from "@/app/actions/get-attendees";
import { useRouter } from "next/navigation";
interface AttendeesListProps {
  eventId: string
}

export function AttendeesList({ eventId }: AttendeesListProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [pagination, setPagination] = useState<PaginatedAttendeesResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAttendees()
  }, [eventId, currentPage])

  const fetchAttendees = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * itemsPerPage;
      const data = await getAttendees(eventId, skip, itemsPerPage);
      
      if (!data) {
        throw new Error('Failed to fetch attendees')
      }      

      setAttendees(data.attendees)
      setPagination(data.pagination)

      const pages = Math.ceil(data.pagination.total / itemsPerPage)
      setTotalPages(pages);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error('Failed to load attendees', {
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Event {eventId} - Attendees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading attendees...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Event {eventId} - Attendees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchAttendees} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const startIndex = pagination ? pagination.skip + 1 : 1;
  const endIndex = pagination ? pagination.skip + attendees.length : attendees.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Event ID: {eventId} - Attendees
        </CardTitle>
        <CardDescription>
          {pagination?.total || 0} total attendees
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attendees.length === 0 ? (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No attendees yet</p>
            <p className="text-sm text-muted-foreground">Be the first to register!</p>
            <Button className="mt-4 bg-black text-white p-5 text-lg" onClick={() => router.push(`/events/${eventId}/register`)} variant="outline" size="sm">
              Register
            </Button>
          </div>
        ) : (
          <>
            {/* Attendees List */}
            <div className="space-y-3 mb-6">
              {attendees.map((attendee, index) => (
                <div key={attendee.id || index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{attendee.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>{attendee.email}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    #{startIndex + index}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex}-{endIndex} of {pagination?.total || 0} attendees
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
