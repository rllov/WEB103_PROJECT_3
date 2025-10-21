import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/LocationsAPI";
import Event from "../components/Event";
import "../css/Event.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => alert("Failed to fetch events"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id)); // Remove the deleted event from state
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="container">
      <h2 className="title">All Events</h2>

      <div className="events-list">
        {events.map((event) => (
          <Event key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
