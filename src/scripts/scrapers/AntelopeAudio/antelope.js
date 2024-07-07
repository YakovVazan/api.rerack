import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

const url = "https://en.antelopeaudio.com/software-store/";
const pageSelector = ".software-card";
const paginationNumber = 1;
const productContainerSelector = ".software-card";
const imgElementSelector = ".software-image-card";
const nameElementSelector = ".software-title";
const linkElementSelector = "a";
const companyName = "Antelope";
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
