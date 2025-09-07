import { EventRegistrationFormData, Attendee } from "../types";

export async function registerAttendee(eventId: string, formData: EventRegistrationFormData): Promise<Attendee> {
  try {
    const response = await fetch(`http://localhost:8000/api/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to register attendee';
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
    throw new Error('Network error: Unable to register attendee');
  }
}