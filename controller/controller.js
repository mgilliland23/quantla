var db = require("../models");
const Op = db.Sequelize.Op;

module.exports = function() {
  var datetime = Math.floor(new Date() / 1000);
  var twoDaysAgo = datetime - 172800;

  var getFundamentalsFromDB = new Promise(function(resolve) {
    db.Fundamentals.findAll({
      attributes: [
        "dateCreated",
        "hashRate",
        "hashrateVariation",
        "transactionFee",
        "transactionFeeVariation",
        "costPerTransaction",
        "costPerTransactionVariation"
      ],
      where: {
        dateCreated: {
          [Op.between]: [twoDaysAgo, datetime] // BETWEEN now AND an hour ago
        }
      }
    }).then(function(resultset) {
      var fundamentalsObjs = [];
      resultset.forEach(resultSetItem => {
        var fundamentalsObj = resultSetItem.get({
          plain: true
        });
        fundamentalsObjs.push(fundamentalsObj);
      });
      resolve(fundamentalsObjs);
    });
  });

  var getNewsFromDB = new Promise(function(resolve) {
    db.News.findAll({
      attributes: ["dateCreated", "btcScore", "bitcoinScore", "documentScore"],
      where: {
        dateCreated: {
          [Op.between]: [twoDaysAgo, datetime] // BETWEEN now AND an hour ago
        }
      }
    }).then(function(resultset) {
      var newsObjs = [];
      resultset.forEach(resultSetItem => {
        var newsObj = resultSetItem.get({
          plain: true
        });
        newsObjs.push(newsObj);
      });
      resolve(newsObjs);
    });
  });

  var getPricesFromDB = new Promise(function(resolve) {
    db.Prices.findAll({
      attributes: [
        "dateCreated",
        "currentPriceAsks",
        "currentPriceBids",
        "previousPrice",
        "tenMinPriceVariation",
        "currentVolume"
      ],
      where: {
        dateCreated: {
          [Op.between]: [twoDaysAgo, datetime] // BETWEEN now AND an hour ago
        }
      }
    }).then(function(resultset) {
      var pricesObjs = [];
      resultset.forEach(resultSetItem => {
        var pricesObj = resultSetItem.get({
          plain: true
        });
        pricesObjs.push(pricesObj);
      });
      resolve(pricesObjs);
    });
  });

  this.getDataFromDB = new Promise(function(resolve) {
    console.log("calling get DB");
    getFundamentalsFromDB;
    getNewsFromDB;
    getPricesFromDB;
    var functs = [getPricesFromDB, getFundamentalsFromDB, getNewsFromDB];

    Promise.all(functs).then(function(values) {
      var sortedData = matchData(values[0], values[1], values[2]);
      resolve(JSON.stringify(sortedData));
      console.log("Database has returned the results");
    });
  });

  this.addNewsToDB = function(newsObj) {
    db.News.create({
      dateCreated: newsObj.dateCreated,
      btcScore: newsObj.btcScore,
      bitcoinScore: newsObj.bitcoinScore,
      documentScore: newsObj.documentScore
    });
  };

  this.addPricesToDB = function(pricesObj) {
    db.Prices.create({
      dateCreated: pricesObj.dateCreated,
      currentPriceAsks: pricesObj.currentPriceAsks,
      currentPriceBids: pricesObj.currentPriceBids,
      previousPrice: pricesObj.previousPrice,
      tenMinPriceVariation: pricesObj.tenMinPriceVariation,
      currentVolume: pricesObj.currentVolume
    });
  };

  this.addFundamentalsToDB = function(fundObj) {
    // console.log("funamentals object to be pushed");
    // console.log(fundObj);
    // console.log(fundObj.hashRate);
    db.Fundamentals.create({
      dateCreated: fundObj.dateCreated,
      hashRate: fundObj.hashRate,
      hashrateVariation: fundObj.hashrateVariation,
      transactionFee: fundObj.transactionFee,
      transactionFeeVariation: fundObj.transactionFeeVariation,
      costPerTransaction: fundObj.costPerTransaction,
      costPerTransactionVariation: fundObj.costPerTransactionVariation
    });
  };
  this.addDecisionsToDB = function(decisionObj) {
    // console.log("adding prices to db");
    // console.log(decisionObj);
    db.Decisions.create({
      dateCreated: decisionObj.dateCreated,
      buyProb: decisionObj.BuyProb,
      holdProb: decisionObj.HoldProb,
      sellProb: decisionObj.SellProb,
      currentPrice: decisionObj.CurrentPrice,
      aiDecision: decisionObj.AIDecision,
      sellIfPrice: decisionObj.SellIfPrice,
      buyIfPrice: decisionObj.BuyIfPrice
    });
  };
};

function matchData(prices, fundamentals, news) {
  var allData = [];
  prices.forEach(function(priceEntry, index) {
    var dateSortedArray = [];
    dateSortedArray.push(priceEntry);

    if (fundamentals[index] === null) {
      dateSortedArray.push({});
    } else dateSortedArray.push(fundamentals[index]);

    if (news[index] === null) {
      dateSortedArray.push({});
    } else dateSortedArray.push(news[index]);

    allData.push(dateSortedArray);
  });
  return allData;
}
