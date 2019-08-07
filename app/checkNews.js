var colors = require("colors");
var convert = require("xml-js");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");

var News = function(datetime) {
  //this is an async function that grabs news articles and then analyzes them
  //We use Google News API to grab the news articles
  //And IBM Watson is used to analyze the articles and determine if they are (+) or (-) from -1 -> 1
  this.checkNews = new Promise(function(resolve, reject) {
    var newsArr = [];
    var queryURL =
      "https://news.google.com/rss/search?q=" +
      "BTC Bitcoin news when:1h" +
      "+ &hl=en-US&gl=US&ceid=US:en";

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: "2019-07-12"
    });

    const analyzeParams = {
      url: "https://twitter.com/hashtag/bitcoin?f=tweets&vertical=news",
      features: {
        sentiment: {
          targets: ["bitcoin", "BTC"]
        }
      }
    };

    naturalLanguageUnderstanding
      .analyze(analyzeParams)
      .then(analysisResults => {
        console.log(analysisResults.sentiment.targets);
        var sentimentAnalysis = analysisResults.sentiment.targets;
        var bitcoin = sentimentAnalysis[0];
        var BTC = sentimentAnalysis[1];
        console.log(analysisResults.sentiment.document);

        var newsObj = {
          dateCreated: datetime,
          btcScore: BTC.score,
          bitcoinScore: bitcoin.score,
          documentScore: analysisResults.sentiment.document.score
        };
        resolve(newsObj);
      })
      .catch(err => {
        var newsObj = {
          dateCreated: datetime,
          btcScore: 0,
          bitcoinScore: 0,
          documentScore: 0
        };
        resolve(newsObj);
        console.log("error:", err);
      });
  });
};

module.exports = News;
