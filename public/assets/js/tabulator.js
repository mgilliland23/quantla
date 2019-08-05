TradeData = [
  {
    time: "1",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: "open"
  },
  {
    time: "2",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: "open"
  },
  {
    time: "3",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "4",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "5",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "6",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "7",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "8",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "9",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "10",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "11",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "12",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "1",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "2",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "3",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "4",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "5",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "6",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "7",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "8",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "9",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "10",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "11",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: -100
  },
  {
    time: "12",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  },
  {
    time: "13",
    currprice: 10000,
    indication: "Buy",
    BPrice: 10000,
    SPrice: 10000,
    pnl: 100
  }
];

// {
//   time: "2",
//   "news title": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
//   link: "google.com",
//   "score-link": 1.2
// }

$.get("api/news", function(data) {
  var newsTableData = [];
  var articles = data[0].articles;

  articles.forEach(function(article) {
    var newsTableRow = {
      time: article.date,
      "news title": "article.title",
      link: article.url,
      "score-link": article.score
    };
    newsTableData.push(newsTableRow);
  });
  createTable("#news-table", newsTableData, NewsConfigData);
});

$.get("api/prices", function(data) {
  var pricesTableData = [];
  var prices = data;

  prices.forEach(function(price) {
    var pricesTableRow = {
      time: price.timestamp,
      "current price": price.currentPrice,
      "price variation": price.priceVariation
    };
    pricesTableData.push(pricesTableRow);
  });
  createTable("#prices-table", pricesTableData, PricesConfigData);
});

$.get("api/fundamentals", function(data) {
  var fundamentalsTableData = [];
  var fundamentals = data;

  articles.forEach(function(article) {
    var fundamentalsTableRow = {
      time: article.date,
      "fundamentals title": "article.title",
      link: article.url,
      "score-link": article.score
    };
    fundamentalsTableData.push(fundamentalsTableRow);
  });
  createTable("#fund-table", fundamentalsTableData, FundConfigData);
});

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
