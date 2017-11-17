var mongoose = require("mongoose");
var EventSchema = require("./event.schema.server");
var EventModel = mongoose.model("EventModel", EventSchema);
var UserModel = require("../user/user.model.server");

EventModel.addEvent = addEvent;
EventModel.deleteEvent = deleteEvent;

module.exports = EventModel;

function  addEvent(userId, event) {
  var newEvent = null;
  return EventModel
    .create(event)
    .then(function (event){
      newEvent = event;
      UserModel.findUserById(event.regUserId)
        .then(function (user) {
          user.eventsSaved.push(event);
          return user.save();
        });
    });
}

function deleteEvent(eventId){
  "use strict";
  return EventModel.deleteOne({_id: eventId});
}
