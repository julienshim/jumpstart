var path = require("path");

module.exports = function(app) {

  // app.get("/", function(req, res) {
  //   var hello = "Welcome to our site!"
  //   var array = [
  //     {userName: 'Taharka'},
  //     {userName: 'Dayan'}
  //   ]
  //   res.render("pages/myleads-cms",
  //     {hello: hello,
  //      array: array
  //     }
  // );
  // });


  //---------------------------------------------------------------------------------------------------------
  // ↑↑↑ DON'T BELIEVE WE NEED THIS TEMPLATE ABOVE YET. NOT UNTIL WE FIGURE OUT HOW TO DISPLAY ALL STUFF ↑↑↑
  //---------------------------------------------------------------------------------------------------------
  
  app.get("/", function(req, res) {
    res.render("pages/myhome");
  });

  app.get("/myleads", function(req, res) {
    res.render("pages/myleads");
  });

  app.get("/myleads-cms", function(req, res) {
    res.render("pages/myleads-cms");
  });

  app.get("/todos", function(req, res) {
    res.render("pages/todos");
  });

  app.get("/todos-cms", function(req, res) {
    res.render("pages/todos-cms");
  });

  app.get("/calendar", function(req, res) {
    res.render("pages/calendar");
  });

  app.get("/networking", function(req, res) {
    res.render("pages/networking");
  });

  // app.get("/home", function(req, res) {
  //   res.render("pages/myhome");
  // });

}