var inquirer = require("inquirer");
// Required for side-effects
require("firebase/firestore");
var firebase = require("firebase");
var Fundamentals = require("./app/checkFundamentals");
var Prices = require("./app/checkPrices");
var News = require("./app/checkNews");
const fs = require("fs");
const atob = require("atob");

require("./app/tools.js")();

apikey = grabmykey();
console.log("\033[2J");

var admin = require("firebase-admin");

var serviceAccount = {
  "type": "service_account",
  "project_id": "quantla",
  "private_key_id": atob("ZTcxNDU2YzRiNjg1NzRlMTBhMTZiOTRiM2VlOTdlYjU0OTdlMjlmMQ=="),
  "private_key": atob("LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRRGZHZThRY0VZenE0bmcKdTJmN3lVN0Uvc20rOE1FUlY1WVpENDMrczA0OEhOZGVKUlVyTVYwU0x0UU1mS1ppZjRPdldjT3ltbG9QWVNiSwpHRjNrYWFxSWZucEFEWm1FV1h1ckZOUVYwVVppKytCS0RMMTZVd0xxSDhNWVpHdURsSThYdGlMam9CS1A5SCtXCitZd045Z1ZOYXkzc2tlV1BFT3dwZ2ZzQ3Zrc3NoZzNRMDJ0a2Z3d2RKYmFOVUs1dzUrRVRPa2lSNTFhL0pZcjEKUzBNdzRsdWtHSFBkRWxQN1h4VlQyNU5ReDZ0QUI1c1lCUWt4UXBVRWc1cjZGYWRoMGl3Nmt3NlFMSXBJMmZiMAp4WmpVR08rN3BFeHUyZ3Y2MXdKSWQ5WVByZVJxNEwyazAva3EvcFpJdkNwYldKWGg5NzBDQnNnQm5OTkFZTlRFCjBpRGxINGRsQWdNQkFBRUNnZ0VBQ001S2ZoVGNaSDQxRVRwOGFuY0I1YXNqMWVaRlRKU3ZMenFLc1g2c3pCa2MKVkJJMUlYRVBtaC9nalVTZlFaeUVXMWU0N25RQ3NZQTFhbjBuT1pTRkgyR1VuRElkT05qYVZZQ2JOV2crOWJtNAoydHRoWURKbUYwMGRJM21WTjhxVmtrdEZXY1F2NzJBb2FCSmQrWkFZR2Z2c3dsMW8yT3FEVThrV1dmK2VVbm0rCktwZ0ptWlYxNSs5NzJTN3d3SnRqeTc5VDZ5M1lxWGVBTTExN1I4ODI1c0tTMTlnZDFUR1ozdDJrSmsxdzEwVG0KSDJzNkhkaUZGdjdtM29wclBneEtDOGZKQ1Q1MDFNOVF6eDVPcHo1aGpHSEFBM2tVWnZ5LzlKaWd5T3gzenY3Ygplb3dZTzBUTk1jVWxWSEoxSk9Xc3FTN21jUllLb25XNVdZVUJoTnQwdVFLQmdRRCs5aWZXS0hPeHJ6Y083VS9zCnplUExyYWJLS1ZONTRaNVUrSm9GcnZnaE9ZaU15OVM5VkE0SkhITmtJTllpNXRWdXhyOUVaTkgzWkVZbzdxZk0KN0Y5NzF0VEt2NXErdzJ3eTNseEJ6MEwxbis0YmljTUwrcmV5RGJzTTdkZ3VOMFpZanBzcU9TRkZVVUhkallvOAp5Skw2MUFIZVArM28wc3c3MzhnZEV5RzREUUtCZ1FEZ0FvN2RHTFVoVmgzN1c3ekY3K1g3bWtOam96YWd2TUVkCk5acThZTEFLUlpuUVVEWXNXN2FVa2VqOHBXSGVrNC9uamVFWG1lRXJ5ZlI0dEs2R042UURvMFZ5R21ZWUdDNCsKS3lJaHZ0YTlaRE1MKzdnVVRuejlnbHNSa2ZBcGdCeXZuaGhGUDAxVEZsN3paMTlsOUZMMnNmdnh2OXFqQmlaOQo1d0lMV3ZBZXVRS0JnUUN1Ukp3b0FsQko1QVJUSEp2anRUcjlqYjBTTXpzT2RNdGZNdWs3OTBNOG1uR2VJdmhQClRIT25nSjNTazZzcUFmTmltMUJDdEZMYnNOdFB3UWhLeGtuaGdJN0Q0a0VvSUxVRTgvM0ZNYUNIK1Arc0xQWjMKYXJCQ2NLWW9pUzJaTVVqUTRQQm41Tks3NlhXR3RPY0c4dVdic210d2VPdnBscVBvVE9ZZ0VXS2J4UUtCZ0Q2RgorRUlWeDFpS3BNdW5pMFRqOUprSk1ZMzUzQ0Y1RFoyTmZLYmZoY01ZTWhwR2lSaFFjT0YrNkR5OEhGajNiczcrCmRya1RwaG1Hd01tQUJNWkplV25haEdPWW9xNU84WGxBcU1JcWRkMWV2akMyRFdiOWtUMWd5UEphZldIWDlDbkEKUXAzeFVTL0RxclRkUVc4L2huaDhyUW1JdHdtUmllVFNPV3ZaOGZOaEFvR0JBTDFBWlBFbFc1QUZrVXdOeGFNTApJUmd5SThXUFhGUVo0SUZPQVBPeXkxZ3k2bklWMFovQW9laUxWT3NIckFhSzY3c1JOWGxxdEx2dVpHUzd1L2xKCjJLdXhmYyttaVQ5eWx0eE1YMTk4SGlxMTR0eGUyUGkrZklCSFVSZXJIVXVPSGptWXZ2dnA3SCtwWlFmd3FOZ3UKbFhzWGZta1c0d1hqQ2tBNS91Wml5YVFuCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K"),
  "client_email": atob("ZmlyZWJhc2UtYWRtaW5zZGstbzBqdmhAcXVhbnRsYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbQ=="),
  "client_id": atob("MTE1OTcxMzk5NTc3NDMzNzk2MjQ0"),
  "auth_uri": atob("aHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGg="),
  "token_uri": atob("aHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4="),
  "auth_provider_x509_cert_url": atob("aHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRz"),
  "client_x509_cert_url": atob("aHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vcm9ib3QvdjEvbWV0YWRhdGEveDUwOS9maXJlYmFzZS1hZG1pbnNkay1vMGp2aCU0MHF1YW50bGEuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20=")
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quantla.firebaseio.com"
});

