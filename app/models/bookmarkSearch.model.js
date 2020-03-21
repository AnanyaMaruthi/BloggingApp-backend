let conn = require("./connection");

let SearchBookmarks = function(search_string,user_id) {
    this.search_string = search_string;
    this.user_id=user_id;
};

//Search for bookmarked articles
SearchBookmarks.searchBookmarkedArticles = function(result) {
    conn.query(
        `SELECT title FROM articles WHERE MATCH(title,tags) AGAINST ('${search_string}' IN NATURAL LANGUAGE MODE) 
        AND article_id= 
            (SELECT article_id FROM article_bookmarks 
                WHERE  user_id='${user_id})`,
        (err, res) => {
            if (err) {
              console.log("No bookmarks found ", err);
              result(err, null);
            } else {
              console.log("Fetched all bookmarks");
              result(null, res);
            }
        }
    );    
};


module.exports = SearchBookmarks;