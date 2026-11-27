import puppeteer from "puppeteer-core";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox"]});
const p=await b.newPage(); await p.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
console.log(await p.evaluate(()=>({desc:document.querySelector('meta[name="description"]')?.getAttribute('content'), robots:document.querySelector('meta[name="robots"]')?.getAttribute('content'), title:document.title})));
await b.close();
