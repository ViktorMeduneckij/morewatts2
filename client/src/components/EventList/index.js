import React from "react";
import PropTypes from "prop-types";

import Event from "../Event/index";

const EventList = ({ children }) => {
  return (
    <div className="EventList">
      {children.map((item, index) => (
        <Event key={index}>{item}</Event>
      ))}
    </div>
  );
};

EventList.propTypes = {
  children: PropTypes.array
};

export default EventList;
