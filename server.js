var express = require('express');
var mongoose = require("mongoose");
var config = require("./config");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();

});

mongoose.connect(config.database[app.settings.env], function(err, res) {
  if (err) {
    console.log(console.log('Error connecting to the database. ' + err));
  }
  else {
    console.log('Connected to Database: ' + config.database[app.settings.env]);
  }

});

app.use(express.static(__dirname + '/client'));
var apiRoutes = require("./app/routes/api")(app, express);
app.use('/api', apiRoutes);

module.exports = app;
