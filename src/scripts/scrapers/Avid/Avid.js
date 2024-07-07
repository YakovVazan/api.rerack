import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

const url = "https://www.avid.com/plugins/avid-complete-plugin-bundle";
const pageSelector = "ul.grid";
const paginationNumber = 1;
const productContainerSelector = "ul.grid > li";
const imgElementSelector = "img";
const nameElementSelector = "h3";
const linkElementSelector = "a";
const companyName = "Avid";
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
