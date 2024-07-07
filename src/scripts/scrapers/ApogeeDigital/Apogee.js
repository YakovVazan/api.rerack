import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

const url = "https://apogeedigital.com/shop/plugins/";
const pageSelector = ".product-listing__products";
const paginationNumber = 1;
const productContainerSelector = ".col-12.col-md-6.col-lg-4";
const imgElementSelector = "img";
const nameElementSelector = "h3";
const linkElementSelector = "a";
const companyName = "Apogee";
const plugType = "Unkonwn";
const userId = 1;
const nextPageSelector = null;

scrapeData(
  url,
  pageSelector,
  paginationNumber,
  productContainerSelector,
  imgElementSelector,
  nameElementSelector,
  linkElementSelector,
  companyName,
  plugType,
  userId,
  nextPageSelector
)
  .then(async (pluginsArray) => {
    // let names = new Set();
    // for (let plugin of pluginsArray) names.add(plugin.name);
    // console.log(names.size);
    await insertScrapedDataIntoDatabase(pluginsArray);
  })
  .catch((error) => {
    console.error("Error scraping data:", error);
  });
