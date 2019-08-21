require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var db = require("./models");

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require("stripe")("sk_test_zRBUN5ocH6mbIcm5snAJJnxH00naNOrZtj");

// (async () => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     subscription_data: {
//       items: [
//         {
//           plan: "plan_123"
//         }
//       ]
//     },
//     success_url: "/core",
//     cancel_url: "https://example.com/cancel"
//   });

//   console.log(session);
// })();

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app, path);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/",
      PORT,
      PORT
    );
  });
});

module.exports = app;
