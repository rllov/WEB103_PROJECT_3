import { pool } from "../config/database.js";

const getAllCustomCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customcars");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching customcars:", err);
    res.status(500).json({ message: "Error fetching customcars", error: err });
  }
};

const getCustomCarById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customcars WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "CustomCar not found" });
    const car = result.rows[0];
    // parse extras JSON if present
    try {
      car.extras = JSON.parse(car.extras);
    } catch (e) {
      /* keep as-is */
    }
    res.json(car);
  } catch (err) {
    console.error("Error fetching customcar:", err);
    res.status(500).json({ message: "Error fetching customcar", error: err });
  }
};

const createCustomCar = async (req, res) => {
  const { name, color, wheels, engine, extras, price } = req.body;
  // Basic validation for impossible combos
  if (engine === "Electric" && wheels === "Offroad") {
    return res
      .status(400)
      .json({
        message: "Electric engines are not available with Offroad wheels.",
      });
  }

  try {
    const insertQuery = `INSERT INTO customcars (name, color, wheels, engine, extras, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      name,
      color,
      wheels,
      engine,
      JSON.stringify(extras || []),
      price,
    ];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating customcar:", err);
    res.status(500).json({ message: "Error creating customcar", error: err });
  }
};

const updateCustomCar = async (req, res) => {
  const { name, color, wheels, engine, extras, price } = req.body;
  if (engine === "Electric" && wheels === "Offroad") {
    return res
      .status(400)
      .json({
        message: "Electric engines are not available with Offroad wheels.",
      });
  }
  try {
    const updateQuery = `UPDATE customcars SET name=$1, color=$2, wheels=$3, engine=$4, extras=$5, price=$6 WHERE id=$7 RETURNING *`;
    const values = [
      name,
      color,
      wheels,
      engine,
      JSON.stringify(extras || []),
      price,
      req.params.id,
    ];
    const result = await pool.query(updateQuery, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "CustomCar not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating customcar:", err);
    res.status(500).json({ message: "Error updating customcar", error: err });
  }
};

const deleteCustomCar = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM customcars WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "CustomCar not found" });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting customcar:", err);
    res.status(500).json({ message: "Error deleting customcar", error: err });
  }
};

export default {
  getAllCustomCars,
  getCustomCarById,
  createCustomCar,
  updateCustomCar,
  deleteCustomCar,
};
