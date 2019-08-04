var db = require("../models");

module.exports = function(app) {
  // // Get all examples
  // app.get("/api/iviteKeys", function(req, res) {
  //   db.Invite.findAll({ where: { invite_key: req.params.invite_key } }).then(
  //     function(dbResponse) {
  //       res.json(dbResponse);
  //     }
  //   );
  // });

  // Check for invite key in the database
  app.post("/api/inviteKeys", function(req, res) {
    console.log("key from front end", req.body.inviteString);
    db.Invite.findAll({
      where: { inviteString: req.body.inviteString }
    }).then(function(dbResponse) {
      console.log(dbResponse);
      res.json(dbResponse);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    // db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });
};
