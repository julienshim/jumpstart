var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
      var hello = "Welcome to our site!"
      var array = [
        {userName: 'Taharka'},
        {userName: 'Dayan'}
      ]
      res.render("pages/index",
        {hello: hello,
         array: array
        }
    );
    });
  
  };