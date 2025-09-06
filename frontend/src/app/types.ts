export interface EventFormData {
    name: string
    location: string
    startTime: string
    endTime: string
    maxCapacity: string
    description: string
}

export interface Attendee {
    id: number
    name: string
    email: string
    event_id: number
    created_at: string
    updated_at: string
}

export interface Event {
    id: number
    name: string
    location: string
    start_time: string
    end_time: string
    max_capacity: number
    attendees: Attendee[]
    description: string
    createdAt: string
    updatedAt: string
}

export interface PaginatedEventsResponse {
    events: Event[];
    pagination: {
        total: number;
        skip: number;
        limit: number;
        has_next: boolean;
        has_prev: boolean;
    };
}

export interface PaginatedAttendeesResponse {
    attendees: Attendee[];
    pagination: {
        total: number;
        skip: number;
        limit: number;
        has_next: boolean;
        has_prev: boolean;
    };
}

export interface EventRegistrationFormData {
    name: string;
    email: string;
}