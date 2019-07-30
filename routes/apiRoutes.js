var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Get all examples
  app.get("/api/users/:id", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  //   // Create a new example
  //   app.post("/api/examples", function(req, res) {
  //     db.Example.create(req.body).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });

  //   // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });
};
