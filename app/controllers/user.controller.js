let User = require("../models/user.model");
let CollectionFollower = require("../models/collectionFollower.model");
let ArticleBookmark = require("../models/articleBookmarks.model");

exports.getAllUsers = (req, res) => {
  if (req.query.q) {
    User.searchAllUsers(req.userId, req.query.q, (err, users) => {
      if (err) res.json(err);
      else res.json(users);
    });
  } else {
    // Delete later
    User.getAllUsers(req.userId, (err, users) => {
      if (err) res.json(err);
      else res.json(users);
    });
  }
};

exports.getUserProfile = (req, res) => {
  User.getUserProfile(req.userId, (err, user) => {
    if (err) res.json(err);
    else res.json(user);
  });
};

exports.changePassword = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request body empty" });
  } else {
    User.changePassword(
      req.userId,
      req.body.oldPassword,
      req.body.newPassword,
      (err, msg) => {
        if (err) res.json(err);
        else res.json(msg);
      }
    );
  }
};

exports.findUserById = (req, res) => {
  User.findUserById(req.userId, req.params.userId, (err, user) => {
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
  let data = {
    username: req.body.username,
    about: req.body.about,
    profile_image_url: req.body.profile_image_url
  };
  // if upload successful, update image url
  if (req.image_path) {
    data.profile_image_url = req.image_path;
  }
  console.log(data);
  let user = new User(data);
  User.patchUser(req.userId, user, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.deleteUser = (req, res) => {
  User.deleteUser(req.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Returns list of users' followers
exports.getUserFollowers = (req, res) => {
  User.getFollowers(req.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Returns list of users followed by the specified user
exports.getUserFollowing = (req, res) => {
  User.getFollowing(req.userId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Get user owned collections
exports.getUserCollections = (req, res) => {
  User.getUserCollections(req.userId, (err, collections) => {
    if (err) res.json(err);
    else res.json(collections);
  });
};

// Get user authored articles
exports.getUserAuthoredArticles = (req, res) => {
  User.getUserAuthoredArticles(req.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

// Get following collections
// Union and send author collections
exports.getFollowingCollections = (req, res) => {
  CollectionFollower.getCollections(req.userId, (err, collections) => {
    if (err) res.json(err);
    else res.json(collections);
  });
};

// Get articles of following collections
exports.getFollowingCollectionArticles = (req, res) => {
  CollectionFollower.getArticles(req.userId, (err, articles) => {
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
  ArticleBookmark.getUserBookmarks(req.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};

// Add bookmark
exports.addUserBookmark = (req, res) => {
  let data = {
    user_id: req.userId,
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
    req.userId,
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

exports.getUserFeed = (req, res) => {
  User.getUserFeed(req.userId, (err, articles) => {
    if (err) res.json(err);
    else res.json(articles);
  });
};
