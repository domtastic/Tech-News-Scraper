let scrapeTechCrunch = require("../scripts/scrape");
module.exports = {
    scrape: (req, res) => {
        scrapeTechCrunch()
        res.render("scrape");
    }
}