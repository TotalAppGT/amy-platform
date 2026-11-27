import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.join(process.cwd(), "public", "brand");
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

async function render(file, name, width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`file:///${path.join(OUT, file).replace(/\\/g, "/")}`, { waitUntil: "load" });
  await page.screenshot({ path: path.join(OUT, name), omitBackground: true });
  await page.close();
  console.log(name);
}

await render("icon.html", "amy-icon-1024.png", 1024, 1024);
await render("icon.html", "amy-icon-512.png", 512, 512);
await render("wordmark.html", "amy-wordmark.png", 1600, 500);
await render("wordmark-dark.html", "amy-wordmark-dark.png", 1600, 500);

await browser.close();
