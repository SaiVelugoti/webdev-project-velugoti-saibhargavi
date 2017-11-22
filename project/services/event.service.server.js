module.exports = function (app) {

  // app.get("/api/events/location/:location", getEventsByLocation);
  app.get("/api/user/:userId/dashboard/intrstEvents", findInterestedEvents);
  app.post("/api/user/:userId/eventAdd", addEventToUser);
  app.delete("/api/user/:userId/removeEvent/:eveId", removeFromWishlist);

  var eventModel = require("../model/event/event.model.server");
  var websiteModel = require("../model/website/website.model.server");

  // function getEventsByLocation(req, res) {
  //   const location = req.params['location'];
  //   let apiKey = 'MkD6G4ptdWk8dbPr';
  //   // if (process.env.API_KEY_EVENTFUL) {
  //   //   apiKey = process.env.API_KEY_EVENTFUL;
  //   // }
  //   const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  //   const apiURL = 'http://api.eventful.com/json/events/search/?location=' + location + '&app_key=' + apiKey;
  //   const url = proxyURL + apiURL;
  //
  //   Http.get(url).then(function (retrievedevents) {
  //     res.json(retrievedevents);
  //   });
  // }

  function addEventToUser(req, res) {
    var event1 = req.body;
    var userId = req.params['userId'];
    console.log("EVENT1-> event serverJS" + event1);
    // event1.regUserId = userId;
    return eventModel.addEventToWishList(userId, event1)
      .then(function (event) {
        res.json(event);
      }, function (err) {
        console.log(err);

      });
    // return;
  }

  function addToFollowList(req, res) {
    var followingId = req.params["followingId"];
    var userId = req.params["userId"];
    return userModel.addToFollow(userId, followingId)
      .then(function (user) {
        res.json(user);
      });
  }

  function removeFromWishlist(req, res) {
    var userId = req.params["userId"];
    var eveId = req.params["eveId"];
     eventModel.removeFromWishList(userId, eveId)
       .then (function (events) {
        res.json(events);
    });
     return;
  }

  // function deleteWebsite(req, res) {
  //   var websiteId = req.params['websiteId'];
  //   websiteModel.deleteWebsite(websiteId)
  //     .then(function (websites) {
  //       res.json(websites);
  //     });
  //   return;
  // }
  //
  // function createWebsite(req, res) {
  //   var website = req.body;
  //   website.developerId = req.params['userId'];
  //   var userId = req.params['userId'];
  //   websiteModel.createWebsiteForUser(userId, website)
  //     .then(function (website) {
  //       websiteModel.findAllWebsitesForUser(userId)
  //         .then(function (websites) {
  //           res.json(websites);
  //         });
  //     }, function (err) {
  //       console.log(err);
  //     });
  //   return;
    // websites.push(website);
    // res.json(website);
  // }

  function findInterestedEvents(req, res) {
    const userId = req.params['userId'];
    eventModel.findEventsForUser(userId)
      .then(function (interestedEvents) {
        res.json(interestedEvents);
      });
    // return;
  }
}



