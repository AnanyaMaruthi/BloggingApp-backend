let conn = require("./connection");

let Collection = function(collection) {
  this.collection_id = collection.collection_id;
  this.collection_name = collection.collection_name;
  this.user_id = collection.user_id;
  this.image_url = collection.image_url;
  this.description = collection.description;
};

// Insert Collection
Collection.insertCollection = function(newCollection, result) {
  conn.query(`INSERT INTO collections SET ? `, newCollection, (err, res) => {
    if (err) {
      console.log("Error inserting collection: ", err);
      let error = err;
      if (err.code == "ER_DUP_ENTRY") {
        error = {
          error: "Collection ID exists"
        };
      } else if (err.code == "ER_BAD_NULL_ERROR") {
        error = {
          error: "Required fields are empty"
        };
      } else if (err.code == "ER_NO_REFERENCED_ROW_2") {
        error = {
          error: "Invalid user ID. Foreign key constraint fails"
        };
      }
      result(error, null);
    } else {
      let responseMessage = {
        message: "Successfully inserted collection"
      };
      console.log(
        "Successfully inserted collection: ",
        newCollection.collection_name
      );
      result(null, responseMessage);
    }
  });
};

// Get all collections
// Sending static data
Collection.getAllCollections = function(result) {
  // Get authors also
  conn.query(
    `
      SELECT *, 
      false as is_owner,
      false as is_author,
      true as is_following
      FROM collections
    `,
    (err, res) => {
      if (err) {
        console.log("Error getting collections: ", err);
        result(err, null);
      } else {
        console.log("Fetched all collections");
        result(null, res);
      }
    }
  );
};

// Search all collections
Collection.searchAllCollections = function(searchString, result) {
  conn.query(
    `SELECT *,
    false as is_owner,
    false as is_author,
    true as is_following 
    FROM collections
    WHERE MATCH(collection_name,tags) AGAINST ('${searchString}' IN NATURAL LANGUAGE MODE)`,
    (err, res) => {
      if (err) {
        console.log("No collections found", err);
        result(err, null);
      } else {
        console.log("Fetched all collections");
        result(null, res);
      }
    }
  );
};

// Get Collection by ID
// sending static data
Collection.findCollectionById = function(collection_id, result) {
  // Get authors also
  conn.query(
    `
      SELECT *,
      "False" as is_owner,
      "False" as is_author,
      "True" as is_following
      FROM collections 
      WHERE collection_id = '${collection_id}'
    `,
    (err, res) => {
      if (err) {
        console.log("Error getting collection: ", err);
        result(err, null);
      } else {
        console.log("Fetched collection");
        result(null, res);
      }
    }
  );
};

// Patch Collection
Collection.patchCollection = function(collection_id, collection, result) {
  conn.query(
    `UPDATE collections SET description = '${collection.description}', image_url = '${collection.image_url}' WHERE collection_id = ${collection_id}`,
    (err, res) => {
      if (err) {
        console.log("Error while updating: ", err);
        result(err, null);
      } else {
        console.log("Successfully updated collection");
        let responseMessage = {
          message: "Successfully updated collection"
        };
        result(null, responseMessage);
      }
    }
  );
};

// Delete Collection
Collection.deleteCollection = function(collection_id, result) {
  conn.query(
    `DELETE FROM collections WHERE collection_id = ?`,
    [collection_id],
    (err, res) => {
      if (err) {
        console.log("Error deleting collection: ", err);
        result(err, null);
      } else {
        console.log("Successfully deleted collection");
        let responseMessage = {
          message: "Successfully deleted collection"
        };
        result(null, responseMessage);
      }
    }
  );
};

// Get Collection Articles
// sending static data
Collection.getArticles = function(collection_id, result) {
  conn.query(
    `
      SELECT 
      article_id, collection_id, user_id, title, published,
      image_path, views_count, kudos_count, date_created, date_updated,
      "True" as is_bookmarked
      FROM articles WHERE collection_id = ${collection_id}
    `,
    (err, res) => {
      if (err) {
        console.log("Error fetching collection articles: ", err);
        result(err, null);
      } else {
        console.log("Collection articles: ");
        console.log(res);
        result(null, res);
      }
    }
  );
};

module.exports = Collection;
