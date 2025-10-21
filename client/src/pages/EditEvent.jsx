import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditEvent.css";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // For redirecting after successful edit

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    hostedBy: "",
    image: "",
  });

  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/events/${id}`);
        if (response.ok) {
          const event = await response.json();
          const formattedDate = event.date.split("T")[0];
          setFormData({ ...event, date: formattedDate }); // Ensure hostedBy is included
          setLoading(false);
        } else {
          setError("Failed to fetch event data");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching event data");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data being sent:", formData); // Debugging log

    try {
      const response = await fetch(`/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorMessage = await response.text();
        console.error("Failed to update event:", errorMessage);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-event">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hosted By:
          <input
            type="text"
            name="hostedBy"
            value={formData.hostedBy}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
