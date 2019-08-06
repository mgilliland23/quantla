var boxFormatter = function(cell, formatterParams, onRendered) {
  onRendered(function() {
    //instantiate sparkline after the cell element has been aded to the DOM
    $(cell.getElement()).sparkline(cell.getValue(), {
      width: "100%",
      type: "box",
      disableTooltips: true
    });
  });
};

var lineFormatter = function(cell, formatterParams, onRendered) {
  onRendered(function() {
    //instantiate sparkline after the cell element has been aded to the DOM
    $(cell.getElement()).sparkline(cell.getValue(), {
      width: "100%",
      type: "line",
      disableTooltips: true
    });
  });
};

PricesConfigData = [
  { title: "time", field: "time", align: "center", width: 190 },
  { title: "Current Price", field: "currPrice", align: "center" },
  {
    title: "Price var",
    field: "PriceVar",
    align: "center",
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
    title: "10min Price var",
    field: "10PriceVar",
    align: "center",
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
    title: "Price Trend",
    field: "linePlot",
    width: 160,
    formatter: lineFormatter
  }
];

FundConfigData = [
  { title: "time", field: "time", align: "center" },
  { title: "Hash Rate", field: "hash", align: "center" },
  {
    title: "Hash Rate var",
    field: "hashVar",
    align: "center",
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
  { title: "Transactions", field: "trans", align: "center" },
  {
    title: "Transactions var",
    field: "transVar",
    align: "center",
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
  { title: "C/T", field: "costT", align: "center" },
  {
    title: "C/T var",
    field: "costTVar",
    align: "center",
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
  { title: "time", field: "time", align: "center" },
  { title: "news title", field: "news title", align: "center" },
  {
    title: "link",
    field: "link",
    align: "center",
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      return (
        "<a href=" + value + ">News Link</a>"
        // "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
      );
    }
  },
  {
    title: "score-link",
    field: "score-link",
    align: "center",
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

TradeConfigData = [
  { title: "time", field: "time", align: "center" },
  { title: "current price", field: "currprice", align: "center" },
  { title: "Its time to", field: "indication", align: "center" },
  { title: "Buy if Price", field: "BPrice", align: "center" },
  { title: "Sell if Price", field: "SPrice", align: "center" },
  {
    title: "P/L",
    field: "pnl",
    align: "center",
    formatter: function(cell, formatterParams) {
      var value = cell.getValue();
      if (value * 1 < 0) {
        return (
          "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>"
        );
      } else if (value * 1 >= 0) {
        return (
          "<span style='color:#13f113; font-weight:bold'>" +
          "+" +
          value +
          "</span>"
        );
      } else {
        return (
          "<span style='color:yellow; font-weight:bold'>" +
          "open order" +
          "</span>"
        );
      }
    }
  }
];
