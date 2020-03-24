let User = require("../models/user.model");
let CollectionFollower = require("../models/collectionFollower.model");
let ArticleBookmark = require("../models/articleBookmarks.model");

exports.getAllUsers = (req, res) => {
  if (req.query.q) {
    User.searchAllUsers(req.query.q, (err, users) => {
      if (err) res.json(err);
      else res.json(users);
    });
  } else {
    User.getAllUsers((err, users) => {
      if (err) res.json(err);
      else res.json(users);
    });
  }
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

// Returns list of users' followers
exports.getUserFollowers = (req, res) => {
  User.getFollowers(req.params.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Returns list of users followed by the specified user
exports.getUserFollowing = (req, res) => {
  User.getFollowing(req.params.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Get user owned collections
exports.getUserOwnedCollections = (req, res) => {
  User.getUserOwnedCollections(req.params.userId, (err, collections) => {
    if (err) res.json(err);
    else res.json(collections);
  });
};

// Get user authored articles
exports.getUserAuthoredArticles = (req, res) => {
  User.getUserAuthoredArticles(req.params.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

// Get following collections
exports.getFollowingCollections = (req, res) => {
  CollectionFollower.getCollections(req.params.userId, (err, collections) => {
    if (err) res.json(err);
    else res.json(collections);
  });
};

// Get articles of following collections
exports.getFollowingCollectionArticles = (req, res) => {
  CollectionFollower.getArticles(req.params.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

// All data of article_bookmarks table
// Delete later
exports.geAllBookmarkedArticles = (req, res) => {
  ArticleBookmark.getAllData((err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
};

// Get user's bookmarks
exports.getBookmarkedArticles = (req, res) => {
  ArticleBookmark.getUserBookmarks(req.params.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

// Add bookmark
exports.addUserBookmark = (req, res) => {
  let data = {
    user_id: req.params.userId,
    article_id: req.params.articleId
  };
  let newBookmark = new ArticleBookmark(data);

  ArticleBookmark.addUserBookmark(newBookmark, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.removeUserBookmark = (req, res) => {
  ArticleBookmark.deleteUserBookmark(
    req.params.userId,
    req.params.articleId,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};

exports.login = (req, res) => {
  User.login(req.body.email, req.body.password, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
