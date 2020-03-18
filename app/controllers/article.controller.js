let Article = require("../models/article.model");

exports.getAllArticles = (req, res) => {
  Article.getAllArticles((err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

exports.findArticleById = (req, res) => {
  Article.findArticleById(req.params.articleId, (err, article) => {
    if (err) res.json(err);
    else res.json(article);
  });
};

exports.insertArticle = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let newArticle = new Article(req.body);
  Article.insertArticle(newArticle, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.updateArticle = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let article = new Article(req.body);
  Article.patchArticle(req.params.articleId, article, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.deleteArticle = (req, res) => {
  Article.deleteArticle(req.params.articleId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
