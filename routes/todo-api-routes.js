var db = require("../models");

module.exports = function(app) {

  app.get("/api/todos", function(req, res) {
    var query = {};
    if (req.query.todolist_id) { // Not sure what the req.query.tag will be so todolist_id for now
      query.TodolistId = req.query.todolist_id;
    }
    db.Todo.findAll({
      where: query,
      include: [db.Todolist]
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // GET route for retrieving a single todo
  app.get("/api/todos/:id", function(req, res) {
    db.Todo.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Todolist]
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    console.log(req.body);
    db.Todo.create(req.body).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting todos
  app.delete("/api/todos/:id", function(req, res) {
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  //PUT route for updating todos
  app.put("/api/todos", function(req, res) {
    db.Todo.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });
  
  };