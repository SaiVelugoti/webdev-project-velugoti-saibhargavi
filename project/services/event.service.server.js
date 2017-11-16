module.exports = function (app) {

  app.get("/api/events/location/:location", getEventsByLocation);

  function getEventsByLocation(req, res) {
    const location = req.params['location'];
    let apiKey = 'MkD6G4ptdWk8dbPr';
    // if (process.env.API_KEY_EVENTFUL) {
    //   apiKey = process.env.API_KEY_EVENTFUL;
    // }
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.eventful.com/json/events/search/?location=' + location + '&app_key=' + apiKey;
    const url = proxyURL + apiURL;

    Http.get(url).then( function (retrievedevents) {
      res.json(retrievedevents);
    });
  }
}



