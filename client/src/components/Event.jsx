import "../css/Event.css";

export default function Event({ event }) {
  return (
    <div className="event-flip-card">
      <div className="event-flip-card-inner">
        <div className="event-flip-card-front">
          {event.image && <img src={event.image} alt={event.name} />}
        </div>
        <div className="event-flip-card-back">
          <h3>{event.name}</h3>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>{event.description}</p>
          <p>
            <em>Hosted by: {event.hostedby}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
