let conn = require("./connection");

let SearchArticles = function(search_string,user_id) {
    this.search_string = search_string;
    this.user_id=user_id;
};

// Search in All Articles
// for explore section
SearchArticles.searchAllArticles = function(result) {
    conn.query(
        `SELECT title FROM articles WHERE MATCH(title,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE)`,
        (err, res) => {
            if (err) {
              console.log("No articles found", err);
              result(err, null);
            } else {
              console.log("Fetched all articles");
              result(null, res);
            }
        }
    );    
};

// Search in My articles
// For profile page
SearchArticles.searchUserArticles = function(result) {
    conn.query(
        `SELECT title FROM articles WHERE MATCH(title,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE) AND user_id='${user_id}'`,
        (err, res) => {
            if (err) {
              console.log("No articles found ", err);
              result(err, null);
            } else {
              console.log("Fetched all articles");
              result(null, res);
            }
        }
    );    
};

//For Home Page
// search for articles in collections user follows
SearchArticles.searchFollowingArticles = function(result) {
    conn.query(
        `SELECT title FROM articles WHERE MATCH(title,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE) 
        AND collection_id= 
            (SELECT collection_id FROM users_collections 
                WHERE  user_id='${user_id})'`,
        (err, res) => {
            if (err) {
              console.log("No articles found ", err);
              result(err, null);
            } else {
              console.log("Fetched all articles");
              result(null, res);
            }
        }
    );    
};


module.exports = SearchArticles;
