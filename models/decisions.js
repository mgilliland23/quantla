module.exports = function(sequelize, Datatypes) {
  var Decisions = sequelize.define("Decisions", {
    dateCreated: Datatypes.INTEGER,
    buyProb: Datatypes.DECIMAL(10, 4),
    holdProb: Datatypes.DECIMAL(10, 4),
    sellProb: Datatypes.DECIMAL(10, 4),
    currentPrice: Datatypes.DECIMAL(10, 4),
    aiDecision: Datatypes.STRING,
    sellIfPrice: Datatypes.DECIMAL(10, 4),
    buyIfPrice: Datatypes.DECIMAL(10, 4)
  });

  return Decisions;
};
