let conn = require("./connection");

let CollectionFollower = function(collectionFollower) {
  this.user_id = collectionFollower.user_id;
  this.collection_id = collectionFollower.collection_id;
};

// Get all data in collection followers table
CollectionFollower.getAll = function(result) {
  conn.query(`SELECT * FROM collection_followers`, (err, res) => {
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
// Just send count
CollectionFollower.getFollowers = function(collection_id, result) {
  conn.query(
    `SELECT * FROM collection_followers WHERE collection_id = ${collection_id}`,
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
    `INSERT INTO collection_followers SET ? `,
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
    `DELETE FROM collection_followers WHERE user_id = ${user_id} AND collection_id = ${collection_id}`,
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

// sending static data
// get following collections
// to be shown in profile page
CollectionFollower.getCollections = function(user_id, result) {
  conn.query(
    `
    SELECT 
      collections.collection_id, collections.collection_name, collections.image_url,
      "False" as is_owner,
      "False" as is_author,
      "True" as is_following
    FROM collections, collection_followers 
    WHERE 
    collections.collection_id = collection_followers.collection_id
    AND
    collection_followers.user_id = ${user_id}`,
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
// sending static data
// yo be shown in home page
CollectionFollower.getArticles = function(user_id, result) {
  conn.query(
    `SELECT 
        articles.article_id, articles.collection_id, articles.user_id, 
        articles.title, articles.published, articles.image_path, articles.views_count, 
        articles.kudos_count, articles.date_created, articles.date_updated,
        "True" as is_bookmarked
    FROM articles
      INNER JOIN collection_followers
        ON articles.collection_id = collection_followers.collection_id
    WHERE collection_followers.user_id = ${user_id}`,
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
