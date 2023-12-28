const puppeteer = require("puppeteer");

async function main() {
const browser = await puppeteer.launch({
  headless: false,
  // `headless: true` (default) enables old Headless;
  // `headless: 'new'` enables new Headless;
  // `headless: false` enables “headful” mode.
});

const page = await browser.newPage();
await page.goto('https://developer.chrome.com/');
await browser.close();
}
main();