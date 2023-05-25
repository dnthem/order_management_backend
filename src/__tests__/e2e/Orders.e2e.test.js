import puppeteer from "puppeteer";
import { pageUrl, databaseName, version, store, NUMBEROFSTORES } from "../config";
import sampleData from "../../indexedDB/sampleData";
// Delay function
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

describe('Orders', () => {

    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            defaultViewport: false
        }); // error if not headless : 'old not used :
        
        page = await browser.newPage();
        
        await page.goto(pageUrl, { waitUntil: 'networkidle0' });
    });

    afterAll(() => browser.close());

    async function NavigateToOrders() {
        page.$eval('#Orders', el => el.click());
        const sidebar = await page.waitForSelector('#sidebarToggle');
        await sidebar.click();
      }

    test('Check number of orders', async () => {
        NavigateToOrders();
        
        const cards = await page.$$('div[data-test-id="order-card"]');
        expect(cards.length).toBe(0);
    });

    test('Check add customer form dialog', async () => {
        await page.waitForTimeout(100);
        const btnAddOrder = await page.waitForSelector('button[data-test-id="add-new-order-btn"]');
        await btnAddOrder.click();

        const addCustomerForm = await page.waitForSelector('div[data-test-id="add-customer-form"]');
        expect(addCustomerForm).not.toBeNull();
    });


    test('Test add customer form -> add to order form shows up', async () => {

        const addCustomerForm = await page.waitForSelector('div[data-test-id="add-customer-form"]');

        const customerNameInput = await addCustomerForm.$('input[data-test-id="customer-name-input"]');
        await customerNameInput.type('Test');
        const customerPhoneInput = await addCustomerForm.$('input[data-test-id="phone-input"]');
        await customerPhoneInput.type('1234567890');
        const confirmBtn = await addCustomerForm.$('button[data-test-id="confirm-btn"]');
        await confirmBtn.click();

        const addToOrderForm = await page.waitForSelector('div[data-test-id="add-to-order-form"]');
        expect(addToOrderForm).not.toBeNull();
    });

    test('Check if the number of menu items are correct', async () => {
        
        const menuItems = await page.$$('tr[data-test-id="menu-table-card"]');
        expect(menuItems.length).toBe(sampleData['Menu'].length);
    });

    test('Add 4 items to cart and check for correct prices', async () => {      
        const menuItems = await page.$$('tr[data-test-id="menu-table-card"]');
        let counter = 0;
        let totalPrice = 0;

        for (let i = 0; i < 4; i++) {
            const addToOrderBtn = await menuItems[i].$('td > button[data-test-id="add-to-order-btn"]');
            await addToOrderBtn.click();
            counter++;
            totalPrice += await menuItems[i].$eval('td[data-test-id="menu-table-card-price"]', el => parseFloat(el.innerText.slice(1)));
  
            if (counter === 4)
                break;
        }
        
        const addToOrderForm = await page.$('div[data-test-id="add-to-order-form"]');
        const total = await addToOrderForm.$eval('span[data-test-id="order-total"]', el => parseFloat(el.innerText.slice(1)));
        const orderItems = await page.$$('li[data-test-id="customer-cart-card"]');
        expect(orderItems.length).toBe(4);
        expect(total).toBe(totalPrice);
        
    });

    test('Confirm order -> close add-to-order form', async () => {
        const addToOrderForm = await page.$('div[data-test-id="add-to-order-form"]');
        const confirmBtn = await addToOrderForm.$('button[data-test-id="add-to-order-form-btn"]');
        await confirmBtn.click();

        const addToOrderFormClosed = await page.$('div[data-test-id="add-to-order-form"]');
        expect(addToOrderFormClosed).toBeNull();
    });

    test('Check if the number of orders is correct', async () => {

        const cards = await page.$$('div[data-test-id="order-card"]');
        expect(cards.length).toBe(1);
    });

});