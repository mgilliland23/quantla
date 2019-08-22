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

  $.get("api/news", function(data) {
    console.log("front end news:", data);
    data.forEach(function(entry) {
      newsTableData.push(buildNewsTable(entry));
    });
    createTable(
      "#news-table",
      orderTable(newsTableData).slice(0, 30),
      NewsConfigData
    );
  });

  $.get("api/prices", function(data) {
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

  $.get("api/fundamentals", function(data) {
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

  $.get("api/decisions", function(data) {
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
  var dateStr = moment(d, "ddd MMM D YYYY HH:mm:ss").format("h:mm A - MMM DD");

  // Wed Aug 21 2019 18:30:35 GMT-0400 (Eastern Daylight Time)
  var pricesTableRow = {
    time: dateStr,
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
  var dateStr = moment(d, "ddd MMM D YYYY HH:mm:ss").format("h:mm A - MMM DD");
  var AITableRow = {
    time: dateStr,
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
  var dateStr = moment(d, "ddd MMM D YYYY HH:mm:ss").format("h:mm A - MMM DD");
  var fundamentalsTableRow = {
    time: dateStr,
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
  var dateStr = moment(d, "ddd MMM D YYYY HH:mm:ss").format("h:mm A - MMM DD");
  var newsTableRow = {
    time: dateStr,
    "doc-score": news.documentScore,
    "bitcoin-score": news.bitcoinScore,
    "btc-score": news.btcScore
  };
  return newsTableRow;
}

function createTable(tableName, tableData, configData) {
  var table = new Tabulator(tableName, {
    height: 0,
    tooltips: true,
    responsiveLayout: "collapse",
    movableRows: false,
    resizableColumns: false,
    persistentSort: false,
    layout: "fitColumns",
    columns: configData
  });

  table.setData(tableData);
}

//generate box plot
