import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Locations.css";

const LOCATIONS = [
  "Enchanted Forest",
  "Ancient Castle",
  "Mysterious Dungeon",
  "Bustling Village",
];

export default function Locations() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title">Explore Locations</h2>
      <div className="locations-grid">
        {LOCATIONS.map((loc) => (
          <div
            key={loc}
            className="location-card"
            onClick={() => navigate(`/locations/${encodeURIComponent(loc)}`)}
          >
            <h3>{loc}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
