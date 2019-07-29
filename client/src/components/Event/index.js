import React from "react";
import PropTypes from "prop-types";

const Event = ({ children }) => {
  return (
    <div className={`Event ${children.type}`}>
      <div className="Event__left">
        <div className="Event__type">
          <span className={`Event__type--icon ${children.type}`} />
          <p>{children.type}</p>
        </div>
      </div>
      <div className="Event__right">
        <div className="Event__title">
          <p>{children.title}</p>
        </div>
        <div className="Event__time">
          <div className="Event__time--start">
            {new Date(children.start).toLocaleString("en-GB")}
          </div>
          <div className="Event__time--end">
            {new Date(children.end).toLocaleString("en-GB")}
          </div>
        </div>
        <div className="Event__distance">{children.distance} km</div>
      </div>
    </div>
  );
};

Event.propTypes = {
  children: PropTypes.array
};

export default Event;
