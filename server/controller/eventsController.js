import { pool } from "../config/database.js";

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err); // Add this for debugging
    res.status(500).json({ message: "Error fetching events", error: err });
  }
};

const getEventById = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM events WHERE id = $1";
    const result = await pool.query(selectQuery, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Map hosted_by to hostedBy
    const event = result.rows[0];
    const formattedEvent = {
      ...event,
      hostedBy: event.hosted_by, // Map snake case to camel case
    };
    delete formattedEvent.hosted_by; // Remove the snake case field

    res.status(200).json(formattedEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Error fetching event", error });
  }
};

const createEvent = async (req, res) => {
  // Implementation for creating an event
  const { name, date, location, description, hostedBy, image } = req.body;
  try {
    const insertQuery =
      "INSERT INTO events (name, description, date, location, hosted_by, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [name, description, date, location, hostedBy, image];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

const updateEvent = async (req, res) => {
  const { name, description, date, location, hostedBy, image } = req.body;

  try {
    const updateQuery = `
      UPDATE events
      SET name = $1, description = $2, date = $3, location = $4, hosted_by = $5, image = $6
      WHERE id = $7
      RETURNING *`;
    const values = [
      name,
      description,
      date,
      location,
      hostedBy,
      image,
      req.params.id,
    ];

    console.log("Update values:", values); // Debugging log

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating event:", error); // Log the error
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleteQuery = "DELETE FROM events WHERE id = $1 RETURNING *";
    const result = await pool.query(deleteQuery, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
