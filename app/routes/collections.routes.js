let routes = app => {
  app
    .route("/api/v1/collections")
    .get((req, res) => {
      res.send("GET: /api/v1/collections");
    })
    .post();

  app.route("/api/v1/collections/search");
  app.route("/api/v1/collections/order");

  app
    .route("/api/v1/collections/:collectionId")
    .get((req, res) => {
      res.send("GET: /api/v1/collections/" + req.params.collectionId);
    })
    .put()
    .patch()
    .delete();

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
