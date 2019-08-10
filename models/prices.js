module.exports = function(sequelize, Datatypes) {
  var Prices = sequelize.define("Prices", {
    dateCreated: Datatypes.INTEGER,
    currentPriceAsks: Datatypes.DECIMAL(10, 4),
    currentPriceBids: Datatypes.DECIMAL(10, 4),
    previousPrice: Datatypes.DECIMAL(10, 4),
    tenMinPriceVariation: Datatypes.FLOAT,
    currentVolume: Datatypes.FLOAT
  });

  return Prices;
};
