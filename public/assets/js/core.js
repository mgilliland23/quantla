var userID;
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
