import { schedule } from "node-cron";
import { updatePrices } from "../scrapers/scraperMaster.js";
import avidSelectors from "../scrapers/Avid/selectors.js";
import aomSelectors from "../scrapers/AOMAudio/selectors.js";
import apogeeSelectors from "../scrapers/ApogeeDigital/selectors.js";
import acusticaSelectors from "../scrapers/AcusticaAudio/selectors.js";
import antelopeSelectors from "../scrapers/AntelopeAudio/selectors.js";

const selectors = [
  acusticaSelectors,
  antelopeSelectors,
  aomSelectors,
  apogeeSelectors,
  avidSelectors,
];

// Running at midnight on the 1st of every month to update prices
schedule("0 0 1 * *", () => {
  updatePrices(selectors);
});

console.log("Scheduled the price update job.");
