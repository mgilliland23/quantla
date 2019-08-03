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

createTable("#news-table", newsData, NewsConfigData);
createTable("#prices-table", newsData, PricesConfigData);
createTable("#fund-table", newsData, FundConfigData);
