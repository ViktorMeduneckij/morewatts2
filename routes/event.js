var eventController = require("../controllers/eventController.js");

//Handle routes.
module.exports = function(app) {
  app.get("/api/v.1.0/events", eventController.getAllEvents);
  app.post("/submit-create-event", eventController.submitEventForm);
  app.get("/api/v.1.0/event/:id", eventController.getEvent);
  app.get(
    "/api/v.1.0/event/update/:id/:name",
    eventController.checkIfSubscriberExists
  );
  app.post("/submit-edit-event/:id", eventController.submitEventEditForm);
  app.get("/api/v.1.0/event/delete/:id", eventController.deleteEvent);
  app.post("/api/v.1.0/event/wrong-response", eventController.wrongResponse);
};
