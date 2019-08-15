var userID;

firebase.initializeApp(firebaseConfig);

//Get the user id of the current user
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userID = user.uid;
    console.log("User id: " + userID);
    console.log("User email: " + user.email);
    //buildShoppingList();
  } else {
    console.log("no one is signed in");
    (self.location.href = "invite.html"), event.preventDefault();
  }
});

grabproposedtradedata();

setInterval(function() {
  grabproposedtradedata();
  console.log("test");
}, 30000);

function grabproposedtradedata() {
  $.getJSON(
    "https://poloniex.com/public?command=returnOrderBook&currencyPair=USDC_BTC&depth=1",
    function(results) {
      // console.log(results.asks[0][0]);

      $("#curr_price").text(
        (Math.round(results.asks[0][0] * 100) / 100)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    }
  );
  var currDatetime = { time: Math.floor(new Date() / 1000) };
  $.post("api/decisions", currDatetime, function(data) {
    console.log("front end decisions: ", data);
    $("#bif_price").text(
      (Math.round(data[data.length - 1].buyIfPrice * 100) / 100)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
    $("#sif_price").text(
      (Math.round(data[data.length - 1].sellIfPrice * 100) / 100)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );

    $("#indication").text(data[data.length - 1].aiDecision);

    if (data[data.length - 1].aiDecision == "Buy") {
      $("#indication_img").attr("class", "fas fa-arrow-circle-up");
      $("#indication_img").css("color", "greenyellow");
      $("#indication").css("color", "greenyellow");
    } else if (data[data.length - 1].aiDecision == "Sell") {
      $("#indication_img").attr("class", "fas fa-arrow-circle-down");
      $("#indication_img").css("color", "red");
      $("#indication").css("color", "red");
    } else {
      $("#indication_img").attr("class", "fas fa-exchange-alt");
      $("#indication_img").css("color", "yellow");
      $("#indication").css("color", "yellow");
    }
  });

  $(document).ready(function() {
    // click handler for logout
    $("#logout").on("click", function(event) {
      event.preventDefault();
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("user signed out");
        });
      (self.location.href = "invite.html"), event.preventDefault();
    });
  });

  // $.getJSON("./assets/AIDecision.json", function(data) {
  //   // console.log(fileData[fileData.length - 1]);
  //   // console.log(fileData[fileData.length - 1].CurrentPrice);
  //   // console.log(fileData[fileData.length - 1].AIDecision);

  //   // $('#curr_price').text(
  //   //   (Math.round(fileData[fileData.length - 1].CurrentPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  //   // );

  //   $("#bif_price").text(
  //     (Math.round(fileData[fileData.length - 1].BuyIfPrice * 100) / 100)
  //       .toFixed(2)
  //       .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //   );
  //   $("#sif_price").text(
  //     (Math.round(fileData[fileData.length - 1].SellIfPrice * 100) / 100)
  //       .toFixed(2)
  //       .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //   );

  //   $("#indication").text(fileData[fileData.length - 1].AIDecision);

  //   if (fileData[fileData.length - 1].AIDecision == "Buy") {
  //     $("#indication_img").attr("class", "fas fa-arrow-circle-up");
  //     $("#indication_img").css("color", "greenyellow");
  //     $("#indication").css("color", "greenyellow");
  //   } else if (fileData[fileData.length - 1].AIDecision == "Sell") {
  //     $("#indication_img").attr("class", "fas fa-arrow-circle-down");
  //     $("#indication_img").css("color", "red");
  //     $("#indication").css("color", "red");
  //   } else {
  //     $("#indication_img").attr("class", "fas fa-exchange-alt");
  //     $("#indication_img").css("color", "yellow");
  //     $("#indication").css("color", "yellow");
  //   }
  // });
}
