import puppeteer from "puppeteer";
import { pageUrl, databaseName, version, store, NUMBEROFSTORES } from "../config";
import sampleData from "../../indexedDB/sampleData";
// Delay function
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

describe("IndexedDB Pre-checks", () => {
    let browser;
    let page;
    let db;
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        defaultViewport: false
      }); // error if not headless : 'old not used : https://github.com/ckeditor/ckeditor5/issues/14063
      page = await browser.newPage();
      // await page.goto('chrome://indexeddb-internals');
      // await page.evaluate(() => {
      //   try {
      //       indexedDB.deleteDatabase('ORDER_MANAGEMENT');
      //   } catch (e)
      //   {
      //       console.log(e);
      //   }
      // });

      await page.goto(pageUrl, { waitUntil: 'networkidle0' }); 

      db = await page.evaluate((databaseName, ver) => new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName, ver);
        request.onsuccess = (e) => {
          resolve(e.target.result);
        }
        request.onerror = () => {
          reject(null);
        }
    }), databaseName, version);
      
    });

    afterAll(() => browser.close());
  
    test('Check if indexedDB is created', async () => {
      const result = await page.evaluate((databaseName) => new Promise((resolve, reject) => {
        const request = window.indexedDB.open(databaseName, 1);
        request.onsuccess = () => {
          resolve(true);
        }
        request.onerror = () => {
          reject(false);
        }
    }), databaseName);
      
      expect(result).toBe(true);
    });

    test('Check if indexedDB has corret number of stores', async () => {
      
      const result = await page.evaluate(() => new Promise((resolve, reject) => {
        const request = window.indexedDB.open('ORDER_MANAGEMENT', 1);
        
        request.onsuccess = () => {
          const db = request.result;
          const storeNames = db.objectStoreNames;
          resolve(storeNames.length);
        }

        request.onerror = () => {
          reject('Failed to open IndexedDB');
        }

    }));

    expect(result).not.toBe('Failed to open IndexedDB');
    expect(result).toBe(NUMBEROFSTORES);
    });
});

describe("Menu", () => {

  let browser;
  let page;
  beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        defaultViewport: null
      });
      
      page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080
      });

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

  afterAll(() => browser.close());

  async function NavigateToMenu() {
    page.$eval('#Menu', el => el.click());
    const sidebar = await page.waitForSelector('#sidebarToggle');
    await sidebar.click();
  }

  test('Add an item to menu', async () => {

      // Navigate to menu
      await NavigateToMenu();

      const before = await page.$$('div[data-test-id="menu-item-card"]');
      expect(before.length).toBe(sampleData['Menu'].length);


      // Add item to menu
      const btn = await page.waitForSelector('button[data-test-id="add-new-item"]');
      await btn.click();

      await (await page.waitForSelector('button[data-test-id="new-card-edit"]')).click();
      await (await page.waitForSelector('input[data-test-id="new-card-item-name"]')).type('Test');
      await (await page.waitForSelector('input[data-test-id="new-card-item-price"]')).type('10');
      await (await page.waitForSelector('button[data-test-id="new-item-save"]')).click();
      console.log('Item added to menu');
      
      
      const after = await page.$$('div[data-test-id="menu-item-card"]');
      expect(after.length).toBe(before.length + 1);

  });

  test('Edit an item in menu', async () => {
    const before = await page.$$('div[data-test-id="menu-item-card"]');

    // Randomly select an item to edit
    const randomItem = Math.floor(Math.random() * before.length);
    const item = before[randomItem];
    const cardBody = await item.$('div.card-body');
    const editBtn = await cardBody.$('button[data-test-id="edit"]');
    await editBtn.click();

    const inputText = await cardBody.$('input[data-test-id="item-name"]');
    await inputText.type('Edited');
    const inputPrice = await cardBody.$('input[data-test-id="item-price"]');

    await inputPrice.type('0');
    const saveBtn = await cardBody.$('button[data-test-id="save"]');
    await saveBtn.click();

    // Check if item is edited
    const after = await page.$$('div[data-test-id="menu-item-card"]');
    const editedItem = after[randomItem];
    const editedCardBody = await editedItem.$('div.card-body');
    const editedItemName = await editedCardBody.$('input[data-test-id="item-name"]');
    const editedItemPrice = await editedCardBody.$('input[data-test-id="item-price"]');

    expect(await editedItemName.evaluate(el => el.value)).toBe('Edited');
    expect(await editedItemPrice.evaluate(el => el.value)).toBe('0');
  });

  test('Delete an item in menu', async () => {
    // disable confirm dialog, set it to always true
    await page.evaluate(() => {
      window.confirm = () => true;
    });

    
    // randomly select an item to delete
    const before = await page.$$('div[data-test-id="menu-item-card"]');
    const randomItem = Math.floor(Math.random() * before.length);
    const item = before[randomItem];
    const cardBody = await item.$('div.card-body');
    const deleteBtn = await cardBody.$('button[data-test-id="remove"]');
    await deleteBtn.click();

    // confirm delete
    page.on('dialog', async dialog => {
      console.log(dialog.message());

      await dialog.accept();
    });


    // check if item is deleted
    const after = await page.$$('div[data-test-id="menu-item-card"]');
    expect(after.length).toBe(before.length - 1);

  });

  test('Hide an item in menu', async () => {
    
  });

});
  