var db = require("../models");
const Op = db.Sequelize.Op;

var Controller = function() {
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

module.exports = Controller;
