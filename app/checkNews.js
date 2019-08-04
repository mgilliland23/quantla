var colors = require("colors");
var convert = require("xml-js");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });

var newsArr = [];

var News = function() {
  //this is an async function that grabs news articles and then analyzes them
  //We use Google News API to grab the news articles
  //And IBM Watson is used to analyze the articles and determine if they are (+) or (-) from -1 -> 1
  this.checkNews = new Promise(function(resolve, reject) {
    var queryURL =
      "https://news.google.com/rss/search?q=" +
      "BTC Bitcoin" +
      "+ news&hl=en-US&gl=US&ceid=US:en";

    request(queryURL, { json: true }, function(error, response, body) {
      var results = JSON.parse(
        convert.xml2json(body, { compact: true, spaces: 4 })
      );

      count = 0;
      found_news = 5;

      for (var i = 0; i < found_news; i++) {
        var options = {
          url:
            "https://cors-anywhere.herokuapp.com/https://natural-language-understanding-demo.ng.bluemix.net/api/analyze",
          method: "post",
          contentType: "application/json",
          body: {
            features: {
              concepts: {},
              entities: {},
              keywords: {},
              categories: {},
              emotion: {},
              sentiment: {},
              semantic_roles: {},
              syntax: {
                tokens: { lemma: true, part_of_speech: true },
                sentences: true
              }
            },
            url: results.rss.channel.item[i].link._text
          },
          headers: {
            origin:
              "https://cors-anywhere.herokuapp.com/https://natural-language-understanding-demo.ng.bluemix.net/api/analyze",
            mydate: results.rss.channel.item[i].pubDate._text
          },
          json: true
        };

        request(options, function(err, res, watsondata) {
          if (error) throw error;
          if (watsondata.results != undefined) {
            var newsArticle = {
              url: watsondata.results.retrieved_url,
              score: watsondata.results.sentiment.document.score,
              date: res.request.headers.mydate
            };
            //newsArticle = new NewsArticle(url, date, score);
            newsArr.push(newsArticle);
            count++;

            var newsArticles = { articles: newsArr };
            if (newsArr.length === 5) resolve(newsArticles);
            if (newsArr.length === 0) reject("Error fetching news");
          }
        });
      }
    });
  });
};

module.exports = News;
