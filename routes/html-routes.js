// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require(path.join(__dirname, "..", "config", "middleware", "isAuthenticated.js"));

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home page, index.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  //this will load user specific profile along with journal/destination activities
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/userdest.html"));
  });


app.get("/", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/userdest.html");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/userdest");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
app.get("/userdest", isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/userdest.html"));
});
}
