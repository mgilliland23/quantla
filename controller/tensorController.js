var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "quantla-db.c6bauoxrw8fl.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "matt",
  password: "password",
  database: "quantla_db"
});

var dbQuery =
  "SELECT * FROM News " +
  "JOIN Prices " +
  "ON News.dateCreated = Prices.dateCreated " +
  "JOIN Fundamentals " +
  "ON News.dateCreated = Fundamentals.dateCreated";

var tController = function() {
  this.getData = new Promise(function(resolve) {
    connection.query(dbQuery, function(err, result) {
      var resultVector = [];
      if (err) throw err;
      result.forEach(function(entry) {
        var dateMatchedData = [];
        var news = {
          btcScore: entry.btcScore,
          bitcoinScore: entry.bitcoinScore,
          documentScore: entry.documentScore
        };

        var prices = {
          dateCreated: entry.dateCreated,
          currentPriceAsks: entry.currentPriceAsks,
          currentPriceBids: entry.currentPriceBids,
          previousPrice: entry.previousPrice,
          tenMinPriceVariation: entry.tenMinPriceVariation,
          currentVolume: entry.currentVolume
        };

        var funds = {
          hashRate: entry.hashRate,
          hashrateVariation: entry.hashrateVariation,
          transactionFee: entry.transactionFee,
          transactionFeeVariation: entry.transactionFeeVariation,
          costPerTransaction: entry.costPerTransaction,
          costPerTransactionVariation: entry.costPerTransactionVariation
        };
        dateMatchedData.push(prices);
        dateMatchedData.push(funds);
        dateMatchedData.push(news);
        resultVector.push(dateMatchedData);
      });
      //console.log(resultVector);
      resolve(JSON.stringify(resultVector));
      return;
    });
  });
};

module.exports = tController;
