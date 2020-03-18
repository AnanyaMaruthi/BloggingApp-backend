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
    `SELECT user_id, email, username, about, profile_image_url FROM users WHERE user_id = ${user_id}`,
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

module.exports = User;
