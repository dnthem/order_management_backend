import { describe, expect, test } from "vitest";
import * as util from "../index.js";

describe("apiDataConverter", () => {
  test("1. convertAPItoCustomer", () => {
    const apiCustomer = {
      _id: 1,
      customerName: "test",
      phone: "1234567890",
    };
    const expected = {
      customerID: 1,
      customerName: "test",
      phone: "1234567890",
    };
    const actual = util.convertAPItoCustomer(apiCustomer);
    expect(actual).toEqual(expected);
  });
  test("2. convertCustomerToAPI", () => {
    const customer = {
      customerID: 1,
      customerName: "test",
      phone: "1234567890",
    };
    const expected = {
      _id: 1,
      customerName: "test",
      phone: "1234567890",
    };
    const actual = util.convertCustomerToAPI(customer);
    expect(actual).toEqual(expected);
  });

  test("3. convertAPItoIncome", () => {
    const apiIncome = {
      _id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const expected = {
      id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const actual = util.convertAPItoIncome(apiIncome);
    expect(actual).toEqual(expected);
  });
  test("4. convertIncomeToAPI", () => {
    const income = {
      id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const expected = {
      _id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const actual = util.convertIncomeToAPI(income);
    expect(actual).toEqual(expected);
  });

  test("5. convertAPItoIncomeUpToDate", () => {
    const apiIncomeUpToDate = {
      _id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const expected = {
      id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const actual = util.convertAPItoIncomeUpToDate(apiIncomeUpToDate);
    expect(actual).toEqual(expected);
  });

  test("6. convertIncomeUpToDateToAPI", () => {
    const incomeUpToDate = {
      id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const expected = {
      _id: 1,
      Date: "1/1/2021",
      Total: 123,
    };
    const actual = util.convertIncomeUpToDateToAPI(incomeUpToDate);
    expect(actual).toEqual(expected);
  });

  test("7. convertAPItoMenu", () => {
    const apiMenu = {
      _id: 1,
      name: "test",
      price: 123,
    };
    const expected = {
      id: 1,
      name: "test",
      price: 123,
    };
    const actual = util.convertAPItoMenu(apiMenu);
    expect(actual).toEqual(expected);
  });

  test("8. convertMenuToAPI", () => {
    const menu = {
      id: 1,
      name: "test",
      price: 123,
    };
    const expected = {
      _id: 1,
      name: "test",
      price: 123,
    };
    const actual = util.convertMenuToAPI(menu);
    expect(actual).toEqual(expected);
  });

  test("9. convertOrderToAPI", () => {
    const order = {
      orderID: 1,
      promotion: 0,
      orderDate: "1/1/2021",
      deliverDate: "1/1/2021",
      customer: {
        customerID: 1,
        customerName: "Jane Smith",
        phone: "555-123-4567",
      },
      cart: [
        { id: 1, name: "Orange chicken bowl", price: 12, quantity: 1 },
        { id: 2, name: "Spicy beef stir-fry", price: 15, quantity: 1 },
      ],
      total: 91,
      paymentType: "Cash",
      notes: "I don't like spicy",
      status: false,
      nthOrderOfDay: 1,
    };
    const expected = {
      _id: 1,
      promotion: 0,
      orderDate: "1/1/2021",
      deliverDate: "1/1/2021",
      customer: 1,
      cart: [
        {
          item: 1,
          quantity: 1,
        },
        {
          item: 2,
          quantity: 1,
        },
      ],
      total: 91,
      paymentType: "Cash",
      notes: "I don't like spicy",
      status: false,
      nthOrderOfDay: 1,
    };
    const actual = util.convertOrderToAPI(order);
    expect(actual).toEqual(expected);
  });

  test("10. convertAPItoOrder", () => {
    const apiOrder = {
      _id: 1,
      promotion: 0,
      orderDate: "1/1/2021",
      deliverDate: "1/1/2021",
      customer: {
        _id: 1,
        customerName: "Jane Smith",
        phone: "555-123-4567",
      },
      cart: [
        {
          item: {
            _id: 1,
            Title: "Orange chicken bowl",
            Price: 12,
          },
          quantity: 1,
        },
        {
          item: {
            _id: 2,
            Title: "Spicy beef stir-fry",
            Price: 15,
          },
          quantity: 1,
        },
      ],
      total: 91,
      paymentType: "Cash",
      notes: "I don't like spicy",
      status: false,
      nthOrderOfDay: 1,
    };
    const expected = {
      orderID: 1,
      promotion: 0,
      orderDate: "1/1/2021",
      deliverDate: "1/1/2021",
      customer: {
        customerID: 1,
        customerName: "Jane Smith",
        phone: "555-123-4567",
      },
      cart: [
        {
          id: 1,
          name: "Orange chicken bowl",
          price: 12,
          quantity: 1,
        },
        {
          id: 2,
          name: "Spicy beef stir-fry",
          price: 15,
          quantity: 1,
        },
      ],
      total: 91,
      paymentType: "Cash",
      notes: "I don't like spicy",
      status: false,
      nthOrderOfDay: 1,
    };
    const actual = util.convertAPItoOrder(apiOrder);
    expect(actual).toEqual(expected);
  });
});
