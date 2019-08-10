"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};
var mysql = require("mysql");

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    //.process.env.database_password,
    config
  );
}

var connection = mysql.createConnection({
  host: "quantla-db.c6bauoxrw8fl.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: config.username,
  password: config.password,
  database: config.database
});

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connection = connection;

module.exports = db;
