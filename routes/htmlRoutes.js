// var db = require("../models");


module.exports = function(app,path) {


  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "invite.html"));
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

    // Load index page
    app.get("/test", function(req, res) {
      res.sendFile(path.join(__dirname, "../public", "test.html"));
      // db.Example.findAll({}).then(function(dbExamples) {
      //   res.render("index", {
      //     msg: "Welcome!",
      //     examples: dbExamples
      //   });
      // });
    });
  

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.render("example", {
    //     example: dbExample
    //   });
    // });
  });
  

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