let db = admin.firestore();

// Run the analysis for all BTC data sets immediately, and then every 30,000ms (5min)
runAnalysis();
setInterval(runAnalysis, 300000);

function runAnalysis() {
  //This will be the date time used to link the different data sets Unix epoch format
  var datetime = Math.floor(new Date() / 1000).toString();

  console.log("Analysis being run at: ", datetime);

  // // Run analysis on BTC news. Store results to firestore DB
  var news = new News(datetime);
  var getNews = news.checkNews.then(
    function (result) {
      //Write to DB
      result.articles[0]["dateCreated"] = datetime;

      db.collection("news")
        .doc(datetime)
        .set({
          dateCreated: datetime,
          articles: result.articles
        });
      console.log("News data has been added to the database");
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  //Run analysis on BTC price data. Store results to firestore DB
  var prices = new Prices(datetime);
  var getPrices = prices.checkPrices.then(
    function (result) {
      console.log("check prices results: ", result);
      db.collection("prices")
        .doc(datetime)
        .set(result);
      console.log("Prices Data has been added to the database: ", datetime);
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  // Run analysis on fundamentals data. Store results to firestore DB
  var fundamentals = new Fundamentals(datetime);
  var getFundamentals = fundamentals.checkFundamentals.then(
    function (result) {
      console.log("Check fundamentals results: ", result);
      db.collection("fundamentals")
        .doc(datetime)
        .set(result);
      console.log("Fundamentals added to the database");
      return result;
    },
    function (err) {
      console.log(err);
      return err;
    }
  );

  var functs = [getPrices, getFundamentals, getNews];
  Promise.all(functs).then(function (values) {
    console.log(values);
    writeToFile(values);
  });
}

function writeToFile(APIdata) {
  fs.readFile("./public/assets/data.json", function (err, fileData) {
    var json = JSON.parse(fileData);
    json.push(APIdata);
    var jsonContent = JSON.stringify(json);
    fs.writeFile("./public/assets/data.json", jsonContent, err => {
      if (err) throw err;
      console.log("data written to file");
    });
  });
}



