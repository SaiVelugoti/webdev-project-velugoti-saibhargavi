var mongoose = require("mongoose");
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("PageModel", PageSchema);
var WebsiteModel = require("../website/website.model.server");

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(websiteId, page) {
  var newPage = null;
  delete page._id;
  return PageModel.create(page)
    .then(function (page) {
      newPage = page;
      WebsiteModel.findWebsiteById(newPage.websiteId)
        .then(function (website) {
          website.pages.push(page);
          return website.save();
        });
    });
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({websiteId: websiteId});
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
  return PageModel.update({_id: pageId}, page);
}

function deletePage(pageId) {
  return PageModel.deleteOne({_id: pageId});
}
