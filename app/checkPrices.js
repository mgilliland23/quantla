var colors = require("colors");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });

var Prices = function(datetime) {
  //This function checks the current prices for bitcoin and calculates the trend
  //It grabs price data from the previous 6 hours and provides 1 and 10 minute trends
  //Using this data, it calculates what prices we should buy, sell or hold at

  this.checkPrices = new Promise(function(resolve, reject) {
    console.log(colors.inverse("Prices data"));
    interval = "1min";

    //current time in UNIX epoch:
    end = Math.floor(new Date() / 1000);

    //10 minutes ago:
    start = end - 600;

    prevPriceQueryURL =
      "https://poloniex.com/public?command=returnChartData&currencyPair=USDC_BTC&start=" +
      start +
      "&end=" +
      end +
      "&period=300";

    currPriceQueryURL =
      "https://poloniex.com/public?command=returnOrderBook&currencyPair=USDC_BTC&depth=1";

    volQueryURL = " https://poloniex.com/public?command=return24hVolume";

    queryURLs = [currPriceQueryURL, volQueryURL, prevPriceQueryURL];

    Promise.map(queryURLs, function(url) {
      return request.getAsync(url).spread(function(response, body) {
        return [JSON.parse(body), url];
      });
    }).then(function(results) {
      var currentPriceAsks = results[0][0].asks[0][0];
      console.log("current ask price", currentPriceAsks);

      var currentPriceBids = results[0][0].bids[0][0];
      console.log("current bid price", currentPriceBids);

      console.log("24hr volume in USD: ", results[1][0]["USDC_BTC"]);
      var currentVolume = results[1][0]["USDC_BTC"].USDC;

      //Get the object that contains all the previous price data objects from the response body
      console.log("Previous price: ", results[2][0][0].close);
      //get the price data from 10 minutes ago
      var previousPriceClose = results[2][0][0].close;
      console.log("previous price (10 mins ago): ", previousPriceClose);

      var tenMinPriceVariation = currentPriceAsks / previousPriceClose - 1;

      // Construct the object to be returned by the function
      var priceData = {
        dateCreated: datetime,
        currentPriceAsks: currentPriceAsks,
        currentPriceBids: currentPriceBids,
        previousPrice: previousPriceClose,
        tenMinPriceVariation: tenMinPriceVariation,
        currentVolume: currentVolume
      };
      resolve(priceData);
    });
  });
};

module.exports = Prices;
