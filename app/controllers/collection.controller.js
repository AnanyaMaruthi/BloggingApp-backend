let Collection = require("../models/collection.model");
let CollectionFollower = require("../models/collectionFollower.model");

exports.getAllCollections = (req, res) => {
  if (req.query.q) {
    Collection.searchAllCollections(
      req.userId,
      req.query.q,
      (err, collections) => {
        if (err) res.json(err);
        else res.json(collections);
      }
    );
  } else {
    Collection.getAllCollections(req.userId, (err, collections) => {
      if (err) res.json(err);
      else res.json(collections);
    });
  }
};

exports.findCollectionById = (req, res) => {
  Collection.findCollectionById(
    req.userId,
    req.params.collectionId,
    (err, collection) => {
      if (err) res.json(err);
      else res.json(collection);
    }
  );
};

exports.insertCollection = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let newCollection = new Collection(req.body);
  newCollection["user_id"] = req.userId;
  Collection.insertCollection(newCollection, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

exports.updateCollection = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let collection = new Collection(req.body);
  Collection.patchCollection(
    req.userId,
    req.params.collectionId,
    collection,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};

exports.deleteCollection = (req, res) => {
  Collection.deleteCollection(
    req.userId,
    req.params.collectionId,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};

exports.getCollectionArticles = (req, res) => {
  Collection.getArticles(req.userId, req.params.collectionId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Get all collection followers data
exports.getAll = (req, res) => {
  console.log("lala");
  CollectionFollower.getAll((err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Get followers of a collection
exports.getFollowers = (req, res) => {
  CollectionFollower.getFollowers(req.params.collectionId, (err, followers) => {
    if (err) res.json(err);
    else res.json(followers);
  });
};

// Insert a collection follower
exports.insertFollower = (req, res) => {
  let data = {
    collection_id: req.params.collectionId,
    user_id: req.userId
  };
  let newCollectionFollower = new CollectionFollower(data);
  CollectionFollower.insertFollower(newCollectionFollower, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};

// Delete a collection follower
exports.deleteFollower = (req, res) => {
  CollectionFollower.deleteFollower(
    req.params.collectionId,
    req.userId,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};
