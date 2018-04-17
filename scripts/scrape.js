var axios = require('axios');
var cheerio = require('cheerio');
let db = require("../models");
function scrapeTechCrunch() {
  db.Headline.remove();
  axios.get("http://www.techcrunch.com/apps/").then(response => {
    
    let $ = cheerio.load(response.data);
    //////////// THERES A BETTER WAY TO DO THIS WITHOUT 2
    $(".post-block").each((i, element) => {
      let result = {};
      // console.log(element);
      
      result.img = $(element).find('.post-block__footer').find('img').attr('src');
      result.title = $(element).find('.post-block__header').find('a').text();
      result.link = $(element).find('.post-block__header').find('a').attr('href');
      console.log(result);
      
      if (result.img && result.title && result.link) {
        db.Headline.create(result)
          .then(dbHeadline => {
            console.log(dbHeadline);
          })
          .catch(err => {
            //return res.json(err);
            console.log(err);
          });
      }
    });
  });
}

module.exports = scrapeTechCrunch;
