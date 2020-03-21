let conn = require("./connection");

let SearchCollection = function(search_string,user_id) {
    this.search_string = search_string;
    this.user_id=user_id;
};

// Search in All Collections
SearchCollection.searchAllCollections = function(result) {
    conn.query(
        `SELECT collection_name FROM collections WHERE MATCH(collection_name,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE)`,
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

// Search in My collections
SearchCollection.searchUserCollections = function(result) {
    conn.query(
        `SELECT collection_name FROM collections WHERE MATCH(collection_name,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE) AND user_id='${user_id}'`,
        (err, res) => {
            if (err) {
              console.log("Error getting collections ", err);
              result(err, null);
            } else {
              console.log("Fetched all collections");
              result(null, res);
            }
        }
    );    
};


module.exports = SearchCollection;