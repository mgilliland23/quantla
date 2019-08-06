var inquirer = require("inquirer");
// Required for side-effects
require("firebase/firestore");
var firebase = require("firebase");
var Fundamentals = require("./app/checkFundamentals");
var Prices = require("./app/checkPrices");
var News = require("./app/checkNews");
const fs = require("fs");

require("./app/tools.js")();

apikey = grabmykey();
console.log("\033[2J");

var admin = require("firebase-admin");

var serviceAccount = require("./quantla-firebase-adminsdk-o0jvh-e71456c4b6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quantla.firebaseio.com"
});

let db = admin.firestore();


var stream = fs.createWriteStream("data.json", { flags: "a" });

function writeToFile(APIdata) {
  fs.readFile("data.json", function(err, fileData) {
    var json = JSON.parse(fileData);
    json.push(APIdata);

    var jsonContent = JSON.stringify(json);
    fs.writeFile("data.json", jsonContent, err => {
      if (err) throw err;
      console.log("data written to file");
    });
  });
}


// Run the analysis for all BTC data sets immediately, and then every 30,000ms (5min)
runAnalysis();
setInterval(runAnalysis, 300000);

function runAnalysis() {
  //This will be the date time used to link the different data sets Unix epoch format
  var datetime = Math.floor(new Date() / 1000).toString();

  console.log("Analysis being run at: ", datetime);


  // // Run analysis on BTC news. Store results to firestore DB
  var news = new News(datetime);
  news.checkNews.then(
    function(result) {
      //Write to local file
      writeToFile(result);
      //Write to DB
      db.collection("news")
        .doc(datetime)
        .set({
          dateCreated: datetime,
          articles: result.articles
        });
      console.log("News data has been added to the database");
    },
    function(err) {
      console.log(err);
    }
  );

  //Run analysis on BTC price data. Store results to firestore DB
  var prices = new Prices(datetime);
  prices.checkPrices.then(
    function(result) {
      //Write to local file
      writeToFile(result);

      console.log("check prices results: ", result);
      db.collection("prices")
        .doc(datetime)
        .set(result);
      console.log("Prices Data has been added to the database: ", datetime);
    },
    function(err) {
      console.log(err);
    }
  );

  // Run analysis on fundamentals data. Store results to firestore DB
  var fundamentals = new Fundamentals();
  fundamentals.checkFundamentals.then(
    function(result) {

      writeToFile(result);
      console.log("Check fundamentals results: ", result);
      db.collection("fundamentals")
        .doc(datetime)
        .set(result);
      console.log("Fundamentals added to the database");
    },
    function(err) {
      console.log(err);
    }
  );
}
