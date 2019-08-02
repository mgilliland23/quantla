
$(document).ready(function () {

    var boxFormatter = function (cell, formatterParams, onRendered) {
        onRendered(function () { //instantiate sparkline after the cell element has been aded to the DOM
            $(cell.getElement()).sparkline(cell.getValue(), { width: "100%", type: "box", disableTooltips: true });
        });
    };

    tabledata = [
        {
            "time": "1",
            "news title": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "link": "google.com",
            "score-link": 0.5,
            box: [1, 20, 5, 3, 10, 13, 17, 15, 9, 11, 1, 20, 5, 3, 10, 13, 50, 15, 9, 11, 1, 20, 5, 3, 10, 13, 17, 15, 9, 11, 1, 20, 5, 3, 10, 13, 17, 15, 9, 11]
        },
        { "time": "2", "news title": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "link": "google.com", "score-link": 1.2 },
        { "time": "3", "news title": "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCC", "link": "google.com", "score-link": -0.75 }
    ];

    //generate box plot
    var boxFormatter = function (cell, formatterParams, onRendered) {
        onRendered(function () { //instantiate sparkline after the cell element has been aded to the DOM
            $(cell.getElement()).sparkline(cell.getValue(), { width: "100%", type: "box", disableTooltips: true });
        });
    };

    var table = new Tabulator("#example-table", {
        tooltips: true,
        responsiveLayout: "hide",
        movableRows: false,
        resizableColumns: false,
        persistentSort: false,
        layout: "fitColumns",
        columns: [
            { title: "time", field: "time", align: "center" },
            { title: "news title", field: "news title", align: "center" },
            { title: "link", field: "link", align: "center" },
            {
                title: "score-link", field: "score-link", align: "center", formatter: function (cell, formatterParams) {
                    var value = cell.getValue();
                    if (value < 0) {
                        return "<span style='color:#fa4e4e; font-weight:bold'>" + value + "</span>";
                    } else {
                        return "<span style='color:#13f113; font-weight:bold'>" + "+" + value + "</span>";
                    }
                }
            },
            { title: "Box Plot", field: "box", width: 160, formatter: boxFormatter },

        ],
    });

    table.setData(tabledata);

});