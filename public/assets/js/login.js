$(document).ready(function () {
  firebase.initializeApp(firebaseConfig);

  // FirebaseUI config.
  var uiConfig = {
    signInSuccessUrl: "/core",
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: function () {
      window.location.assign("/terms");
    },
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("/terms");
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  if (ui.isPendingRedirect()) {
    $("#inviteCard").hide();
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  const auth = firebase.auth();

  // listen for auth status changes
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      // TO DO: 
      // I'm removing this for now until we implement proper logout
      // this line locks user to core.html if user is authenticated! Very cool... 
      // so if this is true we would need to add a navbar with logout optio that would remove user "firebase.auth().signOut()"

      console.log("User id: " + user.uid);
      // (self.location.href = "core.html"), event.preventDefault();

    } else {
      console.log("no one is signed in");
      // No user is signed in.
    }
  });

  $("#login").on("click", function () {
    console.log("clicker");
    $("#inviteCard").hide();
    $("#footerText").hide();
    $("#loginCard").show();
  });

  $("#signIn").on("click", function () {
    event.preventDefault();
    console.log("login clicked");


    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        (self.location.href = "core.html"), event.preventDefault();
      } else {


        email = $("#email")
          .val()
          .trim();
        password = $("#password")
          .val()
          .trim();

        // console.log(email);
        // console.log(password);

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(function (firebaseUser) {
            // Success 
            (self.location.href = "core.html"), event.preventDefault();
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });

      }
    });


  });




  $("#signUp").on("click", function (event) {
    // event.preventDefault();
    $("#code")[0].setCustomValidity("Enter a valid code. If you don't have one, please check our purchase options. Thank you for your interest!");


    $.post(
      "/api/inviteKeys",
      {
        inviteString: $("#code")
          .val()
          .trim()
      },
      function (data, status) {
        // console.log(data);

        //Check if the invite code is valid
        if (data.length > 0) {
          //And if so, hide the invite field and show the login UI
          $("#inviteCard").hide();
          $("#footerText").hide();
          //Start google's login UI
          ui.start("#firebaseui-auth-container", uiConfig);
          $(".firebaseui-title").text("Sign up with email");
        } else {
          console.log("not a valid code")
        }
      }
    );
  });




  $("#code").on("focus", function (event) {
    event.preventDefault();
    $(this).val(" ");
    $("#codeForm")
      .find("p")
      .remove();
  });

  // var stripe = Stripe("pk_test_karsmt0rzRKNQFzBMmj02VGZ00jgAWpFlU");

  // $("#buyInvite").on("click", function() {
  //   $("#payment");

  //   stripe
  //     .redirectToCheckout({
  //       // Make the id field from the Checkout Session creation API response
  //       // available to this file, so you can provide it as parameter here
  //       // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
  //       sessionId: "{{CHECKOUT_SESSION_ID}}"
  //     })
  //     .then(function(result) {
  //       // If `redirectToCheckout` fails due to a browser or network
  //       // error, display the localized error message to your customer
  //       // using `result.error.message`.
  //     });
  // });
})