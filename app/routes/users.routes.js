let userController = require("../controllers/user.controller");

let routes = app => {
  app
    .route("/api/v1/users")
    .get(userController.getAllUsers)
    .post(userController.insertUser);

  app.route("/api/v1/users/search").get();

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

  app.route("/api/v1/users/:userId/interested_collections").get();
  app.route("/api/v1/users/:userId/interested_collections/search").get();
  app.route("/api/v1/users/:userId/interested_collections/order").get();

  app
    .route("/api/v1/users/:userId/interested_posts")
    .get
    //   do not send post content
    ();
  app.route("/api/v1/users/:userId/interested_posts/search").get();
  app.route("/api/v1/users/:userId/interested_posts/order").get();

  //   Followers and following
  app
    .route("/api/v1/users/:userId/followers")
    .get(userController.getUserFollowers);
  app
    .route("/api/v1/users/:userId/following")
    .get(userController.getUserFollowing);

  //   Post Bookmarks
  app
    .route("/api/v1/users/:userId/bookmarks_posts")
    .get()
    .post();
  app
    .route("/api/v1/users/:userId/bookmarks_posts/:bookmarkId")
    .get() // Same as getting a post. Not necessary
    .delete();

  // Following collections
  app
    .route("api/v1/users/:userId/following_collections")
    .get()
    .post();
  app
    .route("api/v1/users/:userId/following_collections/:followId")
    // Same as getting a collection. Not necessary
    .delete();

  //   TO DO: Combine search, order and the main route
};

module.exports = routes;
