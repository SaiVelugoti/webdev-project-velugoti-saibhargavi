module.exports = function (app) {

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pageModel = require("../model/page/page.model.server");

  function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params['websiteId'];
    var websiteId = req.params['websiteId'];
    pageModel.createPage(websiteId, page)
      .then(function (page) {
        pageModel.findAllPagesForWebsite(websiteId)
          .then(function (retrievedPages) {
            res.json(retrievedPages);
          });
      });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function (pagesByThisWebsiteId) {
        res.json(pagesByThisWebsiteId);
      });
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
      .then(function (page) {
        if (page) {
          res.json(page);
        } else {
          res.json(null);
        }
      });
  }

  function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    pageModel.updatePage(pageId, page)
      .then(function (pages) {
        res.json(pages);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
      .then(function (pages) {
        res.json(pages);
      });
  }
}
