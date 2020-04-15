let Opinion = require("../models/opinion.model");

exports.getAllOpinions = (req, res) => {
  //console.log(req.body);
  console.log(req.params.articleid);
  Opinion.getAllOpinions(
    req.params.articleid,
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
  console.log(req.body);
  console.log(req.params.articleid)

  //Add authorization for user id, now it is coming from body
  let newOpinion = new Opinion(req.body);
  console.log(req.userId);
  newOpinion["article_id"] = req.params.articleid;
  newOpinion["user_id"] = req.userId;
  Opinion.insertOpinion(newOpinion, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.getAllReplies = (req, res) => {
  console.log(req.body.params);
  Opinion.getAllReplies(
    req.params.opinionId,
    req.params.articleid,
    (err, replies) => {
      if (err) res.json(err);
      else res.json(replies);
    }
  );
};

