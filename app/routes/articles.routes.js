let articleController = require("../controllers/article.controller");
let auth = require("../middleware/auth");
let routes = app => {
  app
    .route("/api/v1/articles")
    .get(auth, articleController.getAllArticles)
    .post(auth, articleController.insertArticle);

  app
    .route("/api/v1/articles/:articleId")
    .get(auth, articleController.findArticleById)
    .patch(auth, articleController.updateArticle)
    .delete(auth, articleController.deleteArticle);

  app
    .route("/api/v1/articles/:articleId/kudos")
    .patch(auth, articleController.updateKudos);

  app.route("/api/v1/articles/:articleId/commments").get();
};

module.exports = routes;
