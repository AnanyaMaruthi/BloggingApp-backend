let conn = require("./connection");
let bcrypt = require("bcrypt");

const saltRounds = 10;

let User = function(user) {
  this.user_id = user.user_id;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.about = user.about;
  this.profile_image_url = user.profile_image_url;
};

// Insert user
// Sign up
User.insertUser = function(newUser, result) {
  let passwordHash = bcrypt.hashSync(newUser.password, saltRounds);
  newUser.password = passwordHash;
  conn.query(`INSERT INTO users SET ? `, newUser, (err, res) => {
    if (err) {
      console.log("Error inserting user: ", err);
      let error = err;
      if (err.code == "ER_DUP_ENTRY") {
        error = {
          error: "Account for the given email ID already exists"
        };
      } else if (err.code == "ER_BAD_NULL_ERROR") {
        error = {
          error: "Required fields are empty"
        };
      }
      result(error, null);
    } else {
      let responseMessage = {
        message: "Successfully inserted user"
      };
      console.log("Successfully inserted user: ", newUser.email);
      result(null, responseMessage);
    }
  });
};

User.login = function(email, password, result) {
  conn.query(
    `
    SELECT username, email, password 
    FROM users
    WHERE email = '${email}'
  `,
    (err, res) => {
      if (err) {
        console.log("Error login ", err);
        result(err, null);
      } else if (res.length != 1) {
        // let valid = bcrypt.compareSync(password, res[0]["password"])

        let error = {
          error: "Invalid email or password"
        };
        console.log(res);
        result(error, null);
      } else {
        let valid = bcrypt.compareSync(password, res[0]["password"]);
        if (valid == true) {
          let msg = {
            login: true
          };
          console.log(res);
          result(null, msg);
        } else {
          let error = {
            error: "Invalid email or password"
          };
          console.log(res);
          result(error, null);
        }
      }
    }
  );
};

// Get all users
User.getAllUsers = function(result) {
  conn.query(
    `SELECT user_id, email, username, about, profile_image_url FROM users`,
    (err, res) => {
      if (err) {
        console.log("Error getting users: ", err);
        result(err, null);
      } else {
        console.log("Fetched all users");
        result(null, res);
      }
    }
  );
};

// Get user by ID
User.findUserById = function(user_id, result) {
  conn.query(
    `SELECT
        user_tbl.username, user_tbl.user_id, user_tbl.email, 
        user_tbl.about, user_tbl.profile_image_url,
        IFNULL(user_followers.followers, 0) AS followerCount,
        IFNULL(user_following.following, 0) AS followingCount
        FROM
            users user_tbl
            LEFT JOIN
            (
                SELECT followers.user_id, COUNT(DISTINCT followers.follower_id) as followers
                FROM followers 
                GROUP BY followers.user_id
            ) as user_followers ON user_tbl.user_id = user_followers.user_id
            LEFT JOIN
            (
                SELECT followers.follower_id, COUNT(followers.user_id) as following
                FROM followers 
                GROUP BY followers.follower_id
            ) as user_following ON user_tbl.user_id = user_following.follower_id
     WHERE user_tbl.user_id = ${user_id}
    `,
    (err, res) => {
      if (err) {
        console.log("Error getting user: ", err);
        result(err, null);
      } else {
        console.log("Fetched user");
        result(null, res);
      }
    }
  );
};

// Get user by email

// Patch user
User.patchUser = function(user_id, user, result) {
  conn.query(
    `UPDATE users SET username = '${user.username}', about = '${user.about}', profile_image_url = '${user.profile_image_url}' WHERE user_id = ${user_id}`,
    (err, res) => {
      if (err) {
        console.log("Error while updating: ", err);
        result(err, null);
      } else {
        console.log("Successfully updated user");
        let responseMessage = {
          message: "Successfully updated user"
        };
        result(null, responseMessage);
      }
    }
  );
};

// Delete user
User.deleteUser = function(user_id, result) {
  conn.query(`DELETE FROM users WHERE user_id = ?`, [user_id], (err, res) => {
    if (err) {
      console.log("Error deleting user: ", err);
      result(err, null);
    } else {
      console.log("Successfully deleted user");
      let responseMessage = {
        message: "Successfully deleted user"
      };
      result(null, responseMessage);
    }
  });
};

// Get followers
User.getFollowers = function(user_id, result) {
  conn.query(
    `SELECT 
        follower_tbl.user_id, follower_tbl.username, follower_tbl.email 
        FROM users user_tbl INNER JOIN followers user_follower_tbl 
            ON user_tbl.user_id = user_follower_tbl.user_id 
                INNER JOIN users follower_tbl 
                    ON user_follower_tbl.follower_id = follower_tbl.user_id
    WHERE user_tbl.user_id = ${user_id}`,
    (err, res) => {
      if (err) {
        console.log("Error fetching followers: ", err);
        result(err, null);
      } else {
        console.log("Followers: ");
        console.log(res);
        result(null, res);
      }
    }
  );
};

// Get following
User.getFollowing = function(user_id, result) {
  conn.query(
    `SELECT 
        following_tbl.user_id, following_tbl.username, following_tbl.email 
        FROM users user_tbl INNER JOIN followers user_follower_tbl 
            ON user_tbl.user_id = user_follower_tbl.follower_id 
                INNER JOIN users following_tbl 
                    ON user_follower_tbl.user_id = following_tbl.user_id
    WHERE user_tbl.user_id = ${user_id}`,
    (err, res) => {
      if (err) {
        console.log("Error fetching following users: ", err);
        result(err, null);
      } else {
        console.log("Following: ");
        console.log(res);
        result(null, res);
      }
    }
  );
};

// Get user's collections
// sending static data
User.getUserOwnedCollections = function(user_id, result) {
  conn.query(
    `
      SELECT *,
      "True" as is_owner,
      "True" as is_author,
      "True" as is_following
      FROM collections 
      WHERE user_id = ${user_id}
    `,
    (err, res) => {
      if (err) {
        console.log("Error fetching user's collections: ", err);
        result(err, null);
      } else {
        console.log("User's collections: ");
        console.log(res);
        result(null, res);
      }
    }
  );
};

// Get user's authored articles
// sending static data
User.getUserAuthoredArticles = function(user_id, result) {
  conn.query(
    `
    SELECT 
      article_id, collection_id, user_id, title, published,
      image_path, views_count, kudos_count, date_created, date_updated,
      "False" as is_bookmarked
    FROM articles WHERE user_id = ${user_id}
    `,
    (err, res) => {
      if (err) {
        console.log("Error fetching user's articles: ", err);
        result(err, null);
      } else {
        console.log("User's articles: ");
        console.log(res);
        result(null, res);
      }
    }
  );
};

module.exports = User;
