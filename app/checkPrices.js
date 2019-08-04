var colors = require("colors");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });

var Prices = function() {
  //This function checks the current prices for bitcoin and calculates the trend
  //It grabs price data from the previous 6 hours and provides 1 and 10 minute trends
  //Using this data, it calculates what prices we should buy, sell or hold at

  this.checkPrices = new Promise(function(resolve, reject) {
    console.log(colors.inverse("Prices data"));
    interval = "1min";

    symbol = "BTCUSD";

    queryURL =
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
      symbol +
      "&interval=" +
      interval +
      "&apikey=" +
      apikey;

    //Make the query to the Alphavantage API to get data for BTC prices
    request(queryURL, { json: true }, function(error, response, body) {
      //Get the object that contains all of the price data objects from the response body
      var pricesData = body["Time Series (1min)"];

      //This is the current price
      var currentPriceData = pricesData[Object.keys(pricesData)[0]];
      var currentPriceClose = currentPriceData["4. close"];
      //Volume returns as 0 sometimes????
      var currentVolume = currentPriceData["5. volume"];
      console.log("Current price: ", currentPriceClose);

      //This is the price from 1 minute previous
      var previousPriceData = pricesData[Object.keys(pricesData)[1]];
      var previousPriceClose = previousPriceData["4. close"];
      console.log("Previous price: 1 Mins ago:  ", previousPriceClose);

      //This is the price from 10 minute previous
      var tenMinPriceData = pricesData[Object.keys(pricesData)[9]];
      var tenMinPriceClose = tenMinPriceData["4. close"];
      console.log("Previous price: 10 Mins ago:  ", tenMinPriceClose);

      //Calculating the variation in prices:
      var priceVariation = (currentPriceClose / previousPriceClose - 1) * 1000;
      var tenMinPriceVariation =
        (currentPriceClose / tenMinPriceClose - 1) * 1000;

      //Construct the object to be returned by the function
      var priceData = {
        currentPrice: currentPriceClose,
        previousPrice: previousPriceClose,
        priceVariation: priceVariation,
        tenMinPriceVariation: tenMinPriceVariation,
        currentVolume: currentVolume
      };
      resolve(priceData);
    });
  });
};

module.exports = Prices;

// choicesobj = {
//     'BTC Bitcoin': 'BTCUSD',
//     'LTC Litecoin': 'LTCUSD',
//     'XRP Ripple': 'XRPUSD',
//     'ETH Ethererum': 'ETHUSD',
//     'XMR Monero': 'XMRUSD',
//     'MAID MaidSafeCoin': 'MAIDUSD',
//     'BCH Bitcoin Cash': 'BCHUSD',
//     'XEM NEM': 'XEMUSD',
// };

//   var leveldata = [];
//   slevel_s = 0;
//   blevel_s = 0;
//   slevelcount = 0;
//   blevelcount = 0;
//   for (i = 0; i < findata.length - 6; i++) {
//     leveldata[i] = findata[i] / findata[i + 6] - 1;
//     if (leveldata[i] >= 0) {
//       slevel_s = slevel_s + leveldata[i];
//       slevelcount++;
//     } else {
//       blevel_s = blevel_s + leveldata[i];
//       blevelcount++;
//     }
//   }

//   blevel = blevel_s / blevelcount;
//   slevel = slevel_s / slevelcount;

//   // levels and estimates can be improved in the future using Technical Indicators
//   // https://www.fmlabs.com/reference/

//   function checktrend() {
//     if (Math.abs(blevel) > Math.abs(slevel)) {
//       return "DOWN";
//     } else return "UP";
//   }

//   console.log(colors.inverse(symbol + " trading strategy"));
//   console.log(colors.yellow("   " + "Current Price:    " + findata[0]));
//   console.log(
//     colors.yellow(
//       "   " +
//         "Buy If Price:     " +
//         Math.round(findata[0] * (1 + blevel) * 10000, 0) / 10000
//     )
//   );
//   console.log(
//     colors.yellow(
//       "   " +
//         "Sell If Price:    " +
//         Math.round(findata[0] * (1 + slevel) * 10000, 0) / 10000
//     )
//   );
//   console.log(colors.yellow("   " + "Max time to hold: " + "6h"));
//   console.log(colors.yellow("   " + "Trend:            " + checktrend()));
//   console.log("\n");

//   console.log(colors.inverse(symbol + " most recent prices"));
//   var recentPrices = [];
//   for (j = 0; j < 5; j++) {
//     if (
//       Math.round((((findata[j] * 1) / findata[j + 1]) * 1 - 1) * 10000, 0) /
//         100 >=
//       0
//     ) {
//       console.log(
//         "   " +
//           keys[j] +
//           "   " +
//           findata[j] +
//           "    " +
//           colors.green(
//             "+" +
//               Math.round(
//                 (((findata[j] * 1) / findata[j + 1]) * 1 - 1) * 10000,
//                 0
//               ) /
//                 100 +
//               "%"
//           )
//       );
//     } else {
//       console.log(
//         "   " +
//           keys[j] +
//           "   " +
//           findata[j] +
//           "    " +
//           colors.red(
//             Math.round(
//               (((findata[j] * 1) / findata[j + 1]) * 1 - 1) * 10000,
//               0
//             ) /
//               100 +
//               "%"
//           )
//       );
//     }

//     var pricesObj = {
//       date: keys[j],
//       price: findata[j],
//       trend:
//         Math.round(
//           (((findata[j] * 1) / findata[j + 1]) * 1 - 1) * 10000,
//           0
//         ) / 100
//     };
//     recentPrices.push(pricesObj);
//   }
