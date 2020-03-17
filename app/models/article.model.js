const conn = require("./connection");

const Article = function(article) {
  this.article_id = article_id;
  this.collection_id = collection_id;
  this.user_id = user_id;
  this.title = title;
  this.content = content;
  this.published = published;
  this.image_path = image_path;
  this.views_count = views_count;
  this.kudos_count = kudos_count;
  this.date_created = date_created;
  this.date_updated = date_updated;
};

Article.getAll = result => {};
