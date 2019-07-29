var eventModel = require("../models/event.js");
var errorHelper = require("mongoose-error-helper").errorHelper;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/bunchride";
const client = new MongoClient(uri, { useNewUrlParser: true });

//Helper function to retreive all events.
module.exports.getAllEvents = function retreiveEvents(req, res) {
  eventModel.event.find(function(err, events) {
    if (err) return console.log(err);

    res.send(events);
  });
};

//Helper function to handle event form submit.
module.exports.submitEventForm = function(req, res, next) {
  const event = new eventModel.event({
    title: req.body.title,
    start: req.body.startDate,
    end: req.body.endDate,
    allDay: false,
    type: req.body.type,
    city: req.body.city,
    level: req.body.level,
    speed: req.body.speed,
    start_location: req.body.startLocation,
    distance: req.body.distance,
    generalInfo: req.body.generalInfo,
    subscribers: [],
    markers: req.body.markers
  });

  event.save(function(err) {
    if (err) {
      console.log(err);
      res.status(422).send(err);
      return;
    } else {
      res.send(200);
    }
  });
};

module.exports.getEvent = function(req, res) {
  eventModel.event.findById(req.params.id, function(err, event) {
    if (err) return console.log(err);

    res.send(event);
  });
};

function subscribeEvent(req, res, exists) {
  var subExists = exists;
  if (!subExists) {
    eventModel.event.findByIdAndUpdate(
      req.params.id,
      { $push: { subscribers: { name: req.params.name } } },
      { safe: true, upsert: true, new: true },
      function(err, model) {
        console.log(err);
      }
    );
  } else {
    console.log("remove");
    eventModel.event.findByIdAndUpdate(
      req.params.id,
      { $pull: { subscribers: { name: req.params.name } } },
      function(err, model) {
        console.log(err);
      }
    );
  }

  res.status(200).send("Subscribe event happened");
}

module.exports.checkIfSubscriberExists = function(req, res) {
  var exists = null;
  eventModel.event
    .findById(req.params.id)
    .then(result => {
      for (var i = 0; i < result.subscribers.length; i++) {
        if (result.subscribers[i].name == req.params.name) {
          console.log("This name exists in subscribers array.");
          exists = true;
        } else {
          console.log("There is no such name in subscribers array");
          exists = false;
        }
      }
    })
    .then(() => {
      subscribeEvent(req, res, exists);
    });
};

module.exports.submitEventEditForm = function(req, res, next) {
  eventModel.event.findOne({ _id: req.params.id.trim() }, function(err, event) {
    (event.title = req.body.title),
      (event.start = req.body.startDate),
      (event.end = req.body.endDate),
      (event.type = req.body.type),
      (event.city = req.body.city),
      (event.level = req.body.level),
      (event.speed = req.body.speed),
      (event.start_location = req.body.startLocation),
      (event.distance = req.body.distance),
      (event.generalInfo = req.body.generalInfo),
      event.save(function(err, savedEvent) {
        if (err) {
          console.log(err);
          res.status(422).send(err);
          return;
        }
        res.send(200);
      });
  });
};

module.exports.deleteEvent = function(req, res) {
  eventModel.event.findByIdAndDelete(req.params.id.trim(), (error, data) => {
    if (error) {
      throw error;
    } else {
      res.send(200);
    }
  });
};

module.exports.wrongResponse = function(req, res) {
  client.connect(err => {
    const collection = client.db("bunchride").collection("response");
    // perform actions on the collection object
    try {
      collection.insertOne(req.body.response);
    } catch (e) {
      res.sendStatus(200);
    }
    client.close();
  });
};
