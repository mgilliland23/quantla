// npm install @tensorflow/tfjs
var tf = require('@tensorflow/tfjs');
var firebase = require("firebase");
var admin = require("firebase-admin");
var atob = require('atob');

var firebaseConfig = {
    apiKey: atob("QUl6YVN5QXhFVnMzQVVVLTNWVmhWX0tQdmVkSmw0U2pDdC1XVkFJ"),
    authDomain: atob("cXVhbnRsYS5maXJlYmFzZWFwcC5jb20="),
    databaseURL: atob("aHR0cHM6Ly9xdWFudGxhLmZpcmViYXNlaW8uY29t"),
    projectId: "quantla",
    storageBucket: atob("cXVhbnRsYS5hcHBzcG90LmNvbQ=="),
    messagingSenderId: atob("NzAyNjA0ODczMTU5"),
    appId: atob("MTo3MDI2MDQ4NzMxNTk6d2ViOmI3MzgwNzgyNTZjNzYxYjU=")
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// console.log(db.collection('prices').get());

var pricesdata = [];

// db.collection('prices').limit(288).get().then(function (snapshot) {
//     snapshot.docs.forEach(function (doc) {
//         pricesdata = doc.data();

//         console.log(pricesdata.length);
//     })
// });




// var ref = database.collection('prices');

// console.log(ref);

// firebase.getCollections().then(collections => {
//     for (let collection of collections) {
//         console.log(`Found collection with id: ${collection.id}`);
//     }
// });





// var xdata = [];
// var ydata = [];

// let model;

// // dummy data... I'm just constructing xdata and ydata random here.. xdata is the inputs and ydata is Buy/Sell/Hold
// for (i = 0; i < 144; i++) {

//     xdata[i] = [
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random()
//     ];

//     randstate = Math.floor(Math.random() * (1 - (-1) + 1)) + (-1);

//     if (randstate === -1) {
//         ydata[i] = 0; //Sell
//     } else if (randstate === 0) {
//         ydata[i] = 1; //Hold
//     }
//     else {
//         ydata[i] = 2; //Buy
//     };

// };
// // dummy data end

// labelsTensor = tf.tensor1d(ydata, 'int32');
// // console.log(labelsTensor.print());

// xs = tf.tensor2d(xdata);
// // oneHot only works with numbers... need to convert text to num in our case Sell==0 ; Hold == 1; Buy == 2
// ys = tf.oneHot(labelsTensor, 3);

// labelsTensor.dispose();

// // console.log(xs.shape);
// // console.log(ys.shape);

// // console.log(xs.print());
// // console.log(ys.print());

// // setting up the model... input >> hidden >> output
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