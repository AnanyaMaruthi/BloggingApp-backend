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
Collection.getAllCollections = function(my_user_id, result) {
  conn.query(
    `
    SELECT
              collections.collection_id,
              collections.user_id,
              CASE
                        WHEN ca.author_id IS NULL THEN false
                        ELSE true
              END AS is_author,
              CASE
                        WHEN collections.user_id = ${my_user_id} THEN true
                        ELSE false 
              END AS is_owner, 
              CASE 
                        WHEN followers.user_id IS NULL THEN false
                        ELSE true 
              END AS is_following 
    FROM      collections 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_authors 
                    WHERE  collection_authors.author_id = ${my_user_id}) ca 
    ON        collections.collection_id = ca.collection_id 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_followers 
                    WHERE  collection_followers.user_id = ${my_user_id}) followers 
    ON        collections.collection_id = followers.collection_id 
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
Collection.searchAllCollections = function(my_user_id, searchString, result) {
  conn.query(
    `
    SELECT
              collections.collection_id,
              collections.user_id,
              CASE
                        WHEN ca.author_id IS NULL THEN false
                        ELSE true
              END AS is_author,
              CASE
                        WHEN collections.user_id = ${my_user_id} THEN true
                        ELSE false 
              END AS is_owner, 
              CASE 
                        WHEN followers.user_id IS NULL THEN false
                        ELSE true 
              END AS is_following 
    FROM      collections 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_authors 
                    WHERE  collection_authors.author_id = ${my_user_id}) ca 
    ON        collections.collection_id = ca.collection_id 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_followers 
                    WHERE  collection_followers.user_id = ${my_user_id}) followers 
    ON        collections.collection_id = followers.collection_id 
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
Collection.findCollectionById = function(my_user_id, collection_id, result) {
  // Get authors also
  conn.query(
    `
    SELECT    *,
              collections.collection_id,
              collections.user_id,
              CASE
                        WHEN ca.author_id IS NULL THEN false
                        ELSE true
              END AS is_author,
              CASE
                        WHEN collections.user_id = ${my_user_id} THEN true
                        ELSE false 
              END AS is_owner, 
              CASE 
                        WHEN followers.user_id IS NULL THEN false
                        ELSE true 
              END AS is_following 
    FROM      collections 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_authors 
                    WHERE  collection_authors.author_id = ${my_user_id}) ca 
    ON        collections.collection_id = ca.collection_id 
    LEFT JOIN 
              ( 
                    SELECT * 
                    FROM   collection_followers 
                    WHERE  collection_followers.user_id = ${user_id}) followers 
    ON        collections.collection_id = followers.collection_id 
    WHERE collections.collection_id = '${collection_id}'
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
Collection.patchCollection = function(
  my_user_id,
  collection_id,
  collection,
  result
) {
  conn.query(
    `
    UPDATE collections
    SET    description = '${collection.description}', 
           image_url = '${collection.image_url}' 
    WHERE  collection_id = '${collection_id}' 
    AND    user_id = ${my_user_id}
    `,
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
Collection.deleteCollection = function(my_user_id, collection_id, result) {
  conn.query(
    `
    DELETE
    FROM   collections
    WHERE  collection_id = '${collection_id}' AND user_id = ${my_user_id}
    `,
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
Collection.getArticles = function(my_user_id, collection_id, result) {
  conn.query(
    `
    SELECT    articles.article_id,
              articles.user_id,
              articles.collection_id,
              articles.title,
              articles.date_created,
              articles.image_path
              case
                        when ab.user_id IS NULL THEN false
                        ELSE true
              END AS is_bookmarked
    FROM      articles
    LEFT JOIN
              (
                    SELECT *
                    FROM   article_bookmarks
                    WHERE  article_bookmarks.user_id = ${my_user_id}) ab 
    ON        articles.article_id = ab.article_id 
    WHERE     articles.collection_id = '${collection_id}'
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
