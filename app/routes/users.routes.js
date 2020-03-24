let auth = require("../middleware/auth");
let userController = require("../controllers/user.controller");

let routes = app => {
  app.route("/api/v1/users").get(auth, userController.getAllUsers);
  // .post(userController.insertUser); SIgnup

  app
    .route("/api/v1/user")
    .get(auth, userController.getUserProfile)
    .patch(auth, userController.updateUser)
    .delete(auth, userController.deleteUser);

  // Get other users
  app.route("/api/v1/users/:userId").get(auth, userController.findUserById);

  app
    .route("/api/v1/user/collections")
    .get(auth, userController.getUserOwnedCollections);

  // Author collections ?

  app
    .route("/api/v1/user/articles")
    .get(auth, userController.getUserAuthoredArticles);

  //   Followers and following
  app
    .route("/api/v1/user/followers")
    .get(auth, userController.getUserFollowers);

  app.route("/api/v1/userfollowing").get(auth, userController.getUserFollowing);

  // Article Bookmarks
  // All bookmarks. Delete later
  app.route("/api/v1/bookmarks").get(userController.geAllBookmarkedArticles);

  app
    .route("/api/v1/user/bookmarks")
    .get(auth, userController.getBookmarkedArticles);

  app
    .route("/api/v1/user/bookmarks/:articleId")
    .post(auth, userController.addUserBookmark)
    .delete(auth, userController.removeUserBookmark);

  // Following collections
  app
    .route("/api/v1/user/following/collections")
    .get(auth, userController.getFollowingCollections);

  app
    .route("/api/v1/user/following/collections/articles")
    .get(auth, userController.getFollowingCollectionArticles);
};

module.exports = routes;
