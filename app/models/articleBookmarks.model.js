let conn = require("./connection");

let ArticleBookmark = function(articleBookmark) {
  this.user_id = articleBookmark.user_id;
  this.article_id = articleBookmark.article_id;
};

ArticleBookmark.getAllData = function(result) {
  conn.query(`SELECT * FROM article_bookmarks`, (err, res) => {
    if (err) {
      console.log("Error fetching bookmarks: ", err);
      result(err, null);
    } else {
      console.log("Bookmarks: ", res);
      result(null, res);
    }
  });
};

ArticleBookmark.getUserBookmarks = function(my_user_id, result) {
  conn.query(
    `
    SELECT    articles.article_id,
              articles.user_id,
              articles.collection_id,
              articles.title,
              articles.date_created,
              articles.image_path,
              case
                        when ab.user_id IS NULL THEN false
                        ELSE true
              END AS is_bookmarked
    FROM      articles
    INNER JOIN
              (
                    SELECT *
                    FROM   article_bookmarks
                    WHERE  article_bookmarks.user_id = ${my_user_id}) ab 
    ON        articles.article_id = ab.article_id 
    `,
    (err, res) => {
      if (err) {
        console.log("Error fetching bookmark");
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

ArticleBookmark.addUserBookmark = function(newBookmark, result) {
  conn.query(
    `
    INSERT INTO article_bookmarks 
    SET ?
    `,
    newBookmark,
    (err, res) => {
      if (err) {
        console.log("Error inserting bookmark: ", err);
        let error = err;
        if (err.code == "ER_NO_REFERENCED_ROW_2") {
          error = {
            error: "Foreign key constraint fails"
          };
        } else if (err.code == "ER_BAD_NULL_ERROR") {
          error = {
            error: "Required fields are empty"
          };
        } else if (err.code == "ER_DUP_ENTRY") {
          error = {
            error: "Bookmark exists"
          };
        }
        result(error, null);
      } else {
        let responseMessage = {
          message: "Successfully added bookmark"
        };
        console.log("Successfully added bookmark");
        result(null, responseMessage);
      }
    }
  );
};

ArticleBookmark.deleteUserBookmark = function(my_user_id, article_id, result) {
  conn.query(
    `
    DELETE FROM article_bookmarks 
    WHERE article_id = ${article_id} AND user_id = ${my_user_id}
    `,
    (err, res) => {
      if (err) {
        console.log("Error deleting bookmark");
        result(err, null);
      } else {
        console.log("Deleted bookmark");
        let responseMessage = {
          message: "Successfully removed bookmark"
        };
        result(null, responseMessage);
      }
    }
  );
};

module.exports = ArticleBookmark;
