import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";

const createEventsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            location VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            hostedBy VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        )
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, date, location, description, hostedBy, image) VALUES ($1, $2, $3, $4, $5, $6)",
    };
    const values = [
      event.name,
      event.date,
      event.location,
      event.description,
      event.hostedBy,
      event.image,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }

      console.log(`✅ ${event.name} added successfully`);
    });
  });
};

seedEventsTable();
