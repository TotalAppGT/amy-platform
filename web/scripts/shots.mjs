import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3100";
const OUT = path.join(process.cwd(), "shots");
fs.mkdirSync(OUT, { recursive: true });

const routes = [
  { path: "/", name: "home", full: true },
  { path: "/explorar", name: "explorar", full: false },
  { path: "/servicios", name: "servicios", full: false },
  { path: "/servicios/masaje-relajante-profundo", name: "servicio-detalle", full: false },
  { path: "/c/camila-rivas", name: "perfil", full: false },
  { path: "/chat", name: "chat", full: false },
  { path: "/creadora", name: "panel-creadora", full: true },
  { path: "/admin", name: "panel-admin", full: true },
  { path: "/entrar", name: "entrar", full: false },
  { path: "/registro", name: "registro", full: false },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const errors = [];

async function prepare(page) {
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => localStorage.setItem("amy_age_ok", "1"));
}

const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await prepare(desktop);

for (const r of routes) {
  await desktop.goto(`${BASE}${r.path}`, { waitUntil: "networkidle0" });
  await new Promise((res) => setTimeout(res, 400));
  await desktop.screenshot({
    path: path.join(OUT, `${r.name}.png`),
    fullPage: r.full,
  });
  console.log("desktop", r.name);
}

const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
await prepare(mobile);
for (const r of [
  { path: "/", name: "home-mobile" },
  { path: "/c/camila-rivas", name: "perfil-mobile" },
  { path: "/chat", name: "chat-mobile" },
  { path: "/servicios", name: "servicios-mobile" },
]) {
  await mobile.goto(`${BASE}${r.path}`, { waitUntil: "networkidle0" });
  await new Promise((res) => setTimeout(res, 300));
  await mobile.screenshot({ path: path.join(OUT, `${r.name}.png`), fullPage: false });
  console.log("mobile", r.name);
}

await browser.close();
console.log("errors", JSON.stringify(errors.slice(0, 20), null, 2));
