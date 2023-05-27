export const databaseName = "ORDER_MANAGEMENT";
export const version = 1;
export const pageUrl = import.meta.env.VITE_PREVIEW_URL || "https://localhost:5173/";
export const store = "Menu";
export const NUMBEROFSTORES = 6;


export const parseCurrency = (value) => {
    return parseFloat(value.replace(/[^0-9.-]+/g,""));
}

test("Test config", () => {
    expect(true).toBe(true);
});