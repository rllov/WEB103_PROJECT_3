import { pool } from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";
import customCarsData from "../data/customcars.js";

const createEventsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            location VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            hosted_by VARCHAR(255) NOT NULL,
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

const createCustomCarsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS customcars;

        CREATE TABLE IF NOT EXISTS customcars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            color VARCHAR(100) NOT NULL,
            wheels VARCHAR(100) NOT NULL,
            engine VARCHAR(100) NOT NULL,
            extras TEXT,
            price NUMERIC(10,2) NOT NULL
        )
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 CustomCars table created successfully");
  } catch (err) {
    console.error("⚠️ error creating customcars table", err);
  }
};

const seedCustomCarsTable = async () => {
  await createCustomCarsTable();

  customCarsData.forEach((car) => {
    const insertQuery = {
      text: "INSERT INTO customcars (name, color, wheels, engine, extras, price) VALUES ($1, $2, $3, $4, $5, $6)",
    };
    const values = [
      car.name,
      car.color,
      car.wheels,
      car.engine,
      JSON.stringify(car.extras || []),
      car.price,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting customcar", err);
        return;
      }
      console.log(`✅ ${car.name} added successfully`);
    });
  });
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (name, date, location, description, hosted_by, image) VALUES ($1, $2, $3, $4, $5, $6)",
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
seedCustomCarsTable();
