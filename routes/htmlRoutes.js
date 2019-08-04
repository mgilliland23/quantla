// var db = require("../models");


module.exports = function (app, path) {



  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "invite.html"));
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  app.get("/terms", function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "tos.html"));
  });

  // Load index page
  app.get("/core", function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "core.html"));
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

    // Load index page
    app.get("/core/news", function (req, res) {
      res.sendFile(path.join(__dirname, "../public", "news.html"));
    });

      // Load index page
  app.get("/core/prices", function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "prices.html"));
  });

    // Load index page
    app.get("/core/fundamentals", function (req, res) {
      res.sendFile(path.join(__dirname, "../public", "fundamentals.html"));

    });


  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.render("example", {
    //     example: dbExample
    //   });
    // });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
