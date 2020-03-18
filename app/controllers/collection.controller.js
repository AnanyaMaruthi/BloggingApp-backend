let Collection = require("../models/collection.model");

exports.getAllCollections = (req, res) => {
  Collection.getAllCollections((err, collections) => {
    if (err) res.json(err);
    else res.json(collections);
  });
};

exports.findCollectionById = (req, res) => {
  Collection.findCollectionById(req.params.collectionId, (err, collection) => {
    if (err) res.json(err);
    else res.json(collection);
  });
};

exports.insertCollection = (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Request body empty" });
  }
  let newCollection = new Collection(req.body);
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
    req.params.collectionId,
    collection,
    (err, msg) => {
      if (err) res.json(err);
      else res.json(msg);
    }
  );
};

exports.deleteCollection = (req, res) => {
  Collection.deleteCollection(req.params.collectionId, (err, msg) => {
    if (err) res.json(err);
    else res.json(msg);
  });
};
