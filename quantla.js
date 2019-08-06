var inquirer = require("inquirer");
// Required for side-effects
require("firebase/firestore");
var firebase = require("firebase");
var Fundamentals = require("./app/checkFundamentals");
var Prices = require("./app/checkPrices");
var News = require("./app/checkNews");

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

// Run the analysis for all BTC data sets immediately, and then every 30,000ms (5min)
runAnalysis();
setInterval(runAnalysis, 300000);

//Get the date in the format dd-mm-yyyy hh:mm:ss
function getDateTime() {
  var currentdate = new Date();

  var hours = currentdate.getHours();
  if (hours < 10) hours = "0" + hours;

  var minutes = currentdate.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  var seconds = currentdate.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;

  var day = currentdate.getDate();
  if (day < 10) day = "0" + day;

  var month = currentdate.getMonth() + 1;
  if (month < 10) month = "0" + month;

  var datetime =
    day +
    "-" +
    month +
    "-" +
    currentdate.getFullYear() +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return datetime.toString();
}

function runAnalysis() {
  //This will be the date time used to link the different data sets
  var datetime = getDateTime();

  console.log("Analysis being run at: ", datetime);

  //Run analysis on BTC news. Store results to firestore DB
  // var news = new News();
  // news.checkNews.then(
  //   function(result) {
  //     db.collection("news")
  //       .doc(datetime)
  //       .set({
  //         dateCreated: result.dateCreated,
  //         articles: result.articles
  //       });
  //     console.log("News data has been added to the database");
  //   },
  //   function(err) {
  //     console.log(err);
  //   }
  // );

  //Run analysis on BTC price data. Store results to firestore DB
  var prices = new Prices();
  prices.checkPrices.then(
    function(result) {
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

  //Run analysis on fundamentals data. Store results to firestore DB
  // var fundamentals = new Fundamentals();
  // fundamentals.checkFundamentals.then(
  //   function(result) {
  //     console.log("Check fundamentals results: ", result);
  //     db.collection("fundamentals")
  //       .doc(datetime)
  //       .set(result);
  //     console.log("Fundamentals added to the database");
  //   },
  //   function(err) {
  //     console.log(err);
  //   }
  // );
}
