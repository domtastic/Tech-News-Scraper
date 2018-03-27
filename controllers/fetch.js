let scrapeTechCrunch = require("../scripts/scrape");
module.exports = {
  scrape: (req, res) => {
    scrapeTechCrunch()
    res.send("scrape complete")
  }
}