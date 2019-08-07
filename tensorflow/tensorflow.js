// npm install @tensorflow/tfjs
var tf = require('@tensorflow/tfjs');

let jsonData = require('../public/assets/data.json');

var xdata = [];
var ydata = [];
var x0 = [];
var x1 = [];
var x2 = [];
var x3 = [];
var x4 = [];
var x5 = [];
var x6 = [];
var x7 = [];
var x8 = [];
var x9 = [];
var x10 = [];
var y0 = [];

jsonData.forEach(function (entry) {
    x0.push(entry[2].articles[0].score);
    x1.push(entry[0].currentPriceAsks);
    x2.push(entry[0].currentPriceAsks - entry[0].currentPriceBids);
    x3.push(entry[0].tenMinPriceVariation);
    x4.push(entry[0].currentVolume);
    x5.push(entry[1].hashRate);
    x6.push(entry[1].hashrateVariation);
    x7.push(entry[1].transactionFee);
    x8.push(entry[1].transactionFeeVariation);
    x9.push(entry[1].costPerTransaction);
    x10.push(entry[1].costPerTransactionVariation);
    y0.push(entry[0].tenMinPriceVariation);
});

// console.log(Math.max.apply(Math, x0));
// console.log(Math.min.apply(Math, x0));

var BuySignal = y0.sort()[y0.length - Math.floor((y0.length / 3))];
var SellSignal = y0.sort()[Math.floor((y0.length / 3))];

// console.log(y0.sort());
// console.log(SellSignal);
// console.log(BuySignal);

jsonData.forEach(function (entry) {
    // console.log(entry[0]);
    // xdata.push(entry[1]);
    // xdata.push(entry[2].articles[0].score);

    xdata.push(
        [
            (entry[2].articles[0].score - Math.min.apply(Math, x0)) / (Math.max.apply(Math, x0) - Math.min.apply(Math, x0) * 0.99999999999),
            (entry[0].currentPriceAsks - Math.min.apply(Math, x1)) / (Math.max.apply(Math, x1) - Math.min.apply(Math, x1) * 0.99999999999),
            (entry[0].currentPriceAsks - entry[0].currentPriceBids - Math.min.apply(Math, x2)) / (Math.max.apply(Math, x2) - Math.min.apply(Math, x2) * 0.99999999999),
            (entry[0].tenMinPriceVariation - Math.min.apply(Math, x3)) / (Math.max.apply(Math, x3) - Math.min.apply(Math, x3) * 0.99999999999),
            (entry[0].currentVolume - Math.min.apply(Math, x4)) / (Math.max.apply(Math, x4) - Math.min.apply(Math, x4) * 0.99999999999),
            (entry[1].hashRate - Math.min.apply(Math, x5)) / (Math.max.apply(Math, x5) - Math.min.apply(Math, x5) * 0.99999999999),
            (entry[1].hashrateVariation - Math.min.apply(Math, x6)) / (Math.max.apply(Math, x6) - Math.min.apply(Math, x6) * 0.99999999999),
            (entry[1].transactionFee - Math.min.apply(Math, x7)) / (Math.max.apply(Math, x7) - Math.min.apply(Math, x7) * 0.99999999999),
            (entry[1].transactionFeeVariation - Math.min.apply(Math, x8)) / (Math.max.apply(Math, x8) - Math.min.apply(Math, x8) * 0.99999999999),
            (entry[1].costPerTransaction - Math.min.apply(Math, x9)) / (Math.max.apply(Math, x9) - Math.min.apply(Math, x9) * 0.99999999999),
            (entry[1].costPerTransactionVariation - Math.min.apply(Math, x10)) / (Math.max.apply(Math, x10) - Math.min.apply(Math, x10) * 0.99999999999)
        ]
    );

    if (entry[0].tenMinPriceVariation >= BuySignal) {
        ydata.push([1, 0, 0]);
        // ydata.push("Buy");
    }
    else if (entry[0].tenMinPriceVariation <= SellSignal) {
        ydata.push([0, 0, 1]);
        // ydata.push("Sell");
    }
    else {
        ydata.push([0, 1, 0]);
        // ydata.push("Hold");
    }

    // fundamentalsTableData.push(buildFundamentalsTable(entry[1]));
    // newsTableData.push(buildNewsTable(entry[2]));
});


// shift remove beginning
ydata.shift();
ydata.shift();

// pop remove final
xdata.pop();
xdata.pop();

// console.log(xdata[xdata.length-1]);
// console.log(ydata[ydata.length-1]);

let model;

// console.log(labelsTensor.print());

xs = tf.tensor2d(xdata);
ys = tf.tensor2d(ydata);

// labelsTensor.dispose();

console.log(xs.shape);
console.log(ys.shape);

// console.log(xs.print());
// console.log(ys.print());

// setting up the model... input >> hidden >> output
// model = tf.sequential();

// let hidden = tf.layers.dense({
//     units: 16, //number 1st column of hidden layers
//     activation: "sigmoid",
//     inputDim: 4 //data that is comming in...
// });

// let inner = tf.layers.dense({
//     units: 16, //number 1st column of hidden layers
//     activation: "sigmoid",
//     inputDim: 16 //data that is comming in...
// });

// let output = tf.layers.dense({
//     units: 3,     // data that is comming out...
//     activation: "softmax"
// });


// model.add(hidden);
// // model.add(inner);
// model.add(output);


// // we need also an optimizer...
// const learningRate = 0.2;
// const optimization = tf.train.sgd(learningRate);

// // and then we need to compile the model
// model.compile({
//     optimizer: optimization,
//     // loss: 'meanSquaredError'
//     // this is the entropy - measure of messed things
//     loss: 'categoricalCrossentropy'
// })

// // console.log(model);

// const options = {
//     epochs: 1000,
//     // validationSplit: 0.1, // If I want to use only 
//     // shuffle: true, // If I want to use only 
// }



// model.fit(xs, ys, options).then(function (results) {
//     console.dir(results.history.loss, { 'maxArrayLength': null });
// }); 