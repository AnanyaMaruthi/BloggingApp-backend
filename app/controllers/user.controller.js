let User = require("../models/user.model");

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) res.json(err);
    else res.json(users);
  });
};

exports.findUserById = (req, res) => {
  User.findUserById(req.params.userId, (err, user) => {
    if (err) res.json(err);
    else res.json(user);
  });
};

exports.insertUser = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let newUser = new User(req.body);
  User.insertUser(newUser, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let user = new User(req.body);
  User.patchUser(req.params.userId, user, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.deleteUser = (req, res) => {
  User.deleteUser(req.params.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
