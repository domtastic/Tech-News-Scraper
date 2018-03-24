function scrapeTechCrunch() {
  axios.get("http://www.techcrunch.com/apps/").then(response => {
    let $ = cheerio.load(response.data);
    //////////// THERES A BETTER WAY TO DO THIS WITHOUT 2
    $("article header h2").each((i, element) => {
      let result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Headline.create(result)
        .then(dbHeadline => {
          console.log(dbHeadline);
        })
        .catch(err => {
          return res.json(err);
        });
    });

    $("article footer figure picture ").each((i, element) => {
      let result = {};
      result.img = $(this)
        .children("img")
        .attr("src");

      db.Headline.create(result)
        .then(dbHeadline => {
          console.log(dbHeadline);
        })
        .catch(err => {
          return res.json(err);
        });
    });

    res.send("Scrape Complete");
  });
}

module.exports = scrapeTechCrunch;
