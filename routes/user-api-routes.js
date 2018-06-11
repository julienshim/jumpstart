var db = require("../models");

module.exports = function(app) {

  app.get("/api/users", function(req, res) {

    db.User.findAll({
      // include: [db.Lead]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Postman (or browser)
  // localhost:333/api/users

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Lead]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Postman
  // localhost:333/api/users/1

  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Postman
  // {
  //   "user_name": "Jake",
  //   "email": "jake@bmail.com"
  // }

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
};

  //Postman
  // localhost:333/api/users/1