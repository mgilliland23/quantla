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
  tosUrl: "/terms",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
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

$("#login").on("click", function() {
  console.log("clicker");
  $("#inviteCard").hide();
  //Start google's login UI
  ui.start("#firebaseui-auth-container", uiConfig);
});

$("#signUp").on("click", function(event) {
  event.preventDefault();

  $.post(
    "/api/inviteKeys",
    {
      inviteString: $("#code")
        .val()
        .trim()
    },
    function(data, status) {
      console.log(data);
      if (data.length > 0) {
        //Check if the invite code is valid, and if so, hide the invite field and show the login UI
        $("#inviteCard").hide();
        //Start google's login UI
        ui.start("#firebaseui-auth-container", uiConfig);
      } else {
        //display error message on front end
        $();
      }
    }
  );
});
