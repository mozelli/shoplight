const { scrapAmazon } = require("./scraping/amazon");
const { save } = require("./scraping/state");

scrapAmazon().then((result) => {
  save(result);
});
