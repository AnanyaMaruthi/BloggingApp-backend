let Article = require("../models/article.model");

exports.getAllArticles = (req, res) => {
  if (req.query.q) {
    Article.searchAllArticles(req.userId, req.query.q, (err, articles) => {
      if (err) res.json(err);
      else res.json(articles);
    });
  } else {
    Article.getAllArticles(req.userId, (err, articles) => {
      if (err) res.json(err);
      else res.json(articles);
    });
  }
};

exports.findArticleById = (req, res) => {
  Article.findArticleById(req.userId, req.params.articleId, (err, article) => {
    if (err) res.json(err);
    else res.json(article);
  });
};

exports.insertArticle = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let newArticle = new Article(req.body);
  newArticle.user_id = req.userId;
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
  Article.patchArticle(
    req.userId,
    req.params.articleId,
    article,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};

exports.updateKudos = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  Article.updateKudos(req.params.articleId, req.body.kudos, (err, res) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.deleteArticle = (req, res) => {
  Article.deleteArticle(req.userId, req.params.articleId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
