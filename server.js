const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./app/routes/users.routes");
const collectionRoutes = require("./app/routes/collections.routes");
const postRoutes = require("./app/routes/posts.routes");

const app = express();
// app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.route("/haha").get((req, res) => {
  res.send("you at haha");
});

userRoutes(app);
collectionRoutes(app);
postRoutes(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
