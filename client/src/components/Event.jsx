import "../css/Event.css";
import more from "../../public/more.png";
import { Link } from "react-router-dom";

export default function Event({ event, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
      onDelete(event.id); // Call the delete function passed as a prop
    }
  };

  return (
    <div className="event-flip-card">
      <div className="event-flip-card-inner">
        <div className="event-flip-card-front">
          {event.image && <img src={event.image} alt={event.name} />}
        </div>
        <div className="event-flip-card-back">
          <div className="top-container">
            <Link to={"/edit/" + event.id}>
              <img src={more} />
            </Link>
            <h3>{event.name}</h3>
          </div>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>{event.description}</p>
          <p>
            <em>Hosted by: {event.hosted_by}</em>
          </p>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
