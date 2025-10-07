import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvents } from "../services/LocationsAPI";
import Event from "../components/Event";
import "../css/LocationEvents.css";

export default function LocationEvents() {
  const { location } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data.filter((e) => e.location === location)))
      .catch(() => alert("Failed to fetch events"))
      .finally(() => setLoading(false));
  }, [location]);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="container">
      <h2 className="title">Events in {location}</h2>
      <div className="events-list">
        {events.length === 0 ? (
          <p>No events found for this location.</p>
        ) : (
          events.map((event) => <Event key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}
