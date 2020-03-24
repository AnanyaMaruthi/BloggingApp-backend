let auth = require("../middleware/auth");
let userController = require("../controllers/user.controller");

let routes = app => {
  app
    .route("/api/v1/users")
    // .get(auth, userController.getAllUsers)
    // /api/v1/users?q=searchstring
    .get(userController.getAllUsers)
    .post(userController.insertUser);

  app
    .route("/api/v1/users/:userId")
    .get(userController.findUserById)
    .put()
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

  app
    .route("/api/v1/users/:userId/collections")
    .get(userController.getUserOwnedCollections);
  app.route("/api/v1/users/:userId/collections/search").get();
  app.route("/api/v1/users/:userId/collections/order").get();

  // Author collections ?

  app
    .route("/api/v1/users/:userId/articles")
    .get(userController.getUserAuthoredArticles);
  app.route("/api/v1/users/:userId/articles/search").get();
  app.route("/api/v1/users/:userId/articles/order").get();
  //   Followers and following
  app
    .route("/api/v1/users/:userId/followers")
    .get(userController.getUserFollowers);
  app
    .route("/api/v1/users/:userId/following")
    .get(userController.getUserFollowing);

  //   Article Bookmarks
  // All bookmarks. Delete later
  app.route("/api/v1/bookmarks").get(userController.geAllBookmarkedArticles);
  app
    .route("/api/v1/users/:userId/bookmarks")
    .get(userController.getBookmarkedArticles);

  app
    .route("/api/v1/users/:userId/bookmarks/:articleId")
    .post(userController.addUserBookmark)
    .delete(userController.removeUserBookmark);

  // Following collections
  app
    .route("/api/v1/users/:userId/following/collections")
    .get(userController.getFollowingCollections)
    .post(); //Implemented in collection routes

  app
    .route("/api/v1/users/:userId/following/collections/articles")
    .get(userController.getFollowingCollectionArticles);

  app
    .route("/api/v1/users/:userId/following/collections/articles/search")
    .get();
  app.route("/api/v1/users/:userId/following/collections/articles/order").get();

  //   TO DO: Combine search, order and the main route
};

module.exports = routes;
