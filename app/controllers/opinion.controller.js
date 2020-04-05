let Opinion = require("../models/opinion.model");

exports.getAllOpinions = (req, res) => {
    Opinion.getAllOpinions(
          req.params.articleId,
          (err, opinions) => {
            if (err) res.json(err);
            else res.json(opinions);
          }
    );
};

exports.insertOpinion = (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: "Request body empty" });
    }
    let newOpinion = new Opinion(req.body);
    newOpinion["user_id"] = req.userId;
    newOpinion["article_id"] = req.params.articleId;
    Opinion.insertOpinion(newOpinion, (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    });
};

exports.getAllReplies = (req, res) => {
    Opinion.getAllReplies(
        req.params.opinionId,
        req.params.articleId,
        (err, replies) => {
            if (err) res.json(err);
            else res.json(replies);
        }
    );
};
  
