// HOMEWORK: Web-scraper

// Snatches HTML from URLs
var request = require('request');
// Scrapes our HTML
var cheerio = require('cheerio');
//handlebars
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
//mongoose functionality 
var mongoose = require("mongoose");
var logger = require("morgan");

//initialize express
var app = express();

// bring in the models // ????
// var db = require("./models");

// require our Article and Comments models
var Article = require("./models/Article.js");
var Comments = require("./models/Comments.js")

// =================MONGOOSE =================

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



//================ HANDLEBARS ===========================

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllers");



// ================== ROUTES+CHEERIO =====================

// A GET request to scrape the nytimes website
app.get("/scrape", function(req, res) {
  // Make a request call to grab the HTML body
  request('http://www.nytimes.com', function (error, response, html) {

  	// Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);
    
    $('h2.story-heading').each(function(i, element){

      // empty result object for saving data
      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // var link = $(element).children().attr("href");
      // var title = $(element).children().text();

      // Save these results in an object that we'll push into the result array we defined earlier
      result.push({
        title: title,
        link: link
      });
      });
    console.log(result);
  });
}

// Listen on port 3000 
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
