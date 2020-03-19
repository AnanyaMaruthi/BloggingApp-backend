let Follower = require("../models/follower.model");

// Get all data in followers table
exports.getAllFollowers = (req, res) => {
  Follower.getAllFollowers((err, followers) => {
    if (err) res.json(err);
    else res.json(followers);
  });
};

exports.insertFollower = (req, res) => {
  if (!req.body.user_id) {
    res.status(400).json({ error: "User ID not specified" });
  } else {
    let data = {
      follower_id: req.params.followerId,
      user_id: req.body.user_id
    };
    let newFollower = new Follower(data);
    Follower.insertFollower(newFollower, (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    });
  }
};

exports.deleteFollower = (req, res) => {
  if (!req.body.user_id) {
    res.status(400).json({ error: "User ID not specified" });
  } else {
    Follower.deleteFollower(
      req.params.followerId,
      req.body.user_id,
      (err, msg) => {
        if (err) res.json(err);
        else res.json(msg);
      }
    );
  }
};
