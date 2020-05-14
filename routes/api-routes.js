// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts of single user, named what id like. connected db variable from destination.js
  app.get("/api/usernotes/", function(req, res) {
    var query ={}
    if (req.query.user_id){
      query.userid = req.query.user_id
    }
    db.destNotes.findAll({
      where: query
    })
      .then(function(dbdestNotes) {
        res.json(dbdestNotes);
      });
  });

  // Get route for returning a specifiic posts by id
  app.get("/api/notes/:id", function(req, res) {
    db.destNotes.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbdestNotes) {
        res.json(dbdestNotes);
      });
  });
// route to user table; calling the destinations get route to /users/:id, restrict to a parameter
  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
