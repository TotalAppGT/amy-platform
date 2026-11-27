import path from "node:path";
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
await page.evaluate(() => localStorage.setItem("amy_age_ok", "1"));
await page.reload({ waitUntil: "networkidle0" });

const sections = await page.$$("main > section");
console.log("sections", sections.length);
if (sections[0]) await sections[0].screenshot({ path: path.join(process.cwd(), "shots", "crop-hero.png") });
if (sections[2]) await sections[2].screenshot({ path: path.join(process.cwd(), "shots", "crop-featured.png") });

await page.goto("http://localhost:3100/c/camila-rivas", { waitUntil: "networkidle0" });
const aside = await page.$("#suscribirme");
if (aside) await aside.screenshot({ path: path.join(process.cwd(), "shots", "crop-plans.png") });

await page.goto("http://localhost:3100/chat", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: path.join(process.cwd(), "shots", "chat-fixed.png") });

await browser.close();
