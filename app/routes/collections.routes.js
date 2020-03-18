let collectionController = require("../controllers/collection.controller");

let routes = app => {
  app
    .route("/api/v1/collections")
    .get(collectionController.getAllCollections)
    .post(collectionController.insertCollection);

  app.route("/api/v1/collections/search");
  app.route("/api/v1/collections/order");

  app
    .route("/api/v1/collections/:collectionId")
    .get(collectionController.findCollectionById)
    .put()
    .patch(collectionController.updateCollection)
    .delete(collectionController.deleteCollection);

  app.route("/api/v1/collections/:collectionId/posts").get();
  app.route("/api/v1/collections/:collectionId/posts/search").get();
  app.route("/api/v1/collections/:collectionId/posts/order").get((req, res) => {
    res.send(
      "GET /api/v1/collections/:collectionId/posts/order " + req.query.ASC
    );
  });

  app.route("/api/v1/collections/:collectionId/followers").get();
};

module.exports = routes;
