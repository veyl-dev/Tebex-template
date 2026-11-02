import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const browser=await chromium.launch({headless:true});
const errors=[];
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.__copied=value;}}});
  });
  await page.goto('file://'+resolve('preview/index.html'),{waitUntil:'domcontentloaded'});
  await page.locator('.hero h1').waitFor();
  assert.match(await page.locator('.hero h1').innerText(),/Build your legacy/);
  assert.equal(await page.locator('.category-card').count(),3);
  await mkdir('artifacts',{recursive:true});
  await page.screenshot({path:'artifacts/eclipse-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.reload({waitUntil:'domcontentloaded'});
  const toggle=page.locator('[data-menu-toggle]');
  const nav=page.locator('[data-main-nav]');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'),'true');
  assert.equal(await nav.evaluate(el=>el.classList.contains('is-open')),true);
  await nav.locator('a').first().click();
  assert.equal(await toggle.getAttribute('aria-expanded'),'false');
  await page.locator('[data-copy-button]').click();
  await page.waitForFunction(()=>document.querySelector('[data-copy-button]')?.textContent==='COPIED');
  assert.equal(await page.evaluate(()=>window.__copied),'play.example.net');
  const dimensions=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:window.innerWidth}));
  assert.ok(dimensions.width<=dimensions.viewport,'Mobile horizontal overflow: '+JSON.stringify(dimensions));
  await page.screenshot({path:'artifacts/eclipse-mobile.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('Browser smoke tests passed: desktop render, mobile navigation, copy-server action, no horizontal overflow, no uncaught page errors.');
}finally{await browser.close();}