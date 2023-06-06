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
});