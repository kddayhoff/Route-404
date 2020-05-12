
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  // index route loads index.html -- this is the main/home page for the application 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //this gets all information from the user's personal personal page
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userdest.html"));
  });

};
