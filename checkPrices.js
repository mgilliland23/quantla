var fs = require('fs');
var colors = require('colors');
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), { multiArgs: true });

var Prices = function () {
    this.checkPrices = new Promise(function (resolve, reject) {
        interval = '60min';

        choicesobj = {
            'BTC Bitcoin': 'BTCUSD',
            'LTC Litecoin': 'LTCUSD',
            'XRP Ripple': 'XRPUSD',
            'ETH Ethererum': 'ETHUSD',
            'XMR Monero': 'XMRUSD',
            'MAID MaidSafeCoin': 'MAIDUSD',
            'BCH Bitcoin Cash': 'BCHUSD',
            'XEM NEM': 'XEMUSD',
        };

        symbol = 'BTCUSD';


        queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apikey;
        // console.log(queryURL);

        request(queryURL, { json: true }, function (error, response, body) {

            keys = Object.keys(body['Time Series (60min)']);
            // console.log(keys);

            var findata = [];
            for (i = 0; i < keys.length; i++) {

                findata.push(body['Time Series (60min)'][keys[i]]['4. close']);
            }

            var leveldata = [];
            slevel_s = 0;
            blevel_s = 0;
            slevelcount = 0;
            blevelcount = 0;
            for (i = 0; i < findata.length - 6; i++) {
                leveldata[i] = findata[i] / findata[i + 6] - 1;
                if (leveldata[i] >= 0) {
                    slevel_s = slevel_s + leveldata[i];
                    slevelcount++;
                }
                else {
                    blevel_s = blevel_s + leveldata[i];
                    blevelcount++;
                }
            }

            blevel = blevel_s / blevelcount;
            slevel = slevel_s / slevelcount;

            // levels and estimates can be improved in the future using Technical Indicators 
            // https://www.fmlabs.com/reference/

            function checktrend() {
                if (Math.abs(blevel) > Math.abs(slevel)) {
                    return "DOWN"
                }
                else return "UP"
            }



            console.log(colors.inverse(symbol + " trading strategy"));
            console.log(colors.yellow("   " + "Current Price:    " + findata[0]));
            console.log(colors.yellow("   " + "Buy If Price:     " + Math.round(findata[0] * (1 + blevel) * 10000, 0) / 10000));
            console.log(colors.yellow("   " + "Sell If Price:    " + Math.round(findata[0] * (1 + slevel) * 10000, 0) / 10000));
            console.log(colors.yellow("   " + "Max time to hold: " + "6h"));
            console.log(colors.yellow("   " + "Trend:            " + checktrend()));
            console.log("\n");




            console.log(colors.inverse(symbol + " most recent prices"));
            var recentPrices = [];
            for (j = 0; j < 5; j++) {

                if (Math.round((findata[j] * 1 / findata[j + 1] * 1 - 1) * 10000, 0) / 100 >= 0) {
                    console.log("   " + keys[j] + "   " + findata[j] + "    " + colors.green("+" + Math.round((findata[j] * 1 / findata[j + 1] * 1 - 1) * 10000, 0) / 100 + "%"));
                }
                else {
                    console.log("   " + keys[j] + "   " + findata[j] + "    " + colors.red(Math.round((findata[j] * 1 / findata[j + 1] * 1 - 1) * 10000, 0) / 100 + "%"));
                }

                var pricesObj = {
                    date: keys[j],
                    price: findata[j],
                    trend: Math.round((findata[j] * 1 / findata[j + 1] * 1 - 1) * 10000, 0) / 100

                };
                recentPrices.push(pricesObj);

            }
            var priceData = {
                recentPrices: recentPrices,
                currentPrice: findata[0],
                buyIfPrice: Math.round(findata[0] * (1 + blevel) * 10000, 0) / 10000,
                sellIfPrice: Math.round(findata[0] * (1 + slevel) * 10000, 0) / 10000,
                trend: checktrend()
            }
            resolve(priceData);



        });
    });
}

module.exports = Prices;
