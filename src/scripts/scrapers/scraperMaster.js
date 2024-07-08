import { launch } from "puppeteer";
import plugsServices from "../../services/plugsServices.js";
import { insertNewPlug } from "../../dataAccess/plugsDataAccess.js";

export const scrapeData = async (selectors) => {
  const {
    url,
    pageSelector,
    paginationNumber,
    productContainerSelector,
    imgElementSelector,
    nameElementSelector,
    linkElementSelector,
    priceElementSelector,
    companyName,
    plugType,
    userId,
    nextPageSelector,
  } = selectors;

  let browser;
  try {
    browser = await launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the main content to load
    await page.waitForSelector(pageSelector);

    const plugins = await page.evaluate(
      async (
        paginationNumber,
        productContainerSelector,
        imgElementSelector,
        nameElementSelector,
        linkElementSelector,
        priceElementSelector,
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
            const priceElement = element.querySelector(priceElementSelector);

            if (imgElement && nameElement) {
              const plugin = {
                company: companyName,
                name: nameElement.textContent.trim(),
                src:
                  imgElement.src ||
                  imgElement.style.background.replace(/url\(|\)|"|'/g, ""),
                type: plugType,
                link: linkElement ? linkElement.href : "",
                price: priceElement
                  ? priceElement.textContent.split(" ")[0].trim()
                  : "",
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

            if (lastNextPageButton && page < paginationNumber - 1) {
              await lastNextPageButton.click();
            } else {
              break;
            }
          }
        }

        return pluginsArray;
      },
      paginationNumber,
      productContainerSelector,
      imgElementSelector,
      nameElementSelector,
      linkElementSelector,
      priceElementSelector,
      companyName,
      plugType,
      userId,
      nextPageSelector
    );

    await browser.close();
    return plugins;
  } catch (error) {
    console.error("Error scraping data:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const insertScrapedDataIntoDatabase = async (data) => {
  let counter = 0;

  for (const plugin of data) {
    try {
      const anotherPlug = await plugsServices.getPlug("name", plugin.name);
      if (!anotherPlug) {
        await insertNewPlug({
          company: plugin.company,
          name: plugin.name,
          src: plugin.src,
          type: plugin.type,
          link: plugin.link,
          price: plugin.price,
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

export const updatePrices = async (selectors) => {
  for (const companySelectors of selectors) {
    await scrapeData(companySelectors)
      .then(async (companyData) => {
        for (const plugin of companyData) {
          try {
            const plugDetails = await plugsServices.getPlug(
              "name",
              plugin.name
            );
            await alterPrice(plugDetails.id, plugin.price);
          } catch (error) {
            console.error(
              `Error updating price for plugin ${plugin.name}:`,
              error
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error scraping prices:", error);
      });
  }
};
