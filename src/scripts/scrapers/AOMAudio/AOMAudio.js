import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

const url = "https://aom-factory.jp/products/";
const pageSelector = ".container";
const paginationNumber = 1;
const productContainerSelector = ".plugin-card-item";
const imgElementSelector = "img";
const nameElementSelector = ".plugin-card-name";
const linkElementSelector = "a";
const companyName = "A.O.M.";
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
    await insertScrapedDataIntoDatabase(pluginsArray);
  })
  .catch((error) => {
    console.error("Error scraping data:", error);
  });
