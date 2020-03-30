let conn = require("./connection");

let CollectionAuthor = function(collectionAuthor) {
  this.collection_id = collectionAuthor.collection_id;
  this.author_id = collectionAuthor.author_id;
};

// Insert author
CollectionAuthor.insertAuthor = function(newCollectionAuthor, result) {
  conn.query(
    `INSERT INTO collection_authors SET ? `,
    newCollectionAuthor,
    (err, res) => {
      if (err) {
        console.log("Error inserting author: ", err);
        let error = err;
        if (err.code == "ER_NO_REFERENCED_ROW_2") {
          error = {
            error: "Foreign key constraint fails"
          };
        }
        result(error, null);
      } else {
        let responseMessage = {
          message: "Successfully inserted author"
        };
        console.log("Successfully inserted author");
        result(null, responseMessage);
      }
    }
  );
};

// Delete author
CollectionAuthor.deleteAuthor = function(collection_id, author_id, result) {
  conn.query(
    `
    DELETE FROM collection_authors 
    WHERE author_id = ${author_id} AND collection_id = '${collection_id}'
    `,
    (err, res) => {
      if (err) {
        console.log("Error deleting author: ", err);
        result(err, null);
      } else {
        console.log("Successfully deleted author");
        let responseMessage = {
          message: "Successfully deleted author"
        };
        result(null, responseMessage);
      }
    }
  );
};

module.exports = CollectionAuthor;
