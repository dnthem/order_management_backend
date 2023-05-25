import puppeteer from "puppeteer";



describe("App.js", () => {
    let browser;
    let page;
    const databaseName = "ORDER_MANAGEMENT";
    const pageUrl = "https://localhost:5173/";
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: 'old'});
      page = await browser.newPage();
      await page.goto('chrome://indexeddb-internals');
      await page.evaluate(() => {
        try {
            indexedDB.deleteDatabase(databaseName);
        } catch (e)
        {
            console.log(e);
        }
      });

      await page.goto(pageUrl); 
    });

    afterAll(() => browser.close());
  
    test('Check if indexedDB is created', async () => {
      const result = await page.evaluate(() => {
        const db = indexedDB.open('ORDER_MANAGEMENT', 1);
        return db !== null;
      });

      expect(result).toBe(true);
    });

  });