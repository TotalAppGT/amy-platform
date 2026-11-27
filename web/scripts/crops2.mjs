import path from "node:path";
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--disable-gpu","--hide-scrollbars"]});
const page = await browser.newPage();
await page.setViewport({width:1440,height:900,deviceScaleFactor:1});
await page.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
await page.evaluate(()=>localStorage.setItem("amy_age_ok","1"));
await page.reload({waitUntil:"networkidle0"});
const s = await page.$$("main > section");
for (const [i,name] of [[4,"crop-chat-preview"],[5,"crop-services"],[0,"crop-hero2"]]) { if (s[i]) await s[i].screenshot({path:path.join(process.cwd(),"shots",name+".png")}); }
await browser.close();
