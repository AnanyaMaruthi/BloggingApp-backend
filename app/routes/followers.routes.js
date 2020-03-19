let followerController = require("../controllers/follower.controller");

let routes = app => {
  app.route("/api/v1/followers").get(followerController.getAllFollowers); // To be removed

  //User id to be sent in the request body
  app
    .route("/api/v1/followers/:followerId")
    .post(followerController.insertFollower)
    .delete(followerController.deleteFollower);
};

module.exports = routes;
