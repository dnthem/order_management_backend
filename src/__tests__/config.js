export const databaseName = "ORDER_MANAGEMENT";
export const version = 1;
export const pageUrl = import.meta.env.VITE_PREVIEW_URL || "https://localhost:5173/";
export const store = "Menu";
export const NUMBEROFSTORES = 6;


export const parseCurrency = (value) => {
    return parseFloat(value.replace(/[^0-9.-]+/g,""));
}

export  async function NavigateTo(page, tag) {
    page.$eval(tag, el => el.click());
    const sidebar = await page.waitForSelector('#sidebarToggle');
    await sidebar.click();
}

test("Test config", () => {
    expect(true).toBe(true);
});