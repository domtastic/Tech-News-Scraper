let db = require("../../models");
// let scrapeTechCrunch = require("../../scripts/scrape.js");
module.exports = function(app) {
  // Route to scrape Tech Crunch App website
  app.get("/scrape", (req, res) => {
    // scrapeTechCrunch;
  });

  // Route for all of the headlines
  app.get("/headlines", (req, res) => {
    db.Headlines.find({})
      .then(dbHeadline => {
        res.json(dbHeadline);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Route to grab a specific article by id, and populte it with it's note
  app.get("headlines/:id", (req, res) => {
    //   pass in the id param into the findOne query
    db.Headline.findOne({
      _id: req.params.id
    })
      // populate the note
      .populate("note")
      .then(dbHealdine => {
        res.json(dbHeadline);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Route to save/update Headline associated with Note
  app.post("headlines/:id", (req, res) => {
    db.Note.create(req.body).then(dbNote => {
      return db.Headline.find;
    });
  });
};
