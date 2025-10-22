import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes, Link } from "react-router-dom";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import LocationEvents from "./pages/LocationEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Customize from "./pages/Customize";
import CustomCarList from "./pages/CustomCarList";
import CustomCarEdit from "./pages/CustomCarEdit";
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
    // {
    //   path: "/",
    //   element: <Events data={events} />,
    // },
    {
      path: "/locations",
      element: <Locations />,
    },
    {
      path: "/customize",
      element: <Customize />,
    },
    {
      path: "/customcars",
      element: <CustomCarList />,
    },
    {
      path: "/customcars/edit/:id",
      element: <CustomCarEdit />,
    },
    {
      path: "/locations/:location",
      element: <LocationEvents data={events} />,
    },
    {
      path: "*",
      element: <div>Page Not Found</div>,
    },
    {
      path: "/new",
      element: <CreateEvent />,
    },
    {
      path: "/edit/:id",
      element: <EditEvent data={events} />,
    },
  ]);

  return (
    <div className="App">
      <header>
        {/* <nav>
          <Link to="/">All Events</Link> | Mystical World Event Boards |{" "}
          <Link to="/locations">Locations</Link>
        </nav>
        <Link to="/new">
          <button className="addBtn">+ Add Event</button>
        </Link> */}
        <Link to="/customize">
          <button className="addBtn">Customize Car</button>
        </Link>
        <Link to="/customcars">
          <button className="addBtn">My Custom Cars</button>
        </Link>
      </header>
      {element}
    </div>
  );
};

export default App;
