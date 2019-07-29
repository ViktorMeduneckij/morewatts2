var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  allDay: { type: Boolean, required: true },
  type: { type: String, required: true },
  city: {
    type: String,
    validate: function(value) {
      return /^[a-zA-Z\s]*$/.test(value);
    }
  },
  level: { type: String, required: true },
  speed: { type: Number },
  start_location: { type: String },
  distance: { type: Number },
  subscribers: { type: Array },
  generalInfo: { type: String },
  markers: { type: Array }
});

var Event = mongoose.model("Event", eventSchema);

module.exports.eventSchema = eventSchema;
module.exports.event = Event;
