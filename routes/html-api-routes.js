var path = require("path");

module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    // index route loads view.html
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
  
    // cms route loads cms.html
    app.get("/todos", function(req, res) {
      res.send("This is todos.");
    });
  
    // blog route loads blog.html
    app.get("/leads", function(req, res) {
      res.send("This is leads.");
    });
  
  };