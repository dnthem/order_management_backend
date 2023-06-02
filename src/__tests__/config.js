export const databaseName = "ORDER_MANAGEMENT";
export const version = 1;
export const pageUrl = "http://localhost:3000/";
export const store = "Menu";
export const NUMBEROFSTORES = 6;

export const launchOptions = {
    slowMo: 0,
    headless: 'new',
    devtools: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
};


export const parseCurrency = (value) => {
    return parseFloat(value.replace(/[^0-9.-]+/g,""));
}

export  async function NavigateTo(page, tag) {
    page.$eval(tag, el => el.click());
    const sidebar = await page.waitForSelector('#sidebarToggle');
    await sidebar.click();
}

export async function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}