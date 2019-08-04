var fs = require("fs");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });
var Table = require("cli-table");
var colors = require("colors");

require("./tools.js")();

var Fundamentals = function() {
  this.checkFundamentals = new Promise(function(resolve, reject) {
    // mining data
    console.log(colors.inverse("Mining data"));

    // API calls to block chain to grab mining data
    queryURL = [
      "https://api.blockchain.info/charts/hash-rate?cors=true&timespan=30days&format=json&lang=en",
      "https://api.blockchain.info/charts/transaction-fees?cors=true&timespan=30days&format=json&lang=en",
      "https://api.blockchain.info/charts/cost-per-transaction?cors=true&timespan=30days&format=json&lang=en"
    ];

    var datainfo = [];

    Promise.map(queryURL, function(url) {
      return request.getAsync(url).spread(function(response, body) {
        return [JSON.parse(body), url];
      });
    }).then(function(results) {
      //1 day variation for hashrate
      var hashRateData = results[0][0].values;
      var currHashRate = hashRateData[0].y;
      var prevHashRate = hashRateData[1].y;
      var hashRateVariation = currHashRate / prevHashRate - 1;

      //1 day variation for transaction fee
      var transactionFeeData = results[1][0].values;
      var currTransactionFee = transactionFeeData[0].y;
      var prevTransacrionFee = transactionFeeData[1].y;
      var transactionFeeVariation = currTransactionFee / prevTransacrionFee - 1;

      //1 day variation for cost per transaction
      var costPerTransactionData = results[2][0].values;
      var currCostPerTransaction = costPerTransactionData[0].y;
      var prevCostPerTransaction = costPerTransactionData[1].y;
      var costPerTransactionVariation =
        currCostPerTransaction / prevCostPerTransaction - 1;

      var fundamentalsObj = {
        hashrateVariation: hashRateVariation,
        transactionFeeVariation: transactionFeeVariation,
        costPerTransactionVariation: costPerTransactionVariation
      };

      resolve(fundamentalsObj);
    });
  });
};

module.exports = Fundamentals;

// fs.appendFile("log.txt", "What key market fundamentals do you want to check?: {" + selectedDataPoint + "}\n", function (err) {
//     if (err) throw err;
// })

// if (selectedDataPoint == 'US Sector Performance (realtime)') {
//     queryURL = 'https://www.alphavantage.co/query?function=SECTOR&apikey=' + apikey;
//     request(queryURL, { json: true }, function (error, response, body) {

//         fs.appendFile("log.txt", "Response: " + JSON.stringify(response).replace(grabmykey(), "*************").replace(grabmykey(), "*************").replace(grabmykey(), "*************").replace(grabmykey(), "*************") + "\n", function (err) {
//             if (err) throw err;

//             fs.appendFile("log.txt", "--------------------------------------------\n", function (err) {
//                 if (err) throw err;
//             })
//         })

//         data = body['Rank A: Real-Time Performance'];
//         keys = Object.keys(body['Rank A: Real-Time Performance']);

//         var funddata = [];
//         for (i = 0; i < keys.length; i++) {
//             funddata.push(body['Rank A: Real-Time Performance'][keys[i]]);
//         }

//         var table = new Table();

//         for (i = 0; i < funddata.length; i++) {

//             table.push(
//                 [
//                     keys[i],
//                     checkcolor(funddata[i])
//                 ]
//             );
//         }

//         console.log(table.toString());

//     });

// }

// else if (selectedDataPoint == 'Blockchain data') {

//     console.log(colors.inverse('Blockchain data'));

//     // blockchain data
//     queryURL = [
//         'https://api.blockchain.info/charts/market-price?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/mempool-size?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/avg-block-size?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/n-transactions?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/n-transactions-per-block?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/median-confirmation-time?cors=true&timespan=30days&format=json&lang=en',
//         'https://api.blockchain.info/charts/n-unique-addresses?cors=true&timespan=30days&format=json&lang=en',
//     ]
//     let fulldata = [];
//     var datainfo = [];
//     var myblocktable = new Table();

//     Promise.map(queryURL, function (url) {
//         return request.getAsync(url).spread(function (response, body) {
//             return [JSON.parse(body), url];
//         });
//     }).then(function (results) {

//         fs.appendFile("log.txt", "Response: " + JSON.stringify(results) + "\n", function (err) {
//             if (err) throw err;

//             fs.appendFile("log.txt", "--------------------------------------------\n", function (err) {
//                 if (err) throw err;
//             })
//         })

//         // console.log(results[1][0].values);

//         var fulldata = [];

//         headerinfo = [
//             colors.bold(colors.white('name')),
//             colors.bold(colors.white('description')),
//             colors.bold(colors.white('val (curr)')),
//             colors.bold(colors.white('val (1m ago)')),
//             colors.bold(colors.white('Variation %')),
//         ];

//         var fulldata = new Table({
//             head: headerinfo,
//             colWidths: [15, 15, 15, 15, 15]
//         });

//         for (i = 0; i < results.length; i++) {
//             datainfo[i] = [
//                 results[i][0].name,
//                 results[i][0].description,
//                 Math.round(results[i][0].values[results[i][0].values.length - 1].y * 1000, 0) / 1000,
//                 Math.round(results[i][0].values[0].y * 1000, 0) / 1000,
//                 checkcolor(Math.round((results[i][0].values[results[i][0].values.length - 1].y * 1 / results[i][0].values[0].y * 1 - 1) * 10000, 0) / 100 + '%'),
//             ];

//             fulldata.push(datainfo[i]);
//             // treatblockchaindata(data);
//         }

//         // console.log(fulldata);
//         console.log(fulldata.toString());

//     })

// }
// else if (selectedDataPoint == 'Mining data') {
//   headerinfo = [
//     colors.bold(colors.white("name")),
//     colors.bold(colors.white("description")),
//     colors.bold(colors.white("val (curr)")),
//     colors.bold(colors.white("val (1 day ago)")),
//     colors.bold(colors.white("Variation %"))
//   ];

//   var fulldata = new Table({
//     head: headerinfo,
//     colWidths: [15, 15, 15, 15, 15]
//   });

//   for (i = 0; i < results.length; i++) {
//     datainfo[i] = [
//       results[i][0].name,
//       results[i][0].description,
//       Math.round(
//         results[i][0].values[results[i][0].values.length - 1].y * 1000,
//         0
//       ) / 1000,
//       Math.round(results[i][0].values[0].y * 1000, 0) / 1000,
//       checkcolor(
//         Math.round(
//           (((results[i][0].values[results[i][0].values.length - 1].y * 1) /
//             results[i][0].values[0].y) *
//             1 -
//             1) *
//             10000,
//           0
//         ) /
//           100 +
//           "%"
//       )
//     ];

//     fulldata.push(datainfo[i]);
//     // treatblockchaindata(data);
//   }

//   // console.log(fulldata);
//   console.log(fulldata.toString());
// }

// else {
//     queryURL = 'https://api.blockchain.info/pools?cors=true';
//     request(queryURL, { json: true }, function (error, response, body) {

//         fs.appendFile("log.txt", "Response: " + JSON.stringify(response) + "\n", function (err) {
//             if (err) throw err;

//             fs.appendFile("log.txt", "--------------------------------------------\n", function (err) {
//                 if (err) throw err;
//             })
//         })

//         keys = Object.keys(body);
//         var owndata = [];
//         var sum_pool = 0;

//         for (i = 0; i < keys.length; i++) {
//             owndata.push(body[keys[i]]);
//             sum_pool = sum_pool + body[keys[i]] * 1;
//         }

//         var owntable = new Table();
//         for (i = 0; i < owndata.length; i++) {
//             owntable.push(
//                 [
//                     keys[i],
//                     Math.round(owndata[i] * 1 / sum_pool * 10000, 0) / 100
//                 ]
//             )
//         }

//         owntable.sort(sortFunction);

//         for (i = 0; i < owndata.length; i++) {
//             owntable[i][1] = owntable[i][1] + "%"
//         }

//         function sortFunction(a, b) {
//             if (a[1] === b[1]) {
//                 return 0;
//             }
//             else {
//                 return (a[1] < b[1]) ? 1 : -1;
//             }
//         }
//         console.log(owntable.toString());
//     });
// }
