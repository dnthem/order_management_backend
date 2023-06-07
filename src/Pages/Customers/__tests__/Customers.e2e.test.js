import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import puppeteer from "puppeteer";
import { launchOptions, NavigateTo, delay } from '../../../__tests__/config';
import { preview } from 'vite';
import { phoneFormat } from '../../../utils';

describe("Customers Page tests", () => {
    let server;
    let browser;
    let page;

    // random port
    const port = Math.floor(Math.random() * 1000) + 3000;
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

    test('1. Add a customer', async () => {
        await NavigateTo(page, pageUrl, 'Customers');

        const addCustomerButton = await page.waitForSelector('[aria-label="add-new-customer-btn"]');
        await addCustomerButton.click();
        const customerNameInput = await page.waitForSelector('[data-test-id="customer-name-input"]');
        await customerNameInput.type('Test Customer');
        const customerPhoneInput = await page.waitForSelector('[data-test-id="phone-input"]');
        await customerPhoneInput.type('1234567890');
        const confirmBtn = await page.waitForSelector('[data-test-id="confirm-btn"]');
        await confirmBtn.click();

        await delay(200);
        await page.waitForSelector('[aria-label="customer-table-row"]')
        const customerTableRows = await page.$$('[aria-label="customer-table-row"]');
        expect(customerTableRows.length).toBe(1);
    });

    test('2. Edit a customer', async () => {
        const editCustomerButton = await page.waitForSelector('button[aria-label="edit-customer-btn"]');
        await editCustomerButton.click();
        const customerNameInput = await page.waitForSelector('input[aria-label="customer-name-input"]');
        page.$eval('input[aria-label="customer-name-input"]', el => el.value = '');
        await delay(50);
        await customerNameInput.type('Test Customer Edited');
        const confirmBtn = await page.waitForSelector('[aria-label="save-edit-customer-btn"]');
        await confirmBtn.click();

        await delay(200);
        // there's only one row
        const customerName = await page.$eval('[aria-label="customer-name"]', el => el.innerText);
        expect(customerName).toBe('Test Customer Edited');
    });

    test('3. Edit a customer with a new phone number', async () => {
        await delay(50);
        const phoneNumber = '0987654321'
        const editCustomerButton = await page.waitForSelector('button[aria-label="edit-customer-btn"]');
        await editCustomerButton.click();
        const customerPhoneInput = await page.waitForSelector('input[aria-label="customer-phone-input"]');
        page.$eval('input[aria-label="customer-phone-input"]', el => el.value = '');
        await delay(50);
        await customerPhoneInput.type(phoneNumber);
        const confirmBtn = await page.waitForSelector('[aria-label="save-edit-customer-btn"]');
        await confirmBtn.click();

        await delay(200);
        // there's only one row
        const customerPhone = await page.$eval('[aria-label="customer-phone"]', el => el.innerText);
        expect(customerPhone).toBe(phoneFormat(phoneNumber));
    });

    test('4. Delete a customer', async () => {
        await page.evaluate(() => {
            window.confirm = () => true;
        });
        await delay(50);
        const deleteCustomerButton = await page.waitForSelector('button[aria-label="remove-customer-btn"]');
        await deleteCustomerButton.click();

        await delay(200);
        const customerTableRows = await page.$$('[aria-label="customer-table-row"]');
        expect(customerTableRows.length).toBe(0);
    });

    /**
     * Tag list for elements:
     * search input: [aria-label="customer-search-input"]
     * add customer button: [aria-label="add-new-customer-btn"]
     * customer table row: [aria-label="customer-table-row"]
     * customer name: [aria-label="customer-name"]
     * customer phone: [aria-label="customer-phone"]
     * edit customer button: [aria-label="edit-customer-btn"]
     * delete customer button: [aria-label="remove-customer-btn"]
     * edit customer name input: [aria-label="customer-name-input"]
     * edit customer phone input: [aria-label="customer-phone-input"]
     * confirm edit customer button: [aria-label="save-edit-customer-btn"]
     * cancel add customer button: [aria-label="cancel-edit-customer-btn"]
     * next page button: [aria-label="Next"]
     * previous page button: [aria-label="Previous"]
     * select entry per page: [aria-label="Entry per page"]
     * select sort by: [aria-label="Sort by"]
     * customer total orders: [aria-label="customer-order-count"]
     * customer total spent: [aria-label="customer-total-spent"]
     * customer last perchase: [aria-label="customer-last-purchase"]
     * customer registeration date: [aria-label="customer-registeration-date"]
     */

    // list of 20 customers with different names and phone numbers, names should only contain letters and spaces
    // phone numbers should only contain numbers, 10 digits long, and unique
    const customers = [{ name: "Cindy", phone: "123-123-1231"},
                        { name: "andrew", phone: "123-123-1232"},
                        { name: "Tony", phone: "123-123-1233"},
                        { name: "Cindya", phone: "123-123-1234"},
                        { name: "Cindyb", phone: "123-123-1235"},
                        { name: "Cindyd", phone: "123-123-1236"},
                        { name: "Cindyf", phone: "123-123-1237"},
                        { name: "Cindyp", phone: "123-123-1238"},
                        { name: "Cindx", phone: "123-123-1239"},
                        { name: "Cindt", phone: "123-123-1240"},
                        { name: "Cindp", phone: "123-123-1241"},
                        { name: "Cindq", phone: "123-123-1242"},
                        { name: "Cinda", phone: "123-123-1243"},
                        { name: "Cindb", phone: "123-123-1244"},
                        { name: "Cindc", phone: "123-123-1245"},
                        { name: "Cindd", phone: "123-123-1246"},
                        { name: "Cinde", phone: "123-123-1247"},
                        { name: "Cindf", phone: "123-123-1248"},
                        { name: "Cindg", phone: "123-123-1249"},
                        { name: "Cindh", phone: "123-123-1250"},
                        { name: "Cindh", phone: "123-123-1251"}];
    // test add 20 customers and check the number of rows in the table should be 10 by default
    test('5. Add 20 customers', async () => {
        await NavigateTo(page, pageUrl, 'Customers');
      
        const addCustomerButton = await page.waitForSelector('[aria-label="add-new-customer-btn"]');
        
        for (let i = 0; i < customers.length; i++) {
          await addCustomerButton.click();
      
          await page.waitForSelector('[data-test-id="customer-name-input"]');
          await page.type('[data-test-id="customer-name-input"]', customers[i].name);
      
          await page.waitForSelector('[data-test-id="phone-input"]');
          await page.type('[data-test-id="phone-input"]', customers[i].phone);
      
          await page.waitForSelector('[data-test-id="confirm-btn"]');
          await page.click('[data-test-id="confirm-btn"]');
        }
      
        await page.waitForSelector('[aria-label="customer-table-row"]');
      
        const customerTableRows = await page.$$('[aria-label="customer-table-row"]');
        expect(customerTableRows.length).toBe(10);
      }, 10000);
      

    // Test search by name
    test('6. Search by name', async () => {
        const searchInput = await page.waitForSelector('[aria-label="customer-search-input"]');
        await searchInput.type('Cindy');
        await delay(200);
        await page.waitForSelector('[aria-label="customer-table-row"]');
        const customerTableRows = await page.$$('[aria-label="customer-table-row"]');
        expect(customerTableRows.length).toBe(6);
        
    }, 15_000);

    // Test show entry per page 50
    test('7. Show entry per page 50', async () => {
        // clean up previous search
        const searchInput = await page.waitForSelector('[aria-label="customer-search-input"]');
        await searchInput.focus();
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Backspace');
        }
        await delay(200);
        // select entry per page 50
        const selectEntryPerPage = await page.waitForSelector('[aria-label="Entry per page"]');
        await selectEntryPerPage.click();
        await selectEntryPerPage.select('50');
        await delay(200);
        await page.waitForSelector('[aria-label="customer-table-row"]');
        const customerTableRows = await page.$$eval('[aria-label="customer-table-row"]', rows => {return Array.from(rows).map(row => row.outerHTML)});
        expect(customerTableRows.length).toBe(20);
    }, 5_000);
      
    // Delete 5 customers
    test('8. Delete 5 customers', async () => {
        // delete 5 customers
        await page.evaluate(() => {
            window.confirm = () => true;
        });
        await delay(50);
        const deleteCustomerButtons = await page.$$('[aria-label="remove-customer-btn"]');
        for (let i = 0; i < 5; i++) {
            await deleteCustomerButtons[i].click();
            await delay(50);
        }
        await delay(200);
        const customerTableRows = await page.$$('[aria-label="customer-table-row"]');
        expect(customerTableRows.length).toBe(15);
    });
});