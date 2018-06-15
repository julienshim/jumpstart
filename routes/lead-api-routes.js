var db = require("../models");
var meetup = require('../lib/meetup.js');

module.exports = function(app) {

  app.get("/api/leads/:userId", function(req, res) {
    console.log("HERERERERERE")
    db.Lead.findAll({
      where: {
        UserId: req.params.userId
      },
      include: [db.User]
    }
  ).then(function(dbLead) {
      var leadArray = [];
      for (var i = 0; i < dbLead.length; i++) {
        var lead = {};
        lead.id = dbLead[i].dataValues.id;
        lead.company = dbLead[i].dataValues.company;
        lead.position = dbLead[i].dataValues.position;
        leadArray.push(lead);
      }
      console.log("┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬", typeof leadArray);
      console.log("┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬┴┬", leadArray);
      res.render('pages/myleads', {
        leadArray: leadArray
      });
  
    });
  });

  // GET route for retrieving a single lead
  app.get("/api/leads/:userId/:leadId", function(req, res) {
    console.log(req.params)
    db.Lead.findOne({
      where: {
        UserId: req.params.userId,
        id: req.params.leadId
      },
      include: [db.User]
    }).then(function(dbLead) {
      console.log(dbLead);
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
  //     "notes": "The hiring Manager is Jake Andrews.",
  //     "UserId": 1
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
  app.put("/api/leads/", function(req, res) {
    console.log("IN HEREEEEEEEEE MANG");
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

  // post route for document attachments
  app.post('/upload', function(req, res) {
    console.log("here!!!!!")
    if (!req.files)
      return res.status(400).send('File uploaded!');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/files/file.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });
  });

  app.post('/events', function(req, res){
    console.log(meetup)
    meetup.getGroup('urlname: banodejs', function(err, resp) {
      console.log(err, resp)
    });
  })

  // app.post('/upload', function(req, res) {
  //   console.log("here!!!!!")
  //   console.log(req.files.file)
  //   if (!req.files)
  //     return res.status(400).send('No files were uploaded.');
   
  //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //   let sampleFile = req.files.sampleFile;
   
  //   // Use the mv() method to place the file somewhere on your server
  //   sampleFile.mv('/files/file.jpg', function(err) {
  //     if (err)
  //       return res.status(500).send(err);
   
  //     res.send('File uploaded!');
  //   });
  // });

  };