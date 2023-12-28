const cheerio = require("cheerio");
const http = require("http");
const fs = require("fs");
const opener = require("opener");

fs.readFile("./data/data.html", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file: ", err);
    return;
  }

  const $ = cheerio.load(data);

  const links = [];

  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href?.includes("amazon.ca")) {
      links.push(href);
    }
  });
  writeLinks(links);
});

function openLinks(links) {
  links.forEach((link) => {
    console.log(link);
  });
  opener(links[0]);
}

function writeLinks(links) {
  fs.writeFile("./data/links.txt", links.join("\n"), (err) => {
    if (err) throw err;
    console.log("Links file written");
  });
}
