TradeData = [
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" },
  { time: "1", currprice: 10000, indication: "Buy", BPrice: 10000, SPrice: 10000, pnl: "open" }
];

var newsTableData = [];
var pricesTableData = [];
var fundamentalsTableData = [];

$.getJSON("/assets/data.json", function (json) {
  //console.log(json); // this will show the info it in firebug console
  json.forEach(function (entry) {
    // console.log(entry[0]);

    pricesTableData.push(buildPriceTable(entry[0]));
    fundamentalsTableData.push(buildFundamentalsTable(entry[1]));
    newsTableData.push(buildNewsTable(entry[2]));
  });

  createTable("#prices-table", orderTable(pricesTableData).slice(0,30), PricesConfigData);
  createTable("#fund-table", orderTable(fundamentalsTableData).slice(0,30), FundConfigData);
  createTable("#news-table", orderTable(newsTableData).slice(0,30), NewsConfigData);
});

function orderTable(data) {
  var ordered = [];
  for (i = 0; i < data.length; i++) {
    ordered[i] = data[data.length - i];
  }
  return ordered
}

function buildPriceTable(price) {
  // console.log(price);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(price.dateCreated));
  var pricesTableRow = {
    time: d,
    currPrice: price.currentPriceAsks,
    Spread: price.currentPriceAsks - price.currentPriceBids,
    "10PriceVar": price.tenMinPriceVariation * 1,
    volume: price.currentVolume
  };


  return pricesTableRow;
}

function buildFundamentalsTable(fundamental) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(fundamental.dateCreated));

  var fundamentalsTableRow = {
    time: d,
    hash: fundamental.hashRate,
    hashVar: fundamental.hashrateVariation,
    trans: fundamental.transactionFee,
    transVar: fundamental.transactionFeeVariation,
    costT: fundamental.costPerTransaction,
    costTVar: fundamental.costPerTransactionVariation
  };
  return fundamentalsTableRow;
}

function buildNewsTable(news) {
  // console.log(news);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(news.articles[0].dateCreated));
  var article = news.articles[0];

  var newsTableRow = {
    time: d,
    "news title": article.title,
    link: article.url,
    "score-link": article.score
  };
  return newsTableRow;
}

// $.get("api/news", function(data) {
//   var newsTableData = [];
//   var articles = data[0].articles;

//   articles.forEach(function(article) {
//     var newsTableRow = {
//       time: article.date,
//       "news title": article.title,
//       link: article.url,
//       "score-link": article.score
//     };
//     newsTableData.push(newsTableRow);
//   });
//   createTable("#news-table", newsTableData, NewsConfigData);
// });

// $.get("api/prices", function(data) {
//   var pricesTableData = [];
//   var prices = data;

//   prices.forEach(function(price) {
//     console.log(price.currentPrice);
//     var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//     d.setUTCSeconds(parseInt(price.timestamp));

//     var pricesTableRow = {
//       time: d,
//       currPrice: price.currentPrice,
//       PriceVar: "~",
//       "10PriceVar": price.tenMinPriceVariation
//     };
//     pricesTableData.push(pricesTableRow);
//   });
//   createTable("#prices-table", pricesTableData, PricesConfigData);
// });

// $.get("api/fundamentals", function(data) {
//   var fundamentalsTableData = [];
//   var fundamentals = data;

//   fundamentals.forEach(function(fundamental) {
//     var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//     d.setUTCSeconds(parseInt(fundamental.timestamp));

//     var fundamentalsTableRow = {
//       time: d,
//       hash: fundamental.hashrate,
//       hashVar: fundamental.hashrateVariation,
//       trans: fundamental.transactionFee,
//       transVar: fundamental.transactionFeeVariation,
//       costT: fundamental.costPerTransaction,
//       costTVar: fundamental.costPerTransactionVariation
//     };
//     fundamentalsTableData.push(fundamentalsTableRow);
//   });
//   createTable("#fund-table", fundamentalsTableData, FundConfigData);
// });

function createTable(tableName, tableData, configData) {
  var table = new Tabulator(tableName, {
    height: 0,
    tooltips: true,
    responsiveLayout: "hide",
    movableRows: false,
    resizableColumns: false,
    persistentSort: false,
    layout: "fitColumns",
    columns: configData
  });

  table.setData(tableData);
}

//generate box plot

createTable("#trade-table", TradeData, TradeConfigData);
