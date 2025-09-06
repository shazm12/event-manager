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
            throw new Error('Failed to create event');
        }
        
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error: Unable to create event');
    }
}