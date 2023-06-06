import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import puppeteer from "puppeteer";
import { NavigateTo, launchOptions } from "../config";
import sampleData from "../../indexedDB/sampleData";
import { preview } from 'vite';
// Delay function
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

console.log(launchOptions);

describe("Menu", () => {
  let server;
  let browser;
  let page;

  const port = 3000;
  const pageUrl = `http://localhost:${port}`;

  beforeAll(async () => {
      server = await preview({ preview : { port }});
      browser = await puppeteer.launch(launchOptions);
      
      page = await browser.newPage();

      // Clear indexedDB
      await page.goto('chrome://indexeddb-internals');
      await page.evaluate(() => {
        try {
            indexedDB.deleteDatabase('ORDER_MANAGEMENT');
        } catch (e)
          {
              console.log(e);
          }
      });
      page.close();
      page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: 'networkidle0' }); 
      

  });

  afterAll(() => {
    browser.close();
    server.httpServer.close();
  });

  test('1. Add an item to menu', async () => {

      // Navigate to menu
      await NavigateTo(page, pageUrl, 'Menu');
      await page.waitForSelector('div[data-test-id="menu-item-card"]');
      const before = await page.$$('div[data-test-id="menu-item-card"]');
      expect(before.length).toBe(sampleData['Menu'].length);


      // Add item to menu
      const btn = await page.waitForSelector('button[data-test-id="add-new-item"]');
      await btn.click();

      await (await page.waitForSelector('button[data-test-id="new-card-edit"]')).click();
      await (await page.waitForSelector('input[data-test-id="new-card-item-name"]')).type('Test');
      await (await page.waitForSelector('input[data-test-id="new-card-item-price"]')).type('10');
      await (await page.waitForSelector('button[data-test-id="new-item-save"]')).click();
      
      const after = await page.$$('div[data-test-id="menu-item-card"]');
      expect(after.length).toBe(before.length + 1);

  }, 5000);

  test('2. Edit an item in menu', async () => {
    const before = await page.$$('div[data-test-id="menu-item-card"]');

    // Randomly select an item to edit
    const randomItem = Math.floor(Math.random() * before.length);
    const item = before[randomItem];
    const cardBody = await item.waitForSelector('div.card-body');
    const editBtn = await cardBody.waitForSelector('button[data-test-id="edit"]');
    await editBtn.click();
    await page.waitForTimeout(200);
    const inputText = await cardBody.waitForSelector('input[data-test-id="item-name"]');
    await inputText.type('Edited');
    const inputPrice = await cardBody.waitForSelector('input[data-test-id="item-price"]');

    await inputPrice.type('0');
    const saveBtn = await cardBody.waitForSelector('button[data-test-id="save"]');
    await saveBtn.click();
    await page.waitForTimeout(200);
    // Check if item is edited
    const after = await page.$$('div[data-test-id="menu-item-card"]');
    const editedItem = after[randomItem];
    const editedCardBody = await editedItem.waitForSelector('div.card-body');
    const editedItemName = await editedCardBody.waitForSelector('span[data-test-id="item-name"]');
    const editedItemPrice = await editedCardBody.waitForSelector('input[data-test-id="item-price"]');

    expect(await editedItemName.evaluate(el => el.innerText)).toBe('Edited');
    expect(await editedItemPrice.evaluate(el => el.value)).toBe('0');
  }, 5000);

});
  