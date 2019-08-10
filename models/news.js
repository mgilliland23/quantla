module.exports = function(sequelize, Datatypes) {
  var News = sequelize.define("News", {
    dateCreated: Datatypes.INTEGER,
    btcScore: Datatypes.FLOAT,
    bitcoinScore: Datatypes.FLOAT,
    documentScore: Datatypes.FLOAT
  });

  return News;
};
