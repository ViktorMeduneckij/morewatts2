var mongoose = require("mongoose");
var Event = require("../models/event.js");
// mongoose.connect('mongodb+srv://viktor_medu:morewattsduombaze@morewattsbr-efacb.mongodb.net/bunchride?retryWrites=true', { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/bunchride", {
  useNewUrlParser: true
});

var db = mongoose.connection;

module.exports.db = db;
module.exports.event = Event;
