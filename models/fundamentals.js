module.exports = function(sequelize, Datatypes) {
  var Fundamentals = sequelize.define("Fundamentals", {
    dateCreated: Datatypes.INTEGER,
    hashRate: Datatypes.DECIMAL(16, 4),
    hashrateVariation: Datatypes.FLOAT,
    transactionFee: Datatypes.DECIMAL(10, 4),
    transactionFeeVariation: Datatypes.FLOAT,
    costPerTransaction: Datatypes.DECIMAL(10, 4),
    costPerTransactionVariation: Datatypes.FLOAT
  });

  return Fundamentals;
};
