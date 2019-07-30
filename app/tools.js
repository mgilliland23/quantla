var colors = require('colors');
// < !--The core Firebase JS SDK is always required and must be listed first-- >
var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyAxEVs3AUU-3VVhV_KPvedJl4SjCt-WVAI",
    authDomain: "quantla.firebaseapp.com",
    databaseURL: "https://quantla.firebaseio.com",
    projectId: "quantla",
    storageBucket: "quantla.appspot.com",
    messagingSenderId: "702604873159",
    appId: "1:702604873159:web:b738078256c761b5"
});



module.exports = function () {
    this.initializeDB = function () {
        return app;
    }
    this.grabmykey = function () {
        p1 = "DZGEY11";
        p2 = "JGGNO1624";

        p1 = encrypt(p1, -10);
        p2 = encrypt(p2, -10);

        return p1 + "" + p2

    };

    this.encrypt = function (msg, key) {
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

    this.mod = function (n, p) {
        if (n < 0)
            n = p - Math.abs(n) % p;

        return n % p;
    };

    this.checkcolor = function (num) {
        if (num.indexOf("-") > -1) {
            return colors.red(num);
        }
        else {
            return colors.green(num);
        }
    }
}