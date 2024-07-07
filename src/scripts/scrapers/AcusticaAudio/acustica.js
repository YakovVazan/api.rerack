import { scrapeData, insertScrapedDataIntoDatabase } from "../scraperMaster.js";

const url = "https://www.acustica-audio.com/shop";
const pageSelector = ".column.catalog-product.bg-primary.q-ma-sm";
const paginationNumber = 13;
const productContainerSelector = ".column.catalog-product.bg-primary.q-ma-sm";
const imgElementSelector =
  "img.q-img__image.q-img__image--with-transition.q-img__image--loaded";
const nameElementSelector =
  ".text-accent.text-subtitle1.text-weight-bolder.cursor-pointer";
const linkElementSelector = null;
const companyName = "Acustica";
const plugType = "Unkonwn";
const userId = 1;
const nextPageSelector =
  ".q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.text-info.q-btn--actionable.q-focusable.q-hoverable";

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
