let Follower = require("../models/follower.model");

// Get all data in followers table
exports.getAllFollowers = (req, res) => {
  Follower.getAllFollowers((err, followers) => {
    if (err) res.json(err);
    else res.json(followers);
  });
};

exports.insertFollower = (req, res) => {
  let data = {
    follower_id: req.userId,
    user_id: req.params.userId
  };
  let newFollower = new Follower(data);
  Follower.insertFollower(newFollower, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.deleteFollower = (req, res) => {
  Follower.deleteFollower(req.userId, req.params.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
