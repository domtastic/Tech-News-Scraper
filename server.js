// DEPENDENCIES =========================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");
const cheerio = require("cheerio");


let db = require("./models");

var PORT = process.env.PORT || 3000;
// var PORT =  3005;


let app = express();


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
require("./routes/api/headline-api-routes")(app);

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
// var MONGODB_URI = "mongodb://localhost/dgscraper";

console.log(process.env.MONGODB_URI);
// let mongoDB;
// if(process.env.MONGODB_URI) {
//     mongoDB = 'mongodb://domtastic:bootcamp1@40ds253889.mlab.com:53889/dbscraper';
// }
// else {
//     mongoDB = "mongodb://localhost/dgscraper"
// }

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_BLUE_URI);


    app.listen(PORT, err => {
        if (err) {
            console.log("Something went wrong in Mongo: ", err);
        } else {
            console.log("Tech News Scraper App listening on port: " + PORT);
        }
    });





// // Start the server


// mongoose.connect("mongodb://localhost/dgscraper").then(()=>{



// });
