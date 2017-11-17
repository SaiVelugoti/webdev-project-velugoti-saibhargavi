module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websiteModel = require("../model/website/website.model.server");

  function createWebsite(req, res) {
    var website = req.body;
    website.developerId = req.params['userId'];
    var userId = req.params['userId'];
    websiteModel.createWebsiteForUser(userId, website)
      .then(function (website) {
        websiteModel.findAllWebsitesForUser(userId)
          .then(function (websites) {
            res.json(websites);
          });
      }, function (err) {
        console.log(err);
      });
    return;
    // websites.push(website);
    // res.json(website);
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    // var websitesByUserId = [];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function (websitesByUserId) {
        res.json(websitesByUserId);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId)
      .then(function (websitesById) {
        res.json(websitesById);
      });
  }

  function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];
    websiteModel.updateWebsite(websiteId, website)
      .then(function (websites) {
        res.json(websites);
      });
    return;
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId)
      .then(function (websites) {
        res.json(websites);
      });
    return;
  }
}
