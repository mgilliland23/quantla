var inquirer = require("inquirer");
// Required for side-effects
require("firebase/firestore");
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

inquirer
  .prompt([
    {
      type: "list",
      name: "selection",
      message: "What do you want to do?",
      choices: ["Check News", "Check Prices", "Check Fundamentals"]
    },
    {
      when: function(response) {
        if (response.selection == "Check Fundamentals") return true;
      },
      type: "list",
      name: "runPrice",
      message: "What key market fundamentals do you want to check?",
      choices: [
        "US Sector Performance (realtime)",
        "Blockchain data",
        "Mining data",
        "Pool data - who owns bitcoin!"
      ]
    }
  ])
  .then(answers => {
    switch (answers.selection) {
      case "Check News":
        var news = new News();

        news.checkNews.then(
          function(result) {
            // "Stuff worked!", now process each article obj
            result.forEach(function(newsData) {
              db.collection("news")
                .doc(newsData.date)
                .set(newsData);
              console.log("Article Data has been added to the database");
            });
          },
          function(err) {
            console.log(err); // Error: "It broke"
          }
        );

        break;

      case "Check Prices":
        var prices = new Prices();
        prices.checkPrices.then(function(result) {
          console.log(result);

          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          var mins;
          if (today.getMinutes() < 10) mins = "0" + today.getMinutes();
          else mins = today.getMinutes();

          var time = today.getHours() + ":" + mins + ":" + today.getSeconds();
          var dateTime = date + " " + time;

          db.collection("prices")
            .doc(dateTime)
            .set(result);
          console.log("Prices Data has been added to the database");
        });
        break;

      case "Check Fundamentals":
        var fundamentals = new Fundamentals();
        fundamentals.checkFundamentals(answers.runPrice);
        break;

      default:
        text = "I don't even know how you got here! That is definetly a bug...";
    }
  });
//
