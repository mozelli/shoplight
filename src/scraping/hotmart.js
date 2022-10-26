const pup = require("puppeteer");

async function scrapHotmart() {
  const searchContent = {
    url: "https://hotmart.com/pt-br/marketplace/produtos/aulas-de-manicure-e-pedicure-2021-com-faby-cardoso/E45853768C?ref=X64056368W",
    term: "notebook",
  };

  const browser = await pup.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(searchContent.url);
  console.log("Entrou");

  // await page.waitForSelector("#twotabsearchtextbox");
  // await page.type("#twotabsearchtextbox", searchContent.term);

  // await Promise.all([
  //   page.waitForNavigation(),
  //   page.click("#nav-search-submit-button"),
  // ]);

  // const links = await page.$$eval(
  //   ".s-product-image-container > span > a",
  //   (el) => el.map((link) => link.href)
  // );

  // let counter = 1;

  // for (const link of links) {
  //   console.log(`Página ${counter++}`);
  //   await page.goto(link);
  //   await page.waitForSelector("#productTitle");

  //   const title = await page.$eval("#productTitle", (el) => el.innerText);
  //   const price = await page.$eval(".a-price-whole", (el) => el.innerText);

  //   const product = { title, price };
  //   console.log(product);
  // }

  await page.waitForTimeout(3000);

  await browser.close();
}

module.exports = { scrapHotmart };
