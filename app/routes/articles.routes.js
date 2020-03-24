let articleController = require("../controllers/article.controller");

let routes = app => {
  app
    .route("/api/v1/articles")
    .get(articleController.getAllArticles)
    .post(articleController.insertArticle);

  app
    .route("/api/v1/articles/:articleId")
    .get(articleController.findArticleById)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

  app
    .route("/api/v1/articles/:articleId/kudos")
    .patch(articleController.updateKudos);

  app.route("/api/v1/articles/:articleId/commments").get();
};

module.exports = routes;
