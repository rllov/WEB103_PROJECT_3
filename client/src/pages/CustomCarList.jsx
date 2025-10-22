import React, { useEffect, useState } from "react";
import "../css/CustomCarList.css";

export default function CustomCarList() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await fetch("http://localhost:3001/customcars");
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this custom car?")) return;
    const res = await fetch(`http://localhost:3001/customcars/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setCars(cars.filter((c) => c.id !== id));
    else alert("Failed to delete");
  };

  return (
    <div className="customcar-list">
      <h2>Saved Custom Cars</h2>
      {!Array.isArray(cars) ? (
        <p>Error loading cars</p>
      ) : cars.length === 0 ? (
        <p>No saved cars</p>
      ) : (
        <ul>
          {cars.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> - ${Number(c.price).toFixed(2)}
              <div>
                Color: {c.color}, Wheels: {c.wheels}, Engine: {c.engine}
              </div>
              <div>
                Extras:{" "}
                {c.extras
                  ? Array.isArray(c.extras)
                    ? c.extras.join(", ")
                    : c.extras
                  : "-"}
              </div>
              <a href={`/customcars/edit/${c.id}`}>
                <button>Edit</button>
              </a>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
