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

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="container">
      <h2 className="title">All Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
