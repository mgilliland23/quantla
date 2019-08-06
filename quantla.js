var inquirer = require("inquirer");
// Required for side-effects
require("firebase/firestore");
var firebase = require("firebase");
var Fundamentals = require("./app/checkFundamentals");
var Prices = require("./app/checkPrices");
var News = require("./app/checkNews");
const fs = require("fs");
const atob = require("atob");

require("./app/tools.js")();

apikey = grabmykey();
console.log("\033[2J");

var admin = require("firebase-admin");

// var serviceAccount = require("./quantla-firebase-adminsdk-o0jvh-e71456c4b6.json");

var serviceAccount = {
  "type": "service_account",
  "project_id": "quantla",
  "private_key_id": "e71456c4b68574e10a16b94b3ee97eb5497e29f1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfGe8QcEYzq4ng\nu2f7yU7E/sm+8MERV5YZD43+s048HNdeJRUrMV0SLtQMfKZif4OvWcOymloPYSbK\nGF3kaaqIfnpADZmEWXurFNQV0UZi++BKDL16UwLqH8MYZGuDlI8XtiLjoBKP9H+W\n+YwN9gVNay3skeWPEOwpgfsCvksshg3Q02tkfwwdJbaNUK5w5+ETOkiR51a/JYr1\nS0Mw4lukGHPdElP7XxVT25NQx6tAB5sYBQkxQpUEg5r6Fadh0iw6kw6QLIpI2fb0\nxZjUGO+7pExu2gv61wJId9YPreRq4L2k0/kq/pZIvCpbWJXh970CBsgBnNNAYNTE\n0iDlH4dlAgMBAAECggEACM5KfhTcZH41ETp8ancB5asj1eZFTJSvLzqKsX6szBkc\nVBI1IXEPmh/gjUSfQZyEW1e47nQCsYA1an0nOZSFH2GUnDIdONjaVYCbNWg+9bm4\n2tthYDJmF00dI3mVN8qVkktFWcQv72AoaBJd+ZAYGfvswl1o2OqDU8kWWf+eUnm+\nKpgJmZV15+972S7wwJtjy79T6y3YqXeAM117R8825sKS19gd1TGZ3t2kJk1w10Tm\nH2s6HdiFFv7m3oprPgxKC8fJCT501M9Qzx5Opz5hjGHAA3kUZvy/9JigyOx3zv7b\neowYO0TNMcUlVHJ1JOWsqS7mcRYKonW5WYUBhNt0uQKBgQD+9ifWKHOxrzcO7U/s\nzePLrabKKVN54Z5U+JoFrvghOYiMy9S9VA4JHHNkINYi5tVuxr9EZNH3ZEYo7qfM\n7F971tTKv5q+w2wy3lxBz0L1n+4bicML+reyDbsM7dguN0ZYjpsqOSFFUUHdjYo8\nyJL61AHeP+3o0sw738gdEyG4DQKBgQDgAo7dGLUhVh37W7zF7+X7mkNjozagvMEd\nNZq8YLAKRZnQUDYsW7aUkej8pWHek4/njeEXmeEryfR4tK6GN6QDo0VyGmYYGC4+\nKyIhvta9ZDML+7gUTnz9glsRkfApgByvnhhFP01TFl7zZ19l9FL2sfvxv9qjBiZ9\n5wILWvAeuQKBgQCuRJwoAlBJ5ARTHJvjtTr9jb0SMzsOdMtfMuk790M8mnGeIvhP\nTHOngJ3Sk6sqAfNim1BCtFLbsNtPwQhKxknhgI7D4kEoILUE8/3FMaCH+P+sLPZ3\narBCcKYoiS2ZMUjQ4PBn5NK76XWGtOcG8uWbsmtweOvplqPoTOYgEWKbxQKBgD6F\n+EIVx1iKpMuni0Tj9JkJMY353CF5DZ2NfKbfhcMYMhpGiRhQcOF+6Dy8HFj3bs7+\ndrkTphmGwMmABMZJeWnahGOYoq5O8XlAqMIqdd1evjC2DWb9kT1gyPJafWHX9CnA\nQp3xUS/DqrTdQW8/hnh8rQmItwmRieTSOWvZ8fNhAoGBAL1AZPElW5AFkUwNxaML\nIRgyI8WPXFQZ4IFOAPOyy1gy6nIV0Z/AoeiLVOsHrAaK67sRNXlqtLvuZGS7u/lJ\n2Kuxfc+miT9yltxMX198Hiq14txe2Pi+fIBHURerHUuOHjmYvvvp7H+pZQfwqNgu\nlXsXfmkW4wXjCkA5/uZiyaQn\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-o0jvh@quantla.iam.gserviceaccount.com",
  "client_id": "115971399577433796244",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o0jvh%40quantla.iam.gserviceaccount.com"
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quantla.firebaseio.com"
});

let db = admin.firestore();

// Run the analysis for all BTC data sets immediately, and then every 30,000ms (5min)
runAnalysis();
setInterval(runAnalysis, 300000);

function runAnalysis() {
  //This will be the date time used to link the different data sets Unix epoch format
  var datetime = Math.floor(new Date() / 1000).toString();

  console.log("Analysis being run at: ", datetime);

  // // Run analysis on BTC news. Store results to firestore DB
  var news = new News(datetime);
  var getNews = news.checkNews.then(
    function (result) {
      //Write to DB
      db.collection("news")
        .doc(datetime)
        .set({
          dateCreated: datetime,
          articles: result.articles
        });
      console.log("News data has been added to the database");
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  //Run analysis on BTC price data. Store results to firestore DB
  var prices = new Prices(datetime);
  var getPrices = prices.checkPrices.then(
    function (result) {
      console.log("check prices results: ", result);
      db.collection("prices")
        .doc(datetime)
        .set(result);
      console.log("Prices Data has been added to the database: ", datetime);
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  // Run analysis on fundamentals data. Store results to firestore DB
  var fundamentals = new Fundamentals(datetime);
  var getFundamentals = fundamentals.checkFundamentals.then(
    function (result) {
      console.log("Check fundamentals results: ", result);
      db.collection("fundamentals")
        .doc(datetime)
        .set(result);
      console.log("Fundamentals added to the database");
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  var functs = [getPrices, getFundamentals, getNews];
  Promise.all(functs).then(function (values) {
    console.log(values);
    writeToFile(values);
  });
}

function writeToFile(APIdata) {
  fs.readFile("./public/assets/data.json", function (err, fileData) {
    var json = JSON.parse(fileData);
    json.push(APIdata);
    var jsonContent = JSON.stringify(json);
    fs.writeFile("./public/asset/sdata.json", jsonContent, err => {
      if (err) throw err;
      console.log("data written to file");
    });
  });
}
