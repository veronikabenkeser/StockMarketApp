var http = require('http');
var path = require("path");
var express = require('express');
var bodyParser = require("body-parser");
var redis = require("redis");
// var redisClient = redis.createClient();

var app = express();

//App configuration
//body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Configuration to handle CORS reqs
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET','POST');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
  next();
  
});

//Connect to Redis



//Routes for our API
//basic route for the homepage
//send our index.html file to the user for the home page
// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

app.use(express.static(__dirname+'/client'));

var apiRoutes = require("./app/routes/api")(app,express);


//Register our apiRoutes
app.use('/api',apiRoutes);

//When the user goes to http://examples.com/posts (a client-side route) directly,
// will serve up the index file and the request will then be handled by Backbone.
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname+'/client/index.html'));
}); 

module.exports = app;