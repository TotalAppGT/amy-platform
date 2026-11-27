import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const routes = [
  "/",
  "/explorar",
  "/servicios",
  "/servicios/masaje-relajante-profundo",
  "/c/camila-rivas",
  "/chat",
  "/creadora",
  "/creadora/subir",
  "/admin",
  "/entrar",
  "/registro",
  "/legal/terminos",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

const results = [];

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.isMobile });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("http://localhost:3100/", { waitUntil: "networkidle0" });
  await page.evaluate(() => localStorage.setItem("amy_age_ok", "1"));

  for (const route of routes) {
    const res = await page.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 250));
    const data = await page.evaluate(() => {
      const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
      const images = [...document.querySelectorAll("img")];
      const missingAlt = images.filter((img) => !img.getAttribute("alt")).length;
      const controls = [...document.querySelectorAll("button,a")];
      const noName = controls.filter((el) => {
        const text = clean(el.textContent);
        return !text && !el.getAttribute("aria-label") && !el.getAttribute("title");
      }).length;
      const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
      const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
      const hashLinks = [...document.querySelectorAll('a[href="#"]')].length;
      const h1 = document.querySelectorAll("h1").length;
      return {
        title: document.title,
        h1,
        missingAlt,
        noName,
        duplicateIds,
        hashLinks,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    results.push({
      viewport: vp.name,
      route,
      status: res?.status(),
      errors: errors.splice(0),
      ...data,
    });
  }
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
