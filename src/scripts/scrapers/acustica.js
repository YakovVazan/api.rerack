/**
 * This script utilizes Puppeteer to scrape data from the Acustica Audio shop website.
 * It collects information about plugins available for purchase and outputs their names along with other details.
 **/

import { launch } from "puppeteer";
import plugsServices from "../../services/plugsServices.js";
import { insertNewPlug } from "../../dataAccess/plugsDataAccess.js";

async function scrapeAcusticaData() {
  try {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("https://www.acustica-audio.com/shop", {
      waitUntil: "networkidle2",
    });

    // Wait for the main content to load
    await page.waitForSelector(".column.catalog-product.bg-primary.q-ma-sm");

    const plugins = await page.evaluate(async () => {
      const pluginsArray = [];

      // Loop through pages
      for (let page = 0; page < 13; page++) {
        // Wait for the main content to load
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Catch the container
        const catalogProducts = document.querySelectorAll(
          ".column.catalog-product.bg-primary.q-ma-sm"
        );

        catalogProducts.forEach((element) => {
          const imgElement = element.querySelector(
            "img.q-img__image.q-img__image--with-transition.q-img__image--loaded"
          );

          const nameElement = element.querySelector(
            ".text-accent.text-subtitle1.text-weight-bolder.cursor-pointer"
          );

          if (imgElement && nameElement) {
            const plugin = {
              company: "Acustica",
              name: nameElement.textContent.trim(),
              src: imgElement.src,
              type: "Unknown",
              userId: 1,
            };

            pluginsArray.push(plugin);
          }
        });

        // Click on the last next page button
        const nextButtonSelectors = document.querySelectorAll(
          ".q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--rectangle.text-info.q-btn--actionable.q-focusable.q-hoverable"
        );
        const lastNextPageButton =
          nextButtonSelectors[nextButtonSelectors.length - 1];

        if (lastNextPageButton && page < 12) await lastNextPageButton.click();
        else break;
      }

      return pluginsArray;
    });

    await browser.close();
    return plugins;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}

scrapeAcusticaData()
  .then(async (pluginsArray) => {
    // Keep track of the amount of new plugins
    let counter = 0;

    for (const plugin of pluginsArray) {
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
  })
  .catch((error) => {
    console.error("Error scraping data:", error);
  });
