module.exports = function(sequelize, Datatypes) {
  var User = sequelize.define("User", {
    id: Datatypes.UUID,
    defaultValue: Sequelize.UUIDV1,
    email: Datatypes.STRING,
    password: Sequelize.STRING
  });

  return User;
};
