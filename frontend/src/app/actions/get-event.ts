export async function getEvent(event_id: string) {
    try {
        const response = await fetch(`http://localhost:8000/api/events/${event_id}/`);
        
        if (!response.ok) {
            let errorMessage = 'Event not found';
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error: Unable to fetch event');
    }
}