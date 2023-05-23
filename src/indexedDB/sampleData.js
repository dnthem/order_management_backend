const sampleData = {
  IncomeUpToDate: [
    {
      Date: new Date(2022, 11, 31).toLocaleDateString("en-us"),
      Total: 1928,
      UpdatedTime: new Date().getUTCMilliseconds(),
    },
  ],
  Menu: [
    {
      Title: "Orange chicken bowl",
      Price: 12,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Spicy beef stir-fry",
      Price: 15,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Teriyaki salmon sushi roll",
      Price: 10,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Vegetable curry with rice",
      Price: 9,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Grilled chicken Caesar salad",
      Price: 8,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Margherita pizza",
      Price: 11,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Miso soup",
      Price: 4,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Beef burrito",
      Price: 13,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Penne arrabbiata",
      Price: 9,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
    {
      Title: "Grilled vegetable sandwich",
      Price: 7,
      Content: undefined,
      Photo: undefined,
      Count: 0,
    },
  ],
  Income: [
    {
      Date: new Date(2022, 11, 31).toLocaleDateString("en-us"),
      Total: 128,
    },
    {
      Date: new Date(2023, 0, 1).toLocaleDateString("en-us"),
      Total: 128,
    },
    {
      Date: new Date(2023, 0, 2).toLocaleDateString("en-us"),
      Total: 80,
    },
    {
      Date: new Date(2023, 0, 3).toLocaleDateString("en-us"),
      Total: 140,
    },
    {
      Date: new Date(2023, 0, 4).toLocaleDateString("en-us"),
      Total: 180,
    },
    {
      Date: new Date(2023, 0, 5).toLocaleDateString("en-us"),
      Total: 350,
    },
    {
      Date: new Date(2023, 0, 6).toLocaleDateString("en-us"),
      Total: 145,
    },
    {
      Date: new Date(2023, 0, 7).toLocaleDateString("en-us"),
      Total: 100,
    },
    {
      Date: new Date(2023, 0, 8).toLocaleDateString("en-us"),
      Total: 250,
    },
    {
      Date: new Date(2023, 0, 9).toLocaleDateString("en-us"),
      Total: 175,
    },
    {
      Date: new Date(2023, 0, 10).toLocaleDateString("en-us"),
      Total: 270,
    },
  ],
  OrdersV2: [
    {
      orderDate: new Date().toLocaleDateString('en-US'),
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 2,
        customerName: "Jane Smith",
        phone: "555-123-4567",
      },
      cart: [
        { id: 1, name: "Orange chicken bowl", price: 12, quantity: 1 },
        { id: 2, name: "Spicy beef stir-fry", price: 15, quantity: 1 },
        { id: 3, name: "Teriyaki salmon sushi roll", price: 10, quantity: 1 },
        { id: 4, name: "Vegetable curry with rice", price: 9, quantity: 1 },
        { id: 5, name: "Grilled chicken Caesar salad", price: 8, quantity: 1 },
        { id: 6, name: "Margherita pizza", price: 11, quantity: 3 },
        { id: 7, name: "Miso soup", price: 4, quantity: 1 },
      ],
      total: 91,
      paymentType: "Cash",
      notes: "I don't like spicy",
      status: false,
      orderID: 1,
    },
    {
      orderDate: "5/17/2023",
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 5,
        customerName: "Tom Green",
        phone: "555-888-9999",
      },
      cart: [
        { id: 1, name: "Orange chicken bowl", price: 12, quantity: 3 },
        { id: 2, name: "Spicy beef stir-fry", price: 15, quantity: 2 },
        { id: 3, name: "Teriyaki salmon sushi roll", price: 10, quantity: 1 },
        { id: 9, name: "Penne arrabbiata", price: 9, quantity: 3 },
      ],
      total: 103,
      paymentType: "Cash",
      notes: "",
      status: false,
      orderID: 2,
    },
    {
      orderDate: new Date().toLocaleDateString('en-US'),
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 3,
        customerName: "Bob Johnson",
        phone: "555-555-1212",
      },
      cart: [
        { id: 3, name: "Teriyaki salmon sushi roll", price: 10, quantity: 2 },
        { id: 4, name: "Vegetable curry with rice", price: 9, quantity: 2 },
        { id: 5, name: "Grilled chicken Caesar salad", price: 8, quantity: 2 },
        { id: 6, name: "Margherita pizza", price: 11, quantity: 5 },
      ],
      total: 109,
      paymentType: "Cash",
      notes: "",
      status: true,
      orderID: 3,
      completedTime: "17:24",
    },
    {
      orderDate: new Date().toLocaleDateString('en-US'),
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 6,
        customerName: "Sally Brown",
        phone: "555-777-1212",
      },
      cart: [
        { id: 3, name: "Teriyaki salmon sushi roll", price: 10, quantity: 3 },
        { id: 4, name: "Vegetable curry with rice", price: 9, quantity: 3 },
        { id: 5, name: "Grilled chicken Caesar salad", price: 8, quantity: 4 },
        { id: 1, name: "Orange chicken bowl", price: 12, quantity: 4 },
        { id: 10, name: "Grilled vegetable sandwich", price: 7, quantity: 1 },
      ],
      total: 144,
      paymentType: "Cash",
      notes: "",
      status: true,
      orderID: 4,
      completedTime: "17:23",
    },
    {
      orderDate: new Date().toLocaleDateString('en-US'),
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 1,
        customerName: "John Doe",
        phone: "123-456-7890",
      },
      cart: [
        { id: 3, name: "Teriyaki salmon sushi roll", price: 10, quantity: 3 },
        { id: 4, name: "Vegetable curry with rice", price: 9, quantity: 10 },
      ],
      total: 120,
      paymentType: "Cash",
      notes: "",
      status: true,
      orderID: 5,
      completedTime: "17:24",
    },
    {
      orderDate: new Date().toLocaleDateString('en-US'),
      deliverDate: new Date().toLocaleDateString('en-US'),
      customer: {
        customerID: 4,
        customerName: "Alice Lee",
        phone: "987-654-3210",
      },
      cart: [
        { id: 10, name: "Grilled vegetable sandwich", price: 7, quantity: 4 },
        { id: 8, name: "Beef burrito", price: 13, quantity: 6 },
      ],
      total: 106,
      paymentType: "Cash",
      notes: "",
      status: false,
      orderID: 6,
    },
  ],
  Customers: [
    {
      customerID: 1,
      customerName: "John Doe",
      phone: "123-456-7890",
      orderCount: 5,
      totalSpent: 100,
    },
    {
      customerID: 2,
      customerName: "Jane Smith",
      phone: "555-123-4567",
      orderCount: 2,
      totalSpent: 50,
    },
    {
      customerID: 3,
      customerName: "Bob Johnson",
      phone: "555-555-1212",
      orderCount: 3,
      totalSpent: 75,
    },
    {
      customerID: 4,
      customerName: "Alice Lee",
      phone: "987-654-3210",
      orderCount: 1,
      totalSpent: 25,
    },
    {
      customerID: 5,
      customerName: "Tom Green",
      phone: "555-888-9999",
      orderCount: 7,
      totalSpent: 175,
    },
    {
      customerID: 6,
      customerName: "Sally Brown",
      phone: "555-777-1212",
      orderCount: 2,
      totalSpent: 50,
    },
    {
      customerID: 7,
      customerName: "Jim Black",
      phone: "123-456-1230",
      orderCount: 5,
      totalSpent: 100,
    },
  ],
};

export default sampleData;
