let searchController = require("../controllers/search.controller");

let routes = app => {
  app.route("/api/v1/search").get(searchController.searchAll);
};

module.exports = routes;
