let routes = app => {
  app
    .route("/api/v1/posts")
    .get((req, res) => {
      // to be removed
      res.send("GET: /api/v1/posts");
    })
    .post();

  app.route("/api/v1/posts/search").get();
  app.route("/api/v1/posts/order").get();

  app
    .route("/api/v1/posts/:postId")
    .get()
    .post()
    .put()
    .patch()
    .delete();

  app.route("/api/v1/posts/:postId/commments").get();
};

module.exports = routes;
