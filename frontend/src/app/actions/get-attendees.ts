export async function getAttendees(event_id: string, skip: number = 0, limit: number = 100) { 
    try {
        const response = await fetch(`http://localhost:8000/api/events/${event_id}/attendees?skip=${skip}&limit=${limit}`);
        
        if (!response.ok) {
            let errorMessage = 'Failed to fetch attendees';
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
        throw new Error('Network error: Unable to fetch attendees');
    }
}