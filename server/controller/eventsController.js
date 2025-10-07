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

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM events WHERE id = $1";
    const [rows] = await pool.query(selectQuery, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

export default {
  getAllEvents,
  getEventById,
};
