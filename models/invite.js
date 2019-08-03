module.exports = function(sequelize, Datatypes) {
  var Invite = sequelize.define("Invite", {
    inviteString: Datatypes.STRING,
    inUse: Datatypes.BOOLEAN
  });

  return Invite;
};
