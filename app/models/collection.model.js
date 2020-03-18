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
      let error = err;
      if (err.code == "ER_DUP_ENTRY") {
        error = {
          error: "Collection ID exists"
        };
      } else if (err.code == "ER_BAD_NULL_ERROR") {
        error = {
          error: "Required fields are empty"
        };
      }
      result(error, null);
    } else {
      let responseMessage = {
        message: "Successfully inserted usDcollectioner"
      };
      console.log("Successfully inserted collection: ", newUser.email);
      result(null, responseMessage);
    }
  });
};

// Get all collections
Collection.getAllCollections = function(result) {
  // Get authors also
  conn.query(`SELECT * FROM collections`, (err, res) => {
    if (err) {
      console.log("Error getting collections: ", err);
      result(err, null);
    } else {
      console.log("Fetched all collections");
      result(null, res);
    }
  });
};

// Get Collection by ID
Collection.findCollectionById = function(collection_id, result) {
  // Get authors also
  conn.query(
    `SELECT * FROM collections WHERE collection_id = '${collection_id}'`,
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

module.exports = Collection;
