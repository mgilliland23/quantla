var colors = require("colors");
var atob = require('atob');
// < !--The core Firebase JS SDK is always required and must be listed first-- >
var firebase = require("firebase");
var app = firebase.initializeApp({
  apiKey: atob("QUl6YVN5QXhFVnMzQVVVLTNWVmhWX0tQdmVkSmw0U2pDdC1XVkFJ"),
  authDomain: atob("cXVhbnRsYS5maXJlYmFzZWFwcC5jb20="),
  databaseURL: atob("aHR0cHM6Ly9xdWFudGxhLmZpcmViYXNlaW8uY29t"),
  projectId: "quantla",
  storageBucket: atob("cXVhbnRsYS5hcHBzcG90LmNvbQ=="),
  messagingSenderId: atob("NzAyNjA0ODczMTU5"),
  appId: atob("MTo3MDI2MDQ4NzMxNTk6d2ViOmI3MzgwNzgyNTZjNzYxYjU=")
});

module.exports = function() {
  this.initializeDB = function() {
    return app;
  };
  this.grabmykey = function() {
    p1 = "DZGEY11";
    p2 = "JGGNO1624";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2;
  };

  this.encrypt = function(msg, key) {
    var encMsg = "";

    for (var i = 0; i < msg.length; i++) {
      var code = msg.charCodeAt(i);

      // Encrypt only letters in 'A' ... 'Z' interval
      if (code >= 65 && code <= 65 + 26 - 1) {
        code -= 65;
        code = mod(code + key, 26);
        code += 65;
      }

      encMsg += String.fromCharCode(code);
    }

    return encMsg;
  };

  this.mod = function(n, p) {
    if (n < 0) n = p - (Math.abs(n) % p);

    return n % p;
  };

  this.checkcolor = function(num) {
    if (num.indexOf("-") > -1) {
      return colors.red(num);
    } else {
      return colors.green(num);
    }
  };
};
