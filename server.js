var express = require("express");
var bodyParser = require("body-parser");
// var fileUpload = require("express-fileupload");
var path = require('path');
var multer = require('multer');

var app = express();
var PORT = process.env.PORT || 3333;

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(multer({dest: 'public/uploads'}).single('file')); // dest is not necessary if you are happy with the default: /tmp
app.use(express.static(path.join(__dirname, 'bower_components')));
app.set("view engine", "ejs");
// app.use(fileUpload());

require("./routes/html-api-routes.js")(app);
require("./routes/lead-api-routes.js")(app);
require("./routes/todo-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/gauth-api-routes.js")(app);

// { force: true } inside sync() if you want to rebuilding database/tables for testing.

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});
