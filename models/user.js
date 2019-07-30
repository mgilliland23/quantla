module.exports = function(sequelize, Datatypes) {
  var User = sequelize.define("User", {
    id: {
      type: Datatypes.UUID,
      primaryKey: true,
      defaultValue: Datatypes.UUIDV1
    },
    email: Datatypes.STRING,
    password: Datatypes.STRING
  });

  return User;
};
