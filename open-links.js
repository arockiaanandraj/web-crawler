const fs = require("fs");
const opener = require("opener");
const puppeteer = require("puppeteer");

function openLinks(start, end) {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/links.txt", "utf8", async (err, data) => {
      if (err) reject(err);

      let lines = data.split("\n");

      let batch = lines.slice(start, end);

      batch.forEach((link) => {
        opener(link);
      });
      resolve();
    });
  });
}

const START_LINE_NUM = 0;

const MAX_LINES = 100;
const END_LINE_NUM = START_LINE_NUM + MAX_LINES;

openLinks(START_LINE_NUM, END_LINE_NUM)
  .then(() => console.log("Done!"))
  .catch((err) => console.error(err));
