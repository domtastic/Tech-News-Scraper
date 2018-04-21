let db = require("../../models");
var fetchCtrl = require('../../controllers/fetch');
module.exports = function(app) {

  app.get('/', function (req, res) {
    console.log("get / working");
      db.Headline.find({})
          .then(dbHeadlines => {
              console.log("DB headlines", dbHeadlines);
              res.render("home", {headlines: dbHeadlines})
          })
          .catch(err => {
              res.json(err);
          });
  });

  app.get("/saved", (req, res) => {
    //   pass in the id param into the findOne query
    db.Saved.find({})
      .then(savedData => {
        console.log(savedData);
        res.render('saved', {savedData})
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Route to scrape Tech Crunch App website
  app.get("/scrape", fetchCtrl.scrape)

////////////////////////////////////////

  // Route for all of the headlines
  app.get("/headlines", (req, res) => {
    db.Headline.find({})
      .then(dbHeadline => {
        res.json(dbHeadline);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Route to grab a specific article by id, and populte it with it's note
  app.get("/headlines/:id", (req, res) => {
    //   pass in the id param into the findOne query
    db.Headline.findOne({
      _id: req.params.id
    })
      // populate the note
      .populate("notes")
      .then(dbHeadline => {
        res.json(dbHeadline);
      })
      .catch(err => {
        res.json(err);
      });
  });
  app.post("/saved/:id", (req, res) => {
    //   pass in the id param into the findOne query
    db.Saved.create(req.body)
      .then(dbHealdine => {
        res.json(dbHeadline);
      })
      .catch(err => {
        res.json(err);
      });
  });


  // Route to save/update Headline associated with Note
  app.post("/createNote/:id", (req, res) => {
    db.Note.create(req.body).then(dbNote => {
      db.Headline.findByIdAndUpdate(req.params.id, { $push: { notes: dbNote._id } }, { new: true })
      .then((response) => {
        res.send("added note")
      })
      
    });
  });

  app.get("/delete/:id", function(req, res) {

    console.log("ID is getting read for delete" + req.params.id);

    console.log("Able to activate delete function.");

    db.Saved.findOneAndRemove({"_id": req.params.id}, function (err) {
        if (err) { console.log("Not able to delete:" + err);
    }
    else {
        console.log("Able to delete, Yay");
    }
    res.redirect("/saved");

    });
  });

};