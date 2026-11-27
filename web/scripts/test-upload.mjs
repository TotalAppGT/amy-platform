import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox"]});
const page = await browser.newPage();
await page.setViewport({width:1440,height:1000});
await page.goto("http://localhost:3100/",{waitUntil:"networkidle0"});
await page.evaluate(()=>localStorage.setItem("amy_age_ok","1"));
const out={};

await page.goto("http://localhost:3100/c/camila-rivas",{waitUntil:"networkidle0"});
out.carouselBefore = await page.evaluate(()=>document.querySelector('.transition-transform')?.getAttribute('style'));
await page.evaluate(()=>document.querySelector('[aria-label="Foto siguiente"]')?.click());
await new Promise(r=>setTimeout(r,600));
out.carouselAfter = await page.evaluate(()=>document.querySelector('.transition-transform')?.getAttribute('style'));

await page.goto("http://localhost:3100/creadora/subir",{waitUntil:"networkidle0"});
const input = await page.$('input[type=file]');
if (input) await input.uploadFile("C:/dev/plataforma-creadores-gt/web/shots/perfil.png");
await new Promise(r=>setTimeout(r,500));
out.previews = await page.evaluate(()=>document.querySelectorAll('img[alt]').length);
out.canPublish = await page.evaluate(()=>[...document.querySelectorAll('button')].some(b=>b.textContent?.includes('Publicar galería')));
await page.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Publicar galería')); b?.click();});
await new Promise(r=>setTimeout(r,400));
out.published = await page.evaluate(()=>document.body.innerText.includes('Galería publicada'));

await page.goto("http://localhost:3100/legal/derechos-autor",{waitUntil:"networkidle0"});
out.copyright = await page.evaluate(()=>document.body.innerText.includes('Derechos de autor'));
out.legalLinks = await page.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h?.startsWith('/legal/')).length);

console.log(JSON.stringify(out,null,2));
await browser.close();
