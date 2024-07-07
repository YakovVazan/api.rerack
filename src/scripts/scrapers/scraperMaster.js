import { launch } from "puppeteer";
import plugsServices from "../../services/plugsServices.js";
import { insertNewPlug } from "../../dataAccess/plugsDataAccess.js";

export const scrapeData = async (
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
) => {
  try {
    const browser = await launch({ headless: false }); // { headless: false }
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    // Wait for the main content to load
    await page.waitForSelector(pageSelector);

    const plugins = await page.evaluate(
      async (
        paginationNumber,
        productContainerSelector,
        imgElementSelector,
        nameElementSelector,
        linkElementSelector,
        companyName,
        plugType,
        userId,
        nextPageSelector
      ) => {
        const pluginsArray = [];

        // Loop through pages
        for (let page = 0; page < paginationNumber; page++) {
          // Wait for the main content to load
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Catch the container
          const catalogProducts = document.querySelectorAll(
            productContainerSelector
          );

          catalogProducts.forEach((element) => {
            const imgElement = element.querySelector(imgElementSelector);
            const nameElement = element.querySelector(nameElementSelector);
            const linkElement = element.querySelector(linkElementSelector);

            if (imgElement && nameElement) {
              const plugin = {
                company: companyName,
                name: nameElement.textContent.trim(),
                src:
                  imgElement.src ||
                  imgElement.style.background.replace(/url\(|\)|"|'/g, ""),
                type: plugType,
                userId: userId,
              };

              pluginsArray.push(plugin);
            }
          });

          if (nextPageSelector) {
            // Click on the last next page button
            const nextButtonSelectors =
              document.querySelectorAll(nextPageSelector);
            const lastNextPageButton =
              nextButtonSelectors[nextButtonSelectors.length - 1];

            if (lastNextPageButton && page < paginationNumber - 1)
              await lastNextPageButton.click();
            else break;
          }
        }

        return pluginsArray;
      },
      paginationNumber,
      productContainerSelector,
      imgElementSelector,
      nameElementSelector,
      linkElementSelector,
      companyName,
      plugType,
      userId,
      nextPageSelector
    );

    await browser.close();
    return plugins;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
};

export const insertScrapedDataIntoDatabase = async (data) => {
  // Keep track of the amount of new plugins
  let counter = 0;

  for (const plugin of data) {
    try {
      // Prevent duplications
      const anotherPlug = await plugsServices.getPlug("name", plugin.name);
      if (!anotherPlug) {
        await insertNewPlug({
          company: plugin.company,
          name: plugin.name,
          src: plugin.src,
          type: plugin.type,
          userId: plugin.userId,
        });
        counter++;
      } else {
        console.log("Plugin already exists: " + plugin.name);
      }
    } catch (error) {
      console.error(`Error inserting plugin ${plugin.name}:`, error);
    }
  }

  console.log("Added " + counter + " plugin(s)");
};

// TODO: Implement this function
export const updatedPrices = () => {};
