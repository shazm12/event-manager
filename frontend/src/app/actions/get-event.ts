export async function getEvent(event_id: string) {
    try {
        const response = await fetch(`http://localhost:8000/api/events/${event_id}/`);
        
        if (!response.ok) {
            throw new Error('Event not found');
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error: Unable to fetch event');
    }
};