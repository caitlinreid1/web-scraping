var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request = require("request")

var app = express();
//================ HANDLEBARS ===================

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




// app.use("/index", function (req, res) {
//   res.send();
// })

app.use("/", routes);

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
});
