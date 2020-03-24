let collectionController = require("../controllers/collection.controller");
let auth = require("../middleware/auth");

let routes = app => {
  app
    .route("/api/v1/collections")
    .get(auth, collectionController.getAllCollections)
    .post(auth, collectionController.insertCollection);

  // Delete later
  // Get all data in user_collections table
  app.route("/api/v1/collections/followers").get(collectionController.getAll);

  app
    .route("/api/v1/collections/:collectionId")
    .get(auth, collectionController.findCollectionById)
    .patch(auth, collectionController.updateCollection)
    .delete(auth, collectionController.deleteCollection);

  app
    .route("/api/v1/collections/:collectionId/articles")
    .get(auth, collectionController.getCollectionArticles);

  app
    .route("/api/v1/collections/:collectionId/followers")
    .get(collectionController.getFollowers)
    .post(collectionController.insertFollower)
    .delete(collectionController.deleteFollower);
};

module.exports = routes;
