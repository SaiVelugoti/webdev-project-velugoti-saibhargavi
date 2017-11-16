module.exports = function (app) {

  // var multer = require('multer');
  // var upload = multer({ dest: __dirname +'/../../src/assets/uploads'});

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  // app.post("/api/upload", upload.single('myFile'), uploadImage);

  var widgetModel = require("../model/widget/widget.model.server")

  function createWidget(req, res) {
    var widget = req.body;
    widget.pageId = req.params['pageId'];
    var pageId = req.params['pageId'];
    widgetModel.createWidget(pageId, widget)
      .then(function (widget) {
        widgetModel.findAllWidgetsForPage(pageId)
          .then(function (widgets) {
            res.json(widgets);
          });
      });
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    var widgetsByPageId = [];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgetsByPageId) {
        res.json(widgetsByPageId);
      })
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget;
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        if (widget) {
          res.json(widget);
        } else {
          res.json(null);
        }
      });
    return;
  }

  function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    widgetModel.updateWidget(widgetId, widget)
      .then(function (widgets) {
        res.json(widgets);
      })
    return;
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel.deleteWidget(widgetId)
      .then(function (widgets) {
        res.json(widgets);
      })
  }

  // function uploadImage(req, res) {
  //   var widgetId = req.body.widgetId;
  //   var width = req.body.width;
  //   var myFile = req.file;
  //
  //   var userId = req.body.userId;
  //   var websiteId = req.body.websiteId;
  //   var pageId = req.body.pageId;
  //
  //   var originalname = myFile.originalname;
  //   var filename = myFile.filename;
  //   var path = myFile.path;
  //   var destination = myFile.destination;
  //   var size = myFile.size;
  //   var mimetype = myFile.mimetype;
  //
  //   var widget = getWidgetById(widgetId);
  //   console.log('hey its me' + filename);
  //
  //   widget.url = 'assets/uploads/' + filename;
  //   widget.width = width;
  //
  //
  //     for (let x = 0; x < this.widgets.length; x++) {
  //       if (this.widgets[x]._id === widgetId) {
  //         this.widgets[x] = widget;
  //       }
  //   }
  //
  //   var callbackUrl = '/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';
  //   res.redirect(callbackUrl);
  // }
  function getWidgetById(widgetId) {
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        return widgets[x];
      }
    }
  }

}
