import { EventFormData } from "../types";


export async function createEvent(formData: EventFormData) {
    try {
        const response = await fetch('http://localhost:8000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                location: formData.location,
                start_time: formData.startTime,
                end_time: formData.endTime,
                max_capacity: parseInt(formData.maxCapacity),
            }),
        });
        if (!response.ok) {
            let errorMessage = 'Failed to create event';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return await response.json();
        }
        return { success: true, message: 'Event created successfully' };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error: Unable to create event');
    }
}