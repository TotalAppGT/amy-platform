import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox"]});
const page = await browser.newPage();
await page.setViewport({width:1440,height:900});
await page.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
await page.evaluate(()=>localStorage.setItem("amy_age_ok","1"));
for (const route of ["/","/c/camila-rivas","/chat","/creadora","/creadora/subir","/admin","/entrar","/registro"]) {
  await page.goto("http://localhost:3100"+route,{waitUntil:"networkidle0"});
  const list = await page.evaluate(()=>{
    const clean=s=>(s||"").replace(/\s+/g," ").trim();
    return [...document.querySelectorAll("button,a")].filter(el=>!clean(el.textContent)&&!el.getAttribute("aria-label")&&!el.getAttribute("title")).map(el=>({tag:el.tagName, html:el.outerHTML.slice(0,180)}));
  });
  console.log("\n"+route, JSON.stringify(list,null,2));
}
await browser.close();
