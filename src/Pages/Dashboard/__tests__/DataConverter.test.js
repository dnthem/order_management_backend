import { describe, test, expect } from "vitest";
import sampleData from "../../../indexedDB/sampleData.js";
import * as dataConverter from "../DataConverter.js";
describe("DataConverter", () => {
    const Menu = [
        {
            Title: "Orange chicken bowl",
            Price: 12,
            Count: 5,
        },
        {
            Title: "Spicy beef stir-fry",
            Price: 15,
            Count: 10,
        },
        {
            Title: "Teriyaki salmon sushi roll",
            Price: 10,
            Count: 15,
        },
        {
            Title: "Vegetable curry with rice",
            Price: 9,
            Count: 20,
        },
        {
            Title: "Grilled chicken Caesar salad",
            Price: 8,
            Count: 25,
        },
        {
            Title: "Margherita pizza",
            Price: 11,
            Count: 30,
        },
        {
            Title: "Miso soup",
            Price: 4,
            Count: 35,
        },
    ]
    test("1. should convert menu", () => {
        
        const result = dataConverter.dataConverterMenu(Menu, 7);
        const mostSold = result.labels[0];

        expect(result.labels.length).toBe(7);
        expect(result.data.length).toBe(7);
        expect(mostSold).toBe("Miso soup");
    });

    test("2. should convert total Item sold", () => {
        const result = dataConverter.getTotalItemSold(Menu);
        expect(result).toBe(140);
    });

    test("3. should get income trending -Infinity", () => {
        const result = dataConverter.getIncomeTrending(sampleData.Income);
        expect(result).toBe(-Infinity);
    });

    test("4. should convert income chart", () => {
        const result = dataConverter.incomeChartConverter(sampleData.Income);
        expect(result.labels.length).toBe(11);
        expect(result.data.length).toBe(11);
    });


    test("5. should get income trending positive", () => {
        // sample data contains 2 days of income
        // the first day is the current day
        // the second day is the previous day
        // so the income trending should be positive
        const sampleIncome = [ { Date: new Date().toLocaleDateString('us-en'), Total: 100 }, { Date: new Date(Date.now() - 86400000).toLocaleDateString('us-en'), Total: 50 } ];
        const result = dataConverter.getIncomeTrending(sampleIncome);
        expect(result).toBe(Number(50).toFixed(2));
    });

    test("6. should get income trending negative", () => {
        // sample data contains 2 days of income
        // the first day is the current day
        // the second day is the previous day
        // so the income trending should be negative
        const sampleIncome = [ { Date: new Date().toLocaleDateString('us-en'), Total: 50 }, { Date: new Date(Date.now() - 86400000).toLocaleDateString('us-en'), Total: 100 } ];
        const result = dataConverter.getIncomeTrending(sampleIncome);
        expect(result).toBe(Number(-100).toFixed(2));
    });
});