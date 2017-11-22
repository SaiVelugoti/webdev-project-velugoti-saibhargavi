var mongoose = require("mongoose");
var EventSchema = require("./event.schema.server");
var EventModel = mongoose.model("EventModel", EventSchema);
var UserModel = require("../user/user.model.server");

// EventModel.addEvent = addEvent;
EventModel.deleteEvent = deleteEvent;
EventModel.findEventsForUser = findEventsForUser;
EventModel.addEventToWishList = addEventToWishList;
EventModel.removeFromWishList = removeFromWishList;

module.exports = EventModel;
//
// function  addEventToWishList(userId, event) {
//   "use strict";
//   var eventNew = null;
//   return EventModel
//     .create(event)
//     .then()
//
// }

function removeFromWishList(userId, eveId) {
  return EventModel.deleteOne({_id: eveId});
}

function  addEventToWishList(userId, event) {
  var newEvent = null;
  delete event._id;
  return EventModel
    .create(event)
    .then(function (event){
      newEvent = event;
      UserModel.findUserById(newEvent.regUserId)
        .then(function (user) {
          user.eventsSaved.push(newEvent);
          console.log("IN Event Model Server::::")
          console.log(user.save());
          return user.save();
        }, function (err) {
          console.log(err);

        });
    });
}
// function createWebsiteForUser(userId, website) {
//   var newWebsite = null;
//   delete website._id;
//   return WebsiteModel
//     .create(website)
//     .then(function (website){
//       newWebsite = website;
//       UserModel.findUserById(newWebsite.developerId)
//         .then(function (user) {
//           user.websites.push(newWebsite);
//           return user.save();
//         });
//     });
// }

function findEventsForUser(userId) {
  return EventModel.find({regUserId: userId});
}

function deleteEvent(eventId){
  // "use strict";
  return EventModel.deleteOne({_id: eventId});
}
