const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "public/images/");
  },
  filename: function(req, file, callback) {
    let filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    let image_url = "http://localhost:3000/static/images/" + filename;
    req.image_url = image_url;
    callback(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
