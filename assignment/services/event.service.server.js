module.exports = function (app) {

  app.get("/api/events/location/:location", getEventsByLocation);


  function getEventsByLocation(req, res) {
    var location = req.params['location'];
    const url = 'http://api.eventful.com/json/events/search/?location=' + location + '&app_key=MkD6G4ptdWk8dbPr'

      .then(function (pagesByThisWebsiteId) {
        res.json(pagesByThisWebsiteId);
      });
  }
}



