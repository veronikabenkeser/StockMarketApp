require('dotenv').load();
var path = require("path");
var express = require('express');
var mongoose = require("mongoose");
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

mongoose.connect(process.env.MONGOLAB_URI, function(err, res) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  }
  else {
    console.log('Connected to Database: ' + process.env.MONGOLAB_URI);
  }
});

app.use(express.static(__dirname + '/client'));
var apiRoutes = require("./app/routes/api")(app, express);
app.use('/api', apiRoutes);

module.exports = app;
