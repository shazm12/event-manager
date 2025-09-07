import {  PaginatedEventsResponse } from "../types";

export async function getEvents(skip: number = 0, limit: number = 100): Promise<PaginatedEventsResponse> {
  try {
    const response = await fetch(`http://localhost:8000/api/events/?skip=${skip}&limit=${limit}`);
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch events';
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
    throw new Error('Network error: Unable to fetch events');
  }
}   