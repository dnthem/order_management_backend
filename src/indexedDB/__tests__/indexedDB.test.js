import "fake-indexeddb/auto";
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import indexedDBController from "../indexedDB";

const STORES = {
    MENU: "Menu",
    INCOME: "Income",
    CUSTOMERS: "Customers",
    ORDERSV2: "OrdersV2",
    ITEMCOUNT: "ItemCount",
}

const sampleData = {
    Menu: [
      {
        id: 1,
        Title: "Bánh Tráng Trộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        id: 2,
        Title: "Bánh Tráng Cuộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        id: 3,
        Title: "Trứng Nướng",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        id: 4,
        Title: "Bắp Xào",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        id: 5,
        Title: "Sữa Bắp",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
       
      },
      {
        id: 6,
        Title: "Xôi Xá Xíu",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
    ],
    Income: [
      {
        Date: new Date(2022,11,31).toLocaleDateString('en-us'),
        Total: 128
      },
      {
        Date: new Date(2023,0,1).toLocaleDateString('en-us'),
        Total: 128
      },
      {
        Date: new Date(2023,0,2).toLocaleDateString('en-us'),
        Total: 80
      },
      {
        Date: new Date(2023,0,3).toLocaleDateString('en-us'),
        Total: 140
      },
      {
        Date: new Date(2023,0,4).toLocaleDateString('en-us'),
        Total: 180
      },
      {
        Date: new Date(2023,0,5).toLocaleDateString('en-us'),
        Total: 350
      },
      {
        Date: new Date(2023,0,6).toLocaleDateString('en-us'),
        Total: 145
      },
      {
        Date: new Date(2023,0,7).toLocaleDateString('en-us'),
        Total: 100
      },
      {
        Date: new Date(2023,0,8).toLocaleDateString('en-us'),
        Total: 250
      },
      {
        Date: new Date(2023,0,9).toLocaleDateString('en-us'),
        Total: 175
      },
      {
        Date: new Date(2023,0,10).toLocaleDateString('en-us'),
        Total: 270
      },
    ],
    OrdersV2: [
      {
        orderDate: new Date().toLocaleDateString('en-us'),
        deliverDate: new Date().toLocaleDateString("en-us"),
        cart: [
          {
            name: "Bánh Tráng Trộn",
            price: 12,
            quantity: 1,
            id: 1,
          },
          {
            name: "Bánh Tráng Cuộn",
            price: 12,
            quantity: 1,
            id: 2,
          }
        ],
        customer: {
          customerID: 1,
          customerName: "John Doe",
          phone: "123-456-7890",
        },
        total: 24,
        paymentType: "Cash",
        notes: "nothing",
        status: false,
      },
  ],
    Customers : [
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
      }
    ]
  };

function createDB (dbName, version = undefined) {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(dbName, version);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
        
            const income = db.createObjectStore("Income", { keyPath: "Date" });
            const menu  = db.createObjectStore("Menu", { keyPath: "id", autoIncrement: true });
            const customers = db.createObjectStore("Customers", { keyPath: "customerID", autoIncrement: true });
            const orderV2 = db.createObjectStore("OrdersV2", { keyPath: "orderID", autoIncrement: true });
            const itemCount = db.createObjectStore("ItemCount", { keyPath: "Date" });
            income.createIndex("Date", "Date", { unique: true });

            itemCount.createIndex("Date", "Date", { unique: true });

            orderV2.createIndex("orderID", "orderID", { unique: true });
            orderV2.createIndex("customerID", "customer.customerID", { unique: false });
            orderV2.createIndex("deliverDate", "deliverDate", { unique: false });
            orderV2.createIndex("orderDate", "orderDate", {unique: false});

            customers.createIndex('customerID', 'customerID', { unique: true });
            customers.createIndex('phone', 'phone', { unique: true });

            menu.createIndex('id', 'id', { unique: true });
            sampleData['Menu'].forEach(e => menu.add(e));
            sampleData['Customers'].forEach(e => customers.add(e));
            sampleData['OrdersV2'].forEach(e => orderV2.add(e));
            sampleData['Income'].forEach(e => income.add(e));
        };
        request.onerror = (event) => reject(event.error);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

