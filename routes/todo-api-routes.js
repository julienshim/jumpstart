var db = require("../models");

module.exports = function(app) {

  app.get("/api/todos/:userId", function(req, res) {
    console.log("HERERERERERE")
    db.Lead.findAll({
      where: {
        UserId: req.params.userId
      },
      include: [db.Todo]
    }
  ).then(function(dbLead) {
    var todoArray = [];
    for (var i = 0; i < dbLead.length; i++) {
      if (dbLead[i].dataValues.Todos.length > 0) {
        for (var j = 0; j < dbLead[i].dataValues.Todos.length; j++ ) { 
          var todoObject = {};
          todoObject.todoleadId = dbLead[i].dataValues.id;
          todoObject.todoleadCompany = dbLead[i].dataValues.company;
          todoObject.todoleadPosition = dbLead[i].dataValues.position;
          todoObject.todoId = dbLead[i].dataValues.Todos[j].dataValues.id;
          todoObject.todoTaskName = dbLead[i].dataValues.Todos[j].dataValues.task_name;
          todoObject.todoCompleted = dbLead[i].dataValues.Todos[j].dataValues.completed;
          todoObject.todoContent = dbLead[i].dataValues.Todos[j].dataValues.content;
          todoArray.push(todoObject);
        } 
      }
    }

    console.log(todoArray);
    res.render('pages/todos', {
      todoArray: todoArray
    });

      // console.log("Lead Id:", dbLead[0].dataValues.id);
      // console.log("Todo Children", dbLead[0].dataValues.Todos[0].dataValues.id);
      // console.log("Todo Children", dbLead[0].dataValues.Todos[0].dataValues.task_name);
      // console.log("Todo Children", dbLead[0].dataValues.Todos[0].dataValues.completed);
      // console.log("Todo Children", dbLead[0].dataValues.Todos[0].dataValues.content);



      // for var (var i = 0; i < dbLead.length)
      // var leadArray = [];
      // for (var i = 0; i < dbLead.length; i++) {
      //   var lead = {};
      //   lead.id = dbLead[i].dataValues.id;
      //   lead.company = dbLead[i].dataValues.company;
      //   lead.position = dbLead[i].dataValues.position;
      //   leadArray.push(lead);
      // }
      // console.log("┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬", typeof leadArray);
      // console.log("┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬", leadArray);
      // res.render('pages/myleads', {
      //   leadArray: leadArray
      // });
  
    });
  });

  app.get("/api/todos", function(req, res) {
    var query = {};
    if (req.query.leadId) { // Not sure what the req.query.tag will be so todolist_id for now
      query.LeadId = req.query.leadId;
    }
    db.Todo.findAll({
      where: query,
      include: [db.Lead]
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
      include: [db.Lead]
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