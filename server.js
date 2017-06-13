
var request = require('request');
var cheerio = require('cheerio');
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var logger = require("morgan");

var app = express();

// bring in the models // 
// var db = require("/models");

// require our Article and Comments models
var Article = require("./models/Article.js");
var Comments = require("./models/Comments.js")



// =================MONGOOSE =================
var db = mongoose.connection;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Make public a static dir
app.use(express.static("public"));


var routes = require("./controllers/controllers");

// Listen on port 3000 
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
