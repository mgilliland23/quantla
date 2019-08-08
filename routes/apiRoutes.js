var mysqlDB = require("../models");
const Op = mysqlDB.Sequelize.Op;
require("../controller/controller.js")();

module.exports = function(app) {
  var datetime = Math.floor(new Date() / 1000);
  var hourprevious = datetime - 3600;

  // Get news articles
  app.get("/api/news", function(req, res) {
    mysqlDB.News.findAll({
      attributes: ["dateCreated", "btcScore", "bitcoinScore", "documentScore"],
      where: {
        dateCreated: {
          [Op.between]: [hourprevious, datetime] // BETWEEN now AND an hour ago
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
      res.json(newsObjs);
    });
  });

  app.get("/api/prices", function(req, res) {
    mysqlDB.Prices.findAll({
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
          [Op.between]: [hourprevious, datetime] // BETWEEN now AND an hour ago
        }
      }
    }).then(function(resultset) {
      var priceObjs = [];
      resultset.forEach(resultSetItem => {
        var priceObj = resultSetItem.get({
          plain: true
        });
        priceObjs.push(priceObj);
      });
      res.json(priceObjs);
    });
  });

  app.get("/api/fundamentals", function(req, res) {
    mysqlDB.Fundamentals.findAll({
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
          [Op.between]: [hourprevious, datetime] // BETWEEN now AND an hour ago
        }
      }
    }).then(function(resultset) {
      var fundsObjs = [];
      resultset.forEach(resultSetItem => {
        var fundsObj = resultSetItem.get({
          plain: true
        });
        fundsObjs.push(fundsObj);
      });
      res.json(fundsObjs);
    });
  });

  // Check for invite key in the database
  app.post("/api/inviteKeys", function(req, res) {
    console.log("key from front end", req.body.inviteString);
    mysqlDB.Invite.findAll({
      where: { inviteString: req.body.inviteString }
    }).then(function(dbResponse) {
      console.log(dbResponse);
      res.json(dbResponse);
    });
  });
};
