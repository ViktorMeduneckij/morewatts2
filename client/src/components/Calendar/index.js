import React, { useEffect, useState } from "react";

import EventList from "../EventList/index";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = () => {
    fetch("/api/v.1.0/events", { mode: "no-cors" })
      .then(function(response) {
        if (!response.ok) {
          console.log("Something is wrong");
          return;
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          return;
        }
        setEvents(data);
      });
  };

  return events && <EventList>{events}</EventList>;
};

export default Calendar;
