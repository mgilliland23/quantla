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
  { title: "time", field: "time", align: "center" },
  { title: "current price", field: "current price", align: "center" },
  { title: "price variation", field: "price variation", align: "center" },
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
  },
  { title: "Box Plot", field: "box", width: 160, formatter: lineFormatter }
];

FundConfigData = [
  { title: "time", field: "time", align: "center" },
  { title: "news title", field: "news title", align: "center" },
  { title: "link", field: "link", align: "center" },
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
  },
  { title: "Box Plot", field: "box", width: 160, formatter: boxFormatter }
];

NewsConfigData = [
  { title: "time", field: "time", align: "center" },
  { title: "news title", field: "news title", align: "center" },
  { title: "link", field: "link", align: "center" },
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
