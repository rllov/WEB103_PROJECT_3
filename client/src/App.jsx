import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes, Link } from "react-router-dom";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import LocationEvents from "./pages/LocationEvents";
import "@picocss/pico";
const App = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3001/events");
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <Events data={events} />,
    },
    {
      path: "/locations",
      element: <Locations />,
    },
    {
      path: "/locations/:location",
      element: <LocationEvents data={events} />,
    },
    {
      path: "*",
      element: <div>Page Not Found</div>,
    },
  ]);

  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">All Events</Link> | Mystical World Event Boards |{" "}
          <Link to="/locations">Locations</Link>
        </nav>
      </header>
      {element}
    </div>
  );
};

export default App;
