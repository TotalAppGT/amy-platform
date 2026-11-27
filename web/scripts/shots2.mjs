import path from "node:path";
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu","--hide-scrollbars"]});
const page = await browser.newPage();
await page.setViewport({width:1440,height:1000,deviceScaleFactor:1});
await page.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
await page.evaluate(()=>localStorage.setItem("amy_age_ok","1"));
for (const [route,name,full] of [["/c/camila-rivas","perfil-galeria",false],["/creadora/subir","subir-contenido",true],["/legal/derechos-autor","legal-derechos",false],["/servicios/masaje-relajante-profundo","servicio-galeria",false]]) {
  await page.goto("http://localhost:3100"+route,{waitUntil:"networkidle0"});
  await new Promise(r=>setTimeout(r,350));
  await page.screenshot({path:path.join(process.cwd(),"shots",name+".png"),fullPage:full});
  console.log(name);
}
await browser.close();
