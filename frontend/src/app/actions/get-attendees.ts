export async function getAttendees(event_id: string, skip: number= 0, limit: number= 100) { 
    try {
        const response = await fetch(`http://localhost:8000/api/events/${event_id}/attendees?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Failed to fetch attendees');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch attendees: ${error}`);
    }
};