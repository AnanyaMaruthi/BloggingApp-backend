let conn = require("./connection");

let CollectionFollower = function(collectionFollower) {
  this.user_id = collectionFollower.user_id;
  this.collection_id = collectionFollower.collection_id;
};

// Get all data in collection followers table
CollectionFollower.getAll = function(result) {
  conn.query(`SELECT * FROM users_collections`, (err, res) => {
    if (err) {
      console.log("Error fetching followers: ", err);
      result(err, null);
    } else {
      console.log("Fetched all followers");
      console.log(res);
      result(null, res);
    }
  });
};

// Get all followers
CollectionFollower.getFollowers = function(collection_id, result) {
  conn.query(
    `SELECT * FROM users_collections WHERE collection_id = ${collection_id}`,
    (err, res) => {
      if (err) {
        console.log("Error fetching followers: ", err);
        result(err, null);
      } else {
        console.log("Fetched all followers");
        result(null, res);
      }
    }
  );
};

// Add follower
CollectionFollower.insertFollower = function(newCollectionFollower, result) {
  conn.query(
    `INSERT INTO users_collections SET ? `,
    newCollectionFollower,
    (err, res) => {
      if (err) {
        console.log("Error inserting follower: ", err);
        let error = err;
        if (err.code == "ER_NO_REFERENCED_ROW_2") {
          error = {
            error: "Foreign key constraint fails"
          };
        }
        result(error, null);
      } else {
        let responseMessage = {
          message: "Successfully inserted follower"
        };
        console.log("Successfully inserted follower");
        console.log(res);
        result(null, responseMessage);
      }
    }
  );
};

// Delete follower
CollectionFollower.deleteFollower = function(collection_id, user_id, result) {
  conn.query(
    `DELETE FROM users_collections WHERE user_id = ${user_id} AND collection_id = ${collection_id}`,
    (err, res) => {
      if (err) {
        console.log("Error deleting follower: ", err);
        result(err, null);
      } else {
        console.log("Successfully deleted follower");
        let responseMessage = {
          message: "Successfully deleted follower"
        };
        result(null, responseMessage);
      }
    }
  );
};

CollectionFollower.getCollections = function(user_id, result) {
  conn.query(
    `SELECT collections.collection_id, collections.collection_name, collections.image_url
    FROM collections, users_collections 
    WHERE 
    collections.collection_id = users_collections.collection_id
    AND
    users_collections.user_id = ${user_id}`,
    (err, res) => {
      if (err) {
        console.log("Error fetching collections: ", err);
        result(err, null);
      } else {
        console.log("Successfully fetched collections");

        result(null, res);
      }
    }
  );
};

// Fetch articles in followed collections
CollectionFollower.getArticles = function(user_id, result) {
  conn.query(
    `SELECT 
        articles.article_id, articles.collection_id, articles.user_id, 
        articles.title, articles.published, articles.image_path, articles.views_count, 
        articles.kudos_count, articles.date_created, articles.date_updated
    FROM articles
      INNER JOIN users_collections
        ON articles.collection_id = users_collections.collection_id
    WHERE users_collections.user_id = ${user_id}`,
    (err, res) => {
      if (err) {
        console.log("Error fetching collection articles: ", err);
        result(err, null);
      } else {
        console.log("Collection articles fetched ");
        result(null, res);
      }
    }
  );
};
module.exports = CollectionFollower;
