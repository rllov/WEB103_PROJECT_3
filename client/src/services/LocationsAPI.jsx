const API_URL = "http://localhost:3001/events";

export async function fetchEvents() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}
