var db = require("../models");

module.exports = function(app) {

  app.get("/api/leads", function(req, res) {
    var query = {};
    if (req.query.user_id) { // Not sure what the req.query.tag will be so user_id for now
      query.UserId = req.query.user_id;
    }
    db.Lead.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbLead) {
      res.json(dbLead);
    });
  });

  // GET route for retrieving a single lead
  app.get("/api/leads/:id", function(req, res) {
    db.Lead.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbLead) {
      res.json(dbLead);
    });
  });

  // POST route for saving a new lead
  app.post("/api/leads", function(req, res) {
    console.log(req.body);
    db.Lead.create(req.body).then(function(dbLead) {
      res.json(dbLead);
    });
  });

  // Postman - Must cancel out leads.association on models > lead.js file
  // { 
  //     "company": "Apple, Inc.",
  //     "position": "Software Engineer",
  //     "leadLink": "http://jobs.apple.com/someleadlink",
  //     "dateApplied": "2018-01-01",
  //     "documents": "http://drive.google.com/somedocumentslink",
  //     "notes": "The hiring Manager is Jake Andrews."
  // }

  // DELETE route for deleting leads
  app.delete("/api/leads/:id", function(req, res) {
    db.Lead.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLead) {
      res.json(dbLead);
    });
  });

  //PUT route for updating leads
  app.put("/api/leads", function(req, res) {
    db.Lead.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLead) {
      res.json(dbLead);
    });
  });
  
  };