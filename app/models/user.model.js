let conn = require("./connection");

let User = function(user) {
  this.user_id = user.user_id;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
  this.about = user.about;
  this.profile_image_url = user.profile_image_url;
};

// Insert user
User.insertUser = function(newUser, result) {
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

module.exports = User;
