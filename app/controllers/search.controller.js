let userModel = require("../models/user.model");
let collectionModel = require("../models/collection.model");
let articleModel = require("../models/article.model");

exports.searchAll = (req, res) => {
  if (!req.query.q) {
    res.json([]);
  } else {
    let searchString = req.query.q;
    let collectionSearch = new Promise((resolve, reject) => {
      collectionModel.searchAllCollections(searchString, (err, collections) => {
        if (err) {
          reject(err);
        } else {
          resolve(collections);
        }
      });
    });

    let articleSearch = new Promise((resolve, reject) => {
      articleModel.searchAllArticles(searchString, (err, articles) => {
        if (err) {
          reject(err);
        } else {
          resolve(articles);
        }
      });
    });

    let userSearch = new Promise((resolve, reject) => {
      userModel.searchAllUsers(searchString, (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });

    Promise.all([collectionSearch, articleSearch, userSearch])
      .then(results => {
        res.json({
          collections: results[0],
          articles: results[1],
          users: results[2]
        });
      })
      .catch(err => {
        res.send(err);
      });
  }
};
