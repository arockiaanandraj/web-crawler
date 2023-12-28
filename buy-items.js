const readFile = require("fs/promises").readFile;
const puppeteer = require("puppeteer");
const execFile = require("child_process").execFile;

// Function to extract links from text
async function getLinks(data) {
  const links = data.split("\n");
  return links;
}

// Main function
async function main() {
    // Open Chrome browser from terminal - "chrome --remote-debugging-port=9222 --new-window &"
  const wsChromeEndpointUrl =
    "ws://127.0.0.1:9222/devtools/browser/3bbd0d03-7537-485e-9a92-5620eb651bb0";
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointUrl,
    defaultViewport: false,
  });

  // Read file
  const data = await readFile("./data/links.txt", "utf8");

  // Extract links
  const links = await getLinks(data);
  let count = 1;
  for (let link of links) {
    console.log(count++);
    console.log(link);
    const page = await browser.newPage();
    await page.goto(link);
    try {
      const readNowDescElement = await page.$("#read-now-description-text");
      if (readNowDescElement) {
        await page.close();
      }
      const elementHandle = await page.$("span#kindle-price");
      const text = await page.evaluate((el) => el.textContent, elementHandle);
      console.info("Price = " + text);
      if (text === " $0.00 ") {
        await page.click("#one-click-button");
        console.info("Purchased");
      } else {
        console.error("Will not purchase since it is not free");
      }
      setTimeout(() => page.close(), 2000);
    } catch (error) {
      if (error.message.includes("Most likely the page has been closed")) {
        console.error("Already owned");
      } else {
        console.error(error);
      }
    }
  }
}

main();
