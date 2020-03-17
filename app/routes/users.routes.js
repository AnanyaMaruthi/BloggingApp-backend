// import controller here

let routes = app => {
  app
    .route("/api/v1/users")
    .get((req, res) => {
      res.send("/api/v1/users");
    })
    .post();

  app.route("/api/v1/users/search").get();

  app
    .route("/api/v1/users/:userId")
    .get
    // Get profile info and personal page
    // Alternatively do every post must be associated with a collection -> no personal page
    ()
    .put()
    .patch()
    .delete();

  app.route("/api/v1/users/:userId/collections").get();
  app.route("/api/v1/users/:userId/collections/search").get();
  app.route("/api/v1/users/:userId/collections/order").get();

  // Author collections ?

  app
    .route("/api/v1/users/:userId/posts")
    .get
    //   do not send post content
    ();
  app.route("/api/v1/users/:userId/posts/search").get();
  app.route("/api/v1/users/:userId/posts/order").get();

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
  app.route("/api/v1/users/:userId/followers").get();
  app
    .route("/api/v1/users/:userId/following")
    .get()
    .post();
  app
    .route("/api/v1/users/:userId/following:followId")
    .get() // same as getting a user. Not necessary
    .delete();

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
    .get() // Same as getting a collection. Not necessary
    .delete();

  //   TO DO: Combine search, order and the main route
};

module.exports = routes;
