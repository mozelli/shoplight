const pup = require("puppeteer");
const { sanitizer } = require("../utils/sanitizer");
const fs = require("fs");

async function scrapAmazon() {
  const searchContent = {
    url: "https://www.amazon.com.br/",
    term: "notebook",
  };

  const products = [];

  const browser = await pup.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(searchContent.url);

  await page.waitForSelector("#twotabsearchtextbox");
  await page.type("#twotabsearchtextbox", searchContent.term);

  await Promise.all([
    page.waitForNavigation(),
    page.click("#nav-search-submit-button"),
  ]);

  const links = await page.$$eval(
    ".s-result-item > div > .s-widget-container > .s-card-container > .a-section > .s-product-image-container > span.rush-component > a",
    (el) => el.map((link) => link.href)
  );

  let counter = 0;

  for (const link of links) {
    if (counter === 3) continue;

    await page.goto(link);
    await page.waitForSelector("#productTitle");

    let img = await page.$eval("img#landingImage", (el) => el.src);
    let title = await page.$eval("#productTitle", (el) => el.innerText);
    let price = await page.$eval(".a-price-whole", (el) => el.innerText);
    let condition = await page.$eval(".best-offer-name", (el) => el.innerText);

    title = sanitizer(title);
    price = sanitizer(price);
    condition = sanitizer(condition);

    const product = { title, price, condition, img };
    products.push(product);
    console.log(`Product ${counter++} found.`);
  }
  await browser.close();

  return products;
}

module.exports = { scrapAmazon };