describe('IndexedDB tests', () => {
    let db;

    console.log = function() {};
  
    beforeAll(async () => {
      // Set up a fresh IndexedDB database for each test case
        db = await createDB('testDB', 1);
    });
  
    afterAll(() => {
      // Close the IndexedDB database after each test case
        db.close();
    });
  
    test('1. should add and retrieve data from the object store', async () => {
        const Customers = [
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
            }
          ]

        const result = await indexedDBController.getListOfRecords(db, STORES.CUSTOMERS, 'customerID', null);
    
        expect(result).toEqual(Customers);
    });
  
    // Add more test cases for other IndexedDB operations
    let customerID = 0;
    test('2. Should Add and Retrieve customer from Customers Store', async () => {
        const customer = {
            customerName: "John Doe",
            phone: "912-345-6789",
            orderCount: 5,
            totalSpent: 100,
        }   
            
        customerID = await indexedDBController.addData(db, STORES.CUSTOMERS, customer);

        customer.customerID = customerID;

        const result = await indexedDBController.getARecord(db, STORES.CUSTOMERS, customerID);

        expect(result).toEqual(customer);
    });

    test('3. Should Remove customer from Customers Store', async () => {

        await indexedDBController.deleteARecord(db, STORES.CUSTOMERS, customerID);

        const result = await indexedDBController.getARecord(db, STORES.CUSTOMERS, customerID);

        expect(result).toEqual(undefined);
    });

    test('4. Should Add and Retrieve Order from OrdersV2 Store', async () => {
        const order = {
            customer: {
                customerID: 1,
                customerName: "John Doe",
                phone: "123-456-7890",
            },
            orderDate: "2021-01-01",
            deliverDate: "2021-01-02",
            orderItems: [
                {
                    id: 1,
                    Title: "Pizza",
                    Price: 10,
                    Quantity: 2,
                }
            ],
            total: 20,
            paymentType: "Cash",
            notes: "No Notes",
            status: false,
        }

        const id = await indexedDBController.addData(db, STORES.ORDERSV2, order);

        order.orderID = id;

        const result = await indexedDBController.getARecord(db, STORES.ORDERSV2, id);

        expect(result).toEqual(order);
        
    });
    
    test('5. Should Add and Retrieve Income from Income Store', async () => {

        const income = {
            Date: new Date().toLocaleDateString('en-US'),
            Total: 100,
        }

        await indexedDBController.addData(db, STORES.INCOME, income);

        const result = await indexedDBController.getARecord(db, STORES.INCOME, income.Date);

        expect(result).toEqual(income);
    });

    test('6. Should Add and Retrieve ItemCount from ItemCount Store', async () => {

        const itemCount = {
            Date: new Date().toLocaleDateString('en-US'),
            Count: 100,
        }

        await indexedDBController.addData(db, STORES.ITEMCOUNT, itemCount);

        const result = await indexedDBController.getARecord(db, STORES.ITEMCOUNT, itemCount.Date);

        expect(result).toEqual(itemCount);

    });

    let newMenuID;

    test('7. Should Add and Retrieve Menu from Menu Store', async () => {

        const menu = {
            Title: "Pizza",
            Price: 10,
            Content: undefined,
            Photo: undefined,
            Count: 0,
        }

        newMenuID  = await indexedDBController.addData(db, STORES.MENU, menu);

        menu.id = newMenuID;

        const result = await indexedDBController.getARecord(db, STORES.MENU, newMenuID);

        expect(result).toEqual(menu);

    });

    test('8. Should remove a record from Menu store', async () => {

        await indexedDBController.deleteARecord(db, STORES.MENU, newMenuID);

        const result = await indexedDBController.getARecord(db, STORES.MENU, newMenuID);

        expect(result).toEqual(undefined);
    });

    test('9. Should retreive all records from Menu store', async () => {

        const result = await indexedDBController.getListOfRecords(db, STORES.MENU, 'id', null);

        expect(result).toEqual(sampleData['Menu']);
        expect(result.length).toEqual(sampleData['Menu'].length);
    });

    test('10. Should update a record from Menu store', async () => {

        const menu = {
            id: 2,
            Title: "Pizza",
            Price: 10,
            Content: undefined,
            Photo: undefined,
            Count: 10
        }

        await indexedDBController.updateARecord(db, STORES.MENU, menu);

        const result = await indexedDBController.getARecord(db, STORES.MENU, menu.id);

        expect(result).toEqual(menu);
    });

    test('11. Should Delete all records from Menu store', async () => {

        await indexedDBController.deleteAllRecord(db, STORES.MENU);

        const result = await indexedDBController.getListOfRecords(db, STORES.MENU, 'id', null);

        expect(result).toEqual([]);

    });


    test('12. Should Get A limited number of records from Customers store', async () => {

        const result = await indexedDBController.getLimitRecords(db, STORES.CUSTOMERS, 'customerID', 2);

        expect(result.length).toEqual(2);
    });


    test('13. Get more than the number of records from Customers store', async () => {

        const result = await indexedDBController.getLimitRecords(db, STORES.CUSTOMERS, 'customerID', 10);

        expect(result.length).toEqual(7);
    });

    test('14. Should add a list of records to Menu store', async () => {
  
          await indexedDBController.addListDataToStore(db, STORES.MENU, sampleData['Menu']);
  
          const result = await indexedDBController.getListOfRecords(db, STORES.MENU, 'id', null);
  
          expect(result).toEqual(sampleData['Menu']);
    });
  });