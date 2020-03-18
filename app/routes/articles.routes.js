let articleController = require("../controllers/article.controller");

let routes = app => {
  app
    .route("/api/v1/articles")
    .get(articleController.getAllArticles)
    .post(articleController.insertArticle);

  app.route("/api/v1/articles/search").get();
  app.route("/api/v1/articles/order").get();

  app
    .route("/api/v1/articles/:articleId")
    .get(articleController.findArticleById)
    .put()
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

  app.route("/api/v1/articles/:articleId/commments").get();
};

module.exports = routes;
