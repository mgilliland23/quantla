$(document).ready(function () {


    var myList = [
        {
            "time": "1",
            "news title": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "link": "google.com",
            "score-link": 0.5
        },
        { "time": "2", "news title": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "link": "google.com", "score-link": 1.2 },
        { "time": "3", "news title": "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC CCCCCCCCC", "link": "google.com", "score-link": -0.75 }
    ];

    // Builds the HTML Table out of myList.
    selector = "#NewsTable";
    buildHtmlTable(selector);

    function buildHtmlTable(selector) {
        var columns = addAllColumnHeaders(myList, selector);

        var group$ = $('<tbody/>');
        for (var i = 0; i < myList.length; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = myList[i][columns[colIndex]];
                if (cellValue == null) cellValue = "";
                newtd$ = $('<td/>');
                $(group$).append(row$.append(newtd$.html(cellValue)));
                $(newtd$).attr('id', 'row' + i + ',col' + colIndex);
            }
            $(selector).append(group$);
        }

    }

    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records.
    function addAllColumnHeaders(myList, selector) {
        var columnSet = [];
        var group$ = $('<thead/>');
        var headerTr$ = $('<tr/>');

        for (var i = 0; i < myList.length; i++) {
            var rowHash = myList[i];
            for (var key in rowHash) {
                if ($.inArray(key, columnSet) == -1) {
                    columnSet.push(key);
                    $(group$).append(headerTr$.append($('<th/>').html(key)));
                }
            }
        }
        $(selector).append(group$);

        return columnSet;
    }

    // $('#NewsTable').DataTable();

});