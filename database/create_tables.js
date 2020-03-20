let conn = require("../app/models/connection");

// conn.query("DROP DATABASE blogging_app", err => {
//   if (err) throw err;
//   console.log("drop");
// });

// USERS TABLE
let create_user_table = `
    CREATE TABLE IF NOT EXISTS users(
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        email  VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        about VARCHAR(2048),
        profile_image_url VARCHAR(2048)
    )
`;

conn.query(create_user_table, (err, result) => {
  if (err) throw err;
  console.log("users table created");
});

// FOLLOWERS TABLE
// Add primary key and not null
let create_followers_table = `
    CREATE TABLE IF NOT EXISTS followers(
        user_id INT,
        follower_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(follower_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_followers_table, (err, result) => {
  if (err) throw err;
  console.log("followers table created");
});

// COLLECTIONS TABLE
let create_collections_table = `
    CREATE TABLE IF NOT EXISTS collections(
        collection_id VARCHAR(255) PRIMARY KEY,
        collection_name VARCHAR(255) NOT NULL,
        user_id INT,
        image_url VARCHAR(2048),
        description VARCHAR(2048),
        user_only BOOLEAN,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_collections_table, (err, result) => {
  if (err) throw err;
  console.log("collections table created");
});

// USERS_COLLECTIONS TABLE
// make user_id and collection_id unique together
let create_users_collections_table = `
    CREATE TABLE IF NOT EXISTS users_collections(
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        collection_id VARCHAR(255),
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_users_collections_table, (err, result) => {
  if (err) throw err;
  console.log("users_collections table created");
});

// COLLECTION_AUTHORS
let create_collection_authors_table = `
    CREATE TABLE IF NOT EXISTS collection_authors(
      id INT PRIMARY KEY AUTO_INCREMENT,
      collection_id VARCHAR(255),
      author_id INT,
      FOREIGN KEY(author_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_collection_authors_table, (err, result) => {
  if (err) throw err;
  console.log("collections_authors table created");
});

// ARTICLES TABLE
let create_articles_table = `
    CREATE TABLE IF NOT EXISTS articles(
        article_id VARCHAR(255) PRIMARY KEY,
        collection_id VARCHAR(255),
        user_id INT,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT,
        published BOOLEAN,
        image_path VARCHAR(2048),
        views_count INT,
        kudos_count INT,
        date_created DATE,
        date_updated DATE,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_articles_table, (err, result) => {
  if (err) throw err;
  console.log("articles table created");
});

// ARTICLE_BOOKMARKS TABLE
let create_article_bookmarks_table = `
    CREATE TABLE IF NOT EXISTS article_bookmarks(
        bookmark_id INT PRIMARY KEY AUTO_INCREMENT,
        article_id VARCHAR(255),
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(article_id) REFERENCES articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;
conn.query(create_article_bookmarks_table, (err, result) => {
  if (err) throw err;
  console.log("article_bookmarks table created");
});

// QUESTIONS TABLE
let create_questions_table = `
    CREATE TABLE IF NOT EXISTS questions(
        question_id VARCHAR(255) PRIMARY KEY,
        collection_id VARCHAR(255),
        user_id INT,
        title VARCHAR(2048),
        content LONGTEXT,
        date_created DATE,
        date_updated DATE,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;
conn.query(create_questions_table, (err, result) => {
  if (err) throw err;
  console.log("questions table created");
});

// QUESTION_BOOKMARKS TABLE
let create_question_bookmarks_table = `
    CREATE TABLE IF NOT EXISTS question_bookmarks(
        bookmark_id INT PRIMARY KEY AUTO_INCREMENT,
        question_id VARCHAR(255),
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_question_bookmarks_table, (err, result) => {
  if (err) throw err;
  console.log("question_bookmarks table created");
});

// ANSWERS TABLE
let create_answers_table = `
    CREATE TABLE IF NOT EXISTS answers(
        answer_id VARCHAR(255),
        question_id VARCHAR(255),
        user_id INT,
        content LONGTEXT,
        date_created DATE,
        date_updated DATE,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_answers_table, (err, result) => {
  if (err) throw err;
  console.log("answers table created");
});

// TAGS TABLE
let create_tags_table = `
    CREATE TABLE IF NOT EXISTS tags(
        tag_id INT PRIMARY KEY AUTO_INCREMENT,
        tag_name VARCHAR(500)
    )
`;

conn.query(create_tags_table, (err, result) => {
  if (err) throw err;
  console.log("tags table created");
});

// COLLECTIONS_TAGS TABLE
let create_collections_tags_table = `
    CREATE TABLE IF NOT EXISTS collections_tags(
        id INT PRIMARY KEY AUTO_INCREMENT,
        tag_id INT,
        collection_id VARCHAR(255),
        FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_collections_tags_table, (err, result) => {
  if (err) throw err;
  console.log("collections_tags table created");
});

// ARTICLES_TAGS TABLE
let create_articles_tags_table = `
    CREATE TABLE IF NOT EXISTS articles_tags(
        id INT PRIMARY KEY AUTO_INCREMENT,
        tag_id INT,
        article_id VARCHAR(255),
        FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(article_id) REFERENCES articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_articles_tags_table, (err, result) => {
  if (err) throw err;
  console.log("articles_tags table created");
});

// QUESTIONS_TAGS TABLE
let create_questions_tags_table = `
    CREATE TABLE IF NOT EXISTS questions_tags(
        id INT PRIMARY KEY AUTO_INCREMENT,
        tag_id INT,
        question_id VARCHAR(255),
        FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_questions_tags_table, (err, result) => {
  if (err) throw err;
  console.log("questions_tags table created");
});

// COMMENTS TABLE
let create_comments_table = `
    CREATE TABLE IF NOT EXISTS comments(
        comment_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        content TEXT,
        date_created DATE,
        date_updated DATE,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_comments_table, (err, result) => {
  if (err) throw err;
  console.log("comments table created");
});

// ARTICLE_COMMENTS TABLE
let create_articles_comments_table = `
    CREATE TABLE IF NOT EXISTS articles_comments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        comment_id INT,
        article_id VARCHAR(255),
        FOREIGN KEY(article_id) REFERENCES articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_articles_comments_table, (err, result) => {
  if (err) throw err;
  console.log("artilce_comments table created");
});

// REPLY_COMMENTS TABLE
let create_reply_comments_table = `
    CREATE TABLE IF NOT EXISTS articles_comments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        comment_id INT,
        reply_id VARCHAR(255),
        FOREIGN KEY(comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(reply_id) REFERENCES comments(reply_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
`;

conn.query(create_reply_comments_table, (err, result) => {
  if (err) throw err;
  console.log("reply_comments table created");
});
