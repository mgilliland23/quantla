TradeData = [
  {time: "1",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: "open"},
  {time: "2",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: "open"},
  {time: "3",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "4",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "5",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "6",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "7",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "8",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "9",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "10",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "11",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "12",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "1",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "2",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "3",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "4",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "5",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "6",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "7",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "8",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "9",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "10",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "11",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: -100},
  {time: "12",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100},
  {time: "13",currprice: 10000,indication: "Buy",BPrice: 10000, SPrice: 10000, pnl: 100}
];

newsData = [
  {
    time: "2",
    "news title": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    link: "google.com",
    "score-link": 1.2
  },

  {
    time: "2",
    "news title": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    link: "google.com",
    "score-link": 1.2
  },
  {
    time: "3",
    "news title":
      "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCC",
    link: "google.com",
    "score-link": -0.75
  }
];

function createTable(tableName, tableData, configData) {
  var table = new Tabulator(tableName, {
    height:0,
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
createTable("#news-table", newsData, NewsConfigData);
createTable("#prices-table", newsData, PricesConfigData);
createTable("#fund-table", newsData, FundConfigData);
