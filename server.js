// DEPENDENCIES =========================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// var axios = require("axios");?????? will I be using AXIOS?
// var logger = require("morgan"); ????? will I be using MORGAN?
var exphbs = require("express-handlebars");
const cheerio = require("cheerio");

let db = require("./models");

const PORT = 3000;

let app = express();

// MIDDLEWARE ====================================
// Use morgan logger for logging requests
// app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;

// mongoose.connect("mongodb://localhost/dgscraper");

require("./routes/api/headline-api-routes")(app)

// // Start the server
// app.listen(PORT, function() {
//   console.log("App running on port " + PORT + "!");
// });


mongoose.connect("mongodb://localhost/dgscraper").then(
    () => {
        console.log("Mongo connection open");
        app.listen(PORT, err => {
            if (err) {
                console.log("Something went wrong in Mongo: ", err);
            } else {
                console.log("Tech News Scraper App listening on port: " + PORT);
            }
        });
    },
    err => {
        console.log("something went wrong ", err);
    }
);
