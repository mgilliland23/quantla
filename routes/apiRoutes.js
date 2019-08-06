var mysqlDB = require("../models");
require("firebase/firestore");
var atob = require('atob');

var admin = require("firebase-admin");

admin.initializeApp({
  apiKey: atob("QUl6YVN5QXhFVnMzQVVVLTNWVmhWX0tQdmVkSmw0U2pDdC1XVkFJ"),
  authDomain: atob("cXVhbnRsYS5maXJlYmFzZWFwcC5jb20="),
  databaseURL: atob("aHR0cHM6Ly9xdWFudGxhLmZpcmViYXNlaW8uY29t"),
  projectId: "quantla",
  storageBucket: atob("cXVhbnRsYS5hcHBzcG90LmNvbQ=="),
  messagingSenderId: atob("NzAyNjA0ODczMTU5"),
  appId: atob("MTo3MDI2MDQ4NzMxNTk6d2ViOmI3MzgwNzgyNTZjNzYxYjU=")
});

let firestore = admin.firestore();

module.exports = function (app) {
  // Get news articles
  app.get("/api/news", function (req, res) {
    let newsRef = firestore
      .collection("news")
      .orderBy("dateCreated")
      .limit(2);
    var newsObjs = [];

    let query = newsRef
      .get()
      .then(snapshot => {
        //Iterate through each document in the News collection returned from firestore
        snapshot.forEach(documentSnapshot => {
          if (documentSnapshot.exists) {
            //This is the document id, which is the timestamp we used to link the collections
            console.log(documentSnapshot.id);
            //Get the data (articles and their analysis) from the snapshot
            console.log(documentSnapshot.data().articles);
            var newsData = documentSnapshot.data();
            var articles = newsData.articles;

            var newsObj = {
              timestamp: documentSnapshot.id,
              articles: articles
            };

            newsObjs.push(newsObj);
          } else {
            console.log(`Found missing document: ${documentSnapshot.id}`);
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(function () {
        res.json(newsObjs);
      });
  });

  app.get("/api/prices", function (req, res) {
    let pricesRef = firestore
      .collection("prices")
      .orderBy("dateCreated", "desc")
      .limit(10);
    var pricesObjs = [];

    let query = pricesRef
      .get()
      .then(snapshot => {
        //Iterate through each document in the prices collection returned from firestore
        snapshot.forEach(documentSnapshot => {
          if (documentSnapshot.exists) {
            //This is the document id, which is the timestamp we used to link the collections
            console.log(documentSnapshot.id);
            //Get the prices data from the snapshot
            var pricesData = documentSnapshot.data();

            var pricesObj = {
              timestamp: documentSnapshot.id,
              currentPrice: pricesData.currentPriceAsks,
              currentVolume: pricesData.currentVolume,
              previousPrice: pricesData.previousPrice,
              tenMinPriceVariation: pricesData.tenMinPriceVariation
            };

            console.log(pricesObj);

            pricesObjs.push(pricesObj);
          } else {
            console.log(`Found missing document: ${documentSnapshot.id}`);
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(function () {
        res.json(pricesObjs);
      });
  });

  app.get("/api/fundamentals", function (req, res) {
    let fundamentalsRef = firestore
      .collection("fundamentals")
      .orderBy("dateCreated", "desc")
      .limit(10);
    var fundamentalsObjs = [];

    let query = fundamentalsRef
      .get()
      .then(snapshot => {
        //Iterate through each document in the fundamentals collection returned from firestore
        snapshot.forEach(documentSnapshot => {
          if (documentSnapshot.exists) {
            //This is the document id, which is the timestamp we used to link the collections
            console.log(documentSnapshot.id);
            //Get the data (fundamentals and their analysis) from the snapshot
            var fundamentalsData = documentSnapshot.data();

            var fundamentalsObj = {
              timestamp: documentSnapshot.id,
              costPerTransaction: fundamentalsData.costPerTransaction,
              costPerTransactionVariation:
                fundamentalsData.costPerTransactionVariation,
              hashrate: fundamentalsData.hashRate,
              hashrateVariation: fundamentalsData.hashrateVariation,
              transactionFee: fundamentalsData.transactionFee,
              transactionFeeVariation: fundamentalsData.transactionFeeVariation
            };
            console.log(fundamentalsObj);
            fundamentalsObjs.push(fundamentalsObj);
          } else {
            console.log(`Found missing document: ${documentSnapshot.id}`);
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(function () {
        res.json(fundamentalsObjs);
      });
  });

  // Check for invite key in the database
  app.post("/api/inviteKeys", function (req, res) {
    console.log("key from front end", req.body.inviteString);
    mysqlDB.Invite.findAll({
      where: { inviteString: req.body.inviteString }
    }).then(function (dbResponse) {
      console.log(dbResponse);
      res.json(dbResponse);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    // db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });
};
