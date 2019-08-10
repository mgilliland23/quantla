var Fundamentals = require("./app/checkFundamentals");
var Prices = require("./app/checkPrices");
var News = require("./app/checkNews");
const fs = require("fs");

require("./controller/controller.js")();
require("./app/tools.js")();

// apikey = grabmykey();
// console.log("\033[2J");

// Run the analysis for all BTC data sets immediately, and then every 30,000ms (5min)
runAnalysis();
setInterval(runAnalysis, 300000);

function runAnalysis() {
  //This will be the date time used to link the different data sets Unix epoch format
  var datetime = Math.floor(new Date() / 1000);

  console.log("Quantla being run at: ", datetime);

  // // Run analysis on BTC news. Store results to MySQL DB
  var news = new News(datetime);
  var getNews = news.checkNews.then(function(result) {
    //Write to DB
    console.log("check news results: ", result);
    addNewsToDB(result);
    return result;
  });

  //Run analysis on BTC price data. Store results to MySQL DB
  var prices = new Prices(datetime);
  var getPrices = prices.checkPrices.then(function(result) {
    console.log("check prices results: ", result);
    addPricesToDB(result);
    return result;
  });

  // Run analysis on fundamentals data. Store results to MySQL DB
  var fundamentals = new Fundamentals(datetime);
  var getFundamentals = fundamentals.checkFundamentals.then(function(result) {
    console.log("check fundamentals results: ", result);
    addFundamentalsToDB(result);
    return result;
  });

  var functs = [getPrices, getFundamentals, getNews];
  Promise.all(functs).then(function(values) {
    //console.log(values);
    //writeToFile(values);
  });
}

function writeToFile(APIdata) {
  fs.readFile("./public/assets/data.json", function(err, fileData) {
    var json = JSON.parse(fileData);
    json.push(APIdata);
    var jsonContent = JSON.stringify(json);
    fs.writeFile("./public/assets/data.json", jsonContent, err => {
      if (err) throw err;
      console.log("data written to file");
    });
  });
}
