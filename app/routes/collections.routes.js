let collectionController = require("../controllers/collection.controller");

let routes = app => {
  app
    .route("/api/v1/collections")
    .get(collectionController.getAllCollections)
    .post(collectionController.insertCollection);

  app.route("/api/v1/collections/search");
  app.route("/api/v1/collections/order");

  // Delete later
  // Get all data in user_collections table
  app.route("/api/v1/collections/followers").get(collectionController.getAll);

  app
    .route("/api/v1/collections/:collectionId")
    .get(collectionController.findCollectionById)
    .put()
    .patch(collectionController.updateCollection)
    .delete(collectionController.deleteCollection);

  app
    .route("/api/v1/collections/:collectionId/articles")
    .get(collectionController.getCollectionArticles);
  app.route("/api/v1/collections/:collectionId/articles/search").get();
  app
    .route("/api/v1/collections/:collectionId/articles/order")
    .get((req, res) => {
      res.send(
        "GET /api/v1/collections/:collectionId/articles/order " + req.query.ASC
      );
    });

  app
    .route("/api/v1/collections/:collectionId/followers")
    .get(collectionController.getFollowers);

  app
    .route("/api/v1/collections/:collectionId/followers/:followerId")
    .post(collectionController.insertFollower)
    .delete(collectionController.deleteFollower);
};

module.exports = routes;
