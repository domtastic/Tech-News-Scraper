// DEPENDENCIES =========================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// var axios = require("axios");?????? will I be using AXIOS?
// var logger = require("morgan"); ????? will I be using MORGAN?
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

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/dgscraper", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
