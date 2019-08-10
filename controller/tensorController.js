var db = require("../models");

var dbQuery =
  "SELECT * FROM News " +
  "JOIN Prices " +
  "ON News.dateCreated = Prices.dateCreated " +
  "JOIN Fundamentals " +
  "ON News.dateCreated = Fundamentals.dateCreated";

var tController = function() {
  this.getData = new Promise(function(resolve) {
    db.connection.query(dbQuery, function(err, result) {
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
      console.log("data from DB:: ", resultVector[resultVector.length - 1]);

      resolve(JSON.stringify(resultVector));
      //connection.end();
      //return;
    });
  });
};

module.exports = tController;
