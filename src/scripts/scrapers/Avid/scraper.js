import selectors from "./selectors.js";
import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

scrapeData(selectors)
  .then(async (pluginsArray) => {
    let links = new Set();
    for (let plugin of pluginsArray) links.add(plugin.link);
    console.log(links);
    await insertScrapedDataIntoDatabase(pluginsArray);
  })
  .catch((error) => {
    console.error("Error scraping data:", error);
  });
