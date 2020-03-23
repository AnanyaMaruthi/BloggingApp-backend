let jwt = require("jsonwebtoken");
let config = require("../config");

const key = config.key;

let auth = async (req, res, next) => {
  let token = req.header("Authorization");
  console.log(token);
  try {
    let data = jwt.verify(token, key, { algorithm: "HS256" });
    console.log(data);
    req.user_id = data.user_id;
    req.token = token;
    next();
  } catch (err) {
    res.status(401);
    res.send("Bad Token");
  }
};

module.exports = auth;
