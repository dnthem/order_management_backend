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

export  async function NavigateTo(page, pageUrl, target) {
    // convert the first letter to upper case
    let tag = target.charAt(0).toUpperCase() + target.slice(1);
    const link = await page.waitForSelector(`#${tag}`);
    await link.click();
    await delay(100);
}

export async function delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}