var boxFormatter = function(cell, formatterParams, onRendered) {
  onRendered(function() {
    //instantiate sparkline after the cell element has been aded to the DOM
    $(cell.getElement()).sparkline(cell.getValue(), {
      width: "190%",
      type: "box",
      disableTooltips: true
    });
  });
};

var lineFormatter = function(cell, formatterParams, onRendered) {
  onRendered(function() {
    //instantiate sparkline after the cell element has been aded to the DOM
    $(cell.getElement()).sparkline(cell.getValue(), {
      width: "190%",
      type: "line",
      disableTooltips: true
    });
  });
};

PricesConfigData = [
  { title: "time", field: "time", align: "center", width: 130 },
  {
    title: "Current Price (Ask)",
    field: "currPrice",
    align: "center",
    minWidth: 150
  },
  {
    title: "Bid x Ask Spread",
    field: "Spread",
    align: "center",
    minWidth: 150
  },
  {
    title: "10min Price var",
    field: "10PriceVar",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  },
  { title: "Volume", field: "volume", align: "center", minWidth: 150 }
];

FundConfigData = [
  { title: "time", field: "time", align: "center", width: 130 },
  { title: "Hash Rate", field: "hash", align: "center" },
  {
    title: "Hash Rate var",
    field: "hashVar",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  },
  { title: "Transactions", field: "trans", align: "center", minWidth: 150 },
  {
    title: "Transactions var",
    field: "transVar",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  },
  { title: "C/T", field: "costT", align: "center", minWidth: 150 },
  {
    title: "C/T var",
    field: "costTVar",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  }
];

NewsConfigData = [
  { title: "time", field: "time", align: "center", width: 130 },
  {
    title: "Twitter Feed",
    field: "link",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      return "<a href='https://twitter.com/hashtag/bitcoin?f=tweets&vertical=news'>#bitcoin</a>";
      // "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
    }
  },
  {
    title: "Overall Sentiment",
    field: "doc-score",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  },
  {
    title: "'Bitcoin' Sentiment",
    field: "bitcoin-score",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  },
  {
    title: "'BTC' Sentiment",
    field: "btc-score",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      }
    }
  }
  // { title: "Box Plot", field: "box", width: 160, formatter: boxFormatter }
];

DecisionsConfigData = [
  { title: "time", field: "time", align: "center", width: 130 },
  {
    title: "current price",
    field: "currprice",
    align: "center",
    minWidth: 150
  },
  {
    title: "Its time to",
    field: "indication",
    align: "center",
    minWidth: 150,
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value === "Buy") {
        return (
          "<span style='color:#13f113; font-weight:bold'>" + value + "</span>"
        );
      } else if (value === "Hold") {
        return (
          "<span style='color:yellow; font-weight:bold'>" + value + "</span>"
        );
      } else if (value === "Sell") {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      }
    }
  },
  { title: "Buy if Price", field: "BPrice", align: "center", minWidth: 150 },
  { title: "Sell if Price", field: "SPrice", align: "center", minWidth: 150 }
  // {
  //   title: "P/L",
  //   field: "pnl",
  //   align: "center",
  //   formatter: function(cell, formatterParams) {
  //     var value = cell.getValue();
  //     if (value * 1 < 0) {
  //       return (
  //         "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
  //       );
  //     } else if (value * 1 >= 0) {
  //       return (
  //         "<span style='color:#13f113; font-weight:bold'>" +
  //         "+" +
  //         value +
  //         "</span>"
  //       );
  //     } else {
  //       return (
  //         "<span style='color:#FFFF00; font-weight:bold'>" +
  //         "open order" +
  //         "</span>"
  //       );
  //     }
  //   }
  // }
];
