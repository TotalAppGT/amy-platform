import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
await page.evaluate(() => localStorage.setItem("amy_age_ok", "1"));

const results = {};

await page.goto("http://localhost:3100/c/camila-rivas", { waitUntil: "networkidle0" });
await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.includes("3 meses"));
  b?.click();
});
await new Promise((r) => setTimeout(r, 250));
results.planPrice = await page.evaluate(() => document.querySelector("#suscribirme")?.textContent?.includes("Q390"));

await page.goto("http://localhost:3100/servicios/masaje-relajante-profundo", { waitUntil: "networkidle0" });
await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.includes("Reservar con anticipo"));
  b?.click();
});
await new Promise((r) => setTimeout(r, 250));
results.booking = await page.evaluate(() => document.body.innerText.includes("Reserva confirmada"));

await page.goto("http://localhost:3100/admin", { waitUntil: "networkidle0" });
await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.trim() === "Aprobar");
  b?.click();
});
await new Promise((r) => setTimeout(r, 250));
results.kycApprove = await page.evaluate(() => document.body.innerText.includes("Aprobada"));

await page.goto("http://localhost:3100/chat", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 400));
await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.includes("Propina Q25"));
  b?.click();
});
await new Promise((r) => setTimeout(r, 300));
results.tipBalance = await page.evaluate(() => document.body.innerText.includes("Q225"));

await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
results.home = await page.evaluate(() => document.body.innerText.includes("También puedes reservar"));
results.favicon = await page.evaluate(async () => {
  const r = await fetch("/icon.svg");
  return r.status;
});

console.log(JSON.stringify(results, null, 2));
await browser.close();
