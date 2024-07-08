import selectors from "./selectors.js";
import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

scrapeData(selectors)
  .then(async (pluginsArray) => {
    await insertScrapedDataIntoDatabase(pluginsArray);
  })
  .catch((error) => {
    console.error("Error scraping data:", error);
  });
