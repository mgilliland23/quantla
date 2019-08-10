grabtabulatordata();
setInterval(function() {
  grabtabulatordata();
  console.log("test");
}, 100000);

function grabtabulatordata() {
  var decisionsTableData = [];
  var newsTableData = [];
  var pricesTableData = [];
  var fundamentalsTableData = [];

  var datetime = { time: Math.floor(new Date() / 1000) };
  var hourprevious = datetime - 3600;

  $.post("api/news", datetime, function(data) {
    //console.log(data);
    data.forEach(function(entry) {
      newsTableData.push(buildNewsTable(entry));
    });
    createTable(
      "#news-table",
      orderTable(newsTableData).slice(0, 30),
      NewsConfigData
    );
  });

  $.post("api/prices", datetime, function(data) {
    console.log("front end prices: ", data);
    data.forEach(function(entry) {
      pricesTableData.push(buildPriceTable(entry));
    });
    createTable(
      "#prices-table",
      orderTable(pricesTableData).slice(0, 30),
      PricesConfigData
    );
  });

  $.post("api/fundamentals", datetime, function(data) {
    console.log("front end fundamentals: ", data);
    data.forEach(function(entry) {
      fundamentalsTableData.push(buildFundamentalsTable(entry));
    });
    createTable(
      "#fund-table",
      orderTable(fundamentalsTableData).slice(0, 30),
      FundConfigData
    );
  });

  $.post("api/decisions", datetime, function(data) {
    console.log("front end decisions: ", data);
    data.forEach(function(entry) {
      decisionsTableData.push(buildDecisionsTable(entry));
    });
    createTable(
      "#trade-table",
      orderTable(decisionsTableData).slice(0, 30),
      DecisionsConfigData
    );
  });

  // $.getJSON("./assets/AIDecision.json", function(json) {
  //   //console.log(json); // this will show the info it in firebug console
  //   json.forEach(function(entry) {
  //     console.log(entry[0]);

  //     tradesTableData.push(buildDecisionTable(entry));
  //   });

  //   createTable(
  //     "#trade-table",
  //     orderTable(tradesTableData).slice(0, 30),
  //     TradeConfigData
  //   );
  // });
}

function orderTable(data) {
  var ordered = [];
  for (i = 0; i < data.length; i++) {
    ordered[i] = data[data.length - 1 - i];
  }
  return ordered;
}

function buildPriceTable(price) {
  // console.log(price);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(price.dateCreated));
  var pricesTableRow = {
    time: d,
    currPrice: price.currentPriceAsks,
    Spread: parseFloat(
      (price.currentPriceAsks - price.currentPriceBids).toFixed(4)
    ),
    "10PriceVar": Math.round(price.tenMinPriceVariation * 10000) / 10000,
    volume: price.currentVolume
  };

  return pricesTableRow;
}

function buildDecisionsTable(AIdata) {
  // console.log(price);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(AIdata.dateCreated * 1));
  var AITableRow = {
    time: d,
    currprice: AIdata.currentPrice,
    indication: AIdata.aiDecision,
    BPrice: AIdata.buyIfPrice,
    SPrice: AIdata.sellIfPrice
  };

  return AITableRow;
}

function buildFundamentalsTable(fundamental) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(fundamental.dateCreated));

  var fundamentalsTableRow = {
    time: d,
    hash: fundamental.hashRate,
    hashVar: Math.round(fundamental.hashrateVariation * 10000) / 10000,
    trans: fundamental.transactionFee,
    transVar: Math.round(fundamental.transactionFeeVariation * 10000) / 10000,
    costT: fundamental.costPerTransaction,
    costTVar:
      Math.round(fundamental.costPerTransactionVariation * 10000) / 10000
  };
  return fundamentalsTableRow;
}

function buildNewsTable(news) {
  // console.log(news);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(news.dateCreated));
  var newsTableRow = {
    time: d,
    "doc-score": news.documentScore,
    "bitcoin-score": news.bitcoinScore,
    "btc-score": news.btcScore
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
