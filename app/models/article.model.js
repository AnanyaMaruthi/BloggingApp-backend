const conn = require("./connection");

const Article = function(article) {
  this.article_id = article.article_id;
  this.collection_id = article.collection_id;
  this.user_id = article.user_id;
  this.title = article.title;
  this.content = article.content;
  this.published = article.published;
  this.image_path = article.image_path;
  this.views_count = article.views_count;
  this.kudos_count = article.kudos_count;
  this.date_created = article.date_created;
  this.date_updated = article.date_updated;
};

// Insert Article
Article.insertArticle = function(newArticle, result) {
  conn.query(`INSERT INTO articles SET ?`, newArticle, (err, res) => {
    if (err) {
      console.log("Error inserting user: ", err);
      let error = err;
      if (err.code == "ER_DUP_ENTRY") {
        error = {
          error: "Article ID exists"
        };
      } else if (err.code == "ER_BAD_NULL_ERROR") {
        error = {
          error: "Required fields are empty"
        };
      } else if (err.code == "ER_NO_REFERENCED_ROW_2") {
        error = {
          error:
            "Invalid user ID or collection ID. Foreign key constraint fails"
        };
      }
      result(error, null);
    } else {
      let responseMessage = {
        message: "Successfully inserted article"
      };
      console.log("Successfully inserted article: ", newArticle.title);
      result(null, responseMessage);
    }
  });
};

// Get all articles
// Sending static data
Article.getAllArticles = function(result) {
  conn.query(
    `
      SELECT *,
      "True" as bookmarked
      FROM articles
    `,
    (err, res) => {
      if (err) {
        console.log("Error getting articles: ", err);
        result(err, null);
      } else {
        console.log("Fetched all articles");
        result(null, res);
      }
    }
  );
};

// Sending static data
// Get article by ID
Article.findArticleById = function(article_id, result) {
  conn.query(
    `
      SELECT *, 
      "True" as bookmarked
      FROM articles 
      WHERE article_id = '${article_id}' 
    `,
    (err, res) => {
      if (err) {
        console.log("Error getting article: ", err);
        result(err, null);
      } else {
        console.log("Fetched article");
        result(null, res);
      }
    }
  );
};

// Patch article
Article.patchArticle = function(article_id, article, result) {
  conn.query(
    `UPDATE articles SET collection_id='${article.collection_id}', title='${article.title}', content='${article.content}', published=${article.published}, image_path='${article.image_path}', date_updated='${article.date_updated}' WHERE article_id='${article_id}'`,
    (err, res) => {
      if (err) {
        let error = err;
        console.log("Error while updating: ", err);
        if (
          err.code == "ER_BAD_NULL_ERROR" ||
          err.code == "ER_BAD_FIELD_ERROR"
        ) {
          error = {
            error: "Required fields are empty"
          };
        }
        result(error, null);
      } else {
        console.log("Successfully updated article");
        let responseMessage = {
          message: "Successfully updated article"
        };
        result(null, responseMessage);
      }
    }
  );
};

// Update kudos
// Update views

// Delete article
Article.deleteArticle = function(article_id, result) {
  conn.query(
    `DELETE FROM articles WHERE article_id = ?`,
    [article_id],
    (err, res) => {
      if (err) {
        console.log("Error deleting article: ", err);
        result(err, null);
      } else {
        console.log("Successfully deleted article");
        let responseMessage = {
          message: "Successfully deleted article"
        };
        result(null, responseMessage);
      }
    }
  );
};

module.exports = Article;

// to do : figure out sql date format
