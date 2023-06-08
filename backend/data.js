const serverData = {
  "Income": [
    {
      "id": "1/1/2023",
      "Total": 128
    },
    {
      "id": "1/10/2023",
      "Total": 270
    },
    {
      "id": "1/2/2023",
      "Total": 80
    },
    {
      "id": "1/3/2023",
      "Total": 140
    },
    {
      "id": "1/4/2023",
      "Total": 180
    },
    {
      "id": "1/5/2023",
      "Total": 350
    },
    {
      "id": "1/6/2023",
      "Total": 145
    },
    {
      "id": "1/7/2023",
      "Total": 100
    },
    {
      "id": "1/8/2023",
      "Total": 250
    },
    {
      "id": "1/9/2023",
      "Total": 175
    },
    {
      "id": "12/31/2022",
      "Total": 128
    },
    {
      "Total": 876,
      "id": "6/8/2023"
    }
  ],
  "Menu": [
    {
      "Title": "Orange chicken bowl",
      "Price": 12,
      "Count": 10,
      "id": 1
    },
    {
      "Title": "Spicy beef stir-fry",
      "Price": 15,
      "Count": 5,
      "id": 2
    },
    {
      "Title": "Teriyaki salmon sushi roll",
      "Price": 10,
      "Count": 15,
      "id": 3
    },
    {
      "Title": "Vegetable curry with rice",
      "Price": 9,
      "Count": 18,
      "id": 4
    },
    {
      "Title": "Grilled chicken Caesar salad",
      "Price": 8,
      "Count": 7,
      "id": 5
    },
    {
      "Title": "Margherita pizza",
      "Price": 11,
      "Count": 8,
      "id": 6
    },
    {
      "Title": "Miso soup",
      "Price": 4,
      "Count": 1,
      "id": 7
    },
    {
      "Title": "Beef burrito",
      "Price": 13,
      "Count": 11,
      "id": 8
    },
    {
      "Title": "Penne arrabbiata",
      "Price": 9,
      "Count": 4,
      "id": 9
    },
    {
      "Title": "Grilled vegetable sandwich",
      "Price": 7,
      "Count": 6,
      "id": 10
    }
  ],
  "OrdersV2": [
    {
      "promotion": 0,
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 2,
        "customerName": "Jane Smith",
        "phone": "555-123-4567"
      },
      "cart": [
        {
          "id": 1,
          "name": "Orange chicken bowl",
          "price": 12,
          "quantity": 1
        },
        {
          "id": 2,
          "name": "Spicy beef stir-fry",
          "price": 15,
          "quantity": 1
        },
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 1
        },
        {
          "id": 4,
          "name": "Vegetable curry with rice",
          "price": 9,
          "quantity": 1
        },
        {
          "id": 5,
          "name": "Grilled chicken Caesar salad",
          "price": 8,
          "quantity": 1
        },
        {
          "id": 6,
          "name": "Margherita pizza",
          "price": 11,
          "quantity": 3
        },
        {
          "id": 7,
          "name": "Miso soup",
          "price": 4,
          "quantity": 1
        }
      ],
      "total": 91,
      "paymentType": "Cash",
      "notes": "I don't like spicy",
      "status": true,
      "nthOrderOfDay": 1,
      "completedTime": "0:56",
      "id": 1
    },
    {
      "promotion": 0,
      "nthOrderOfDay": 2,
      "orderDate": "5/17/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 5,
        "customerName": "Tom Green",
        "phone": "555-888-9999"
      },
      "cart": [
        {
          "id": 1,
          "name": "Orange chicken bowl",
          "price": 12,
          "quantity": 3
        },
        {
          "id": 2,
          "name": "Spicy beef stir-fry",
          "price": 15,
          "quantity": 2
        },
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 1
        },
        {
          "id": 9,
          "name": "Penne arrabbiata",
          "price": 9,
          "quantity": 3
        }
      ],
      "total": 103,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "completedTime": "0:56",
      "id": 2
    },
    {
      "promotion": 0,
      "nthOrderOfDay": 3,
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 3,
        "customerName": "Bob Johnson",
        "phone": "555-555-1212"
      },
      "cart": [
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 2
        },
        {
          "id": 4,
          "name": "Vegetable curry with rice",
          "price": 9,
          "quantity": 2
        },
        {
          "id": 5,
          "name": "Grilled chicken Caesar salad",
          "price": 8,
          "quantity": 2
        },
        {
          "id": 6,
          "name": "Margherita pizza",
          "price": 11,
          "quantity": 5
        }
      ],
      "total": 109,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "completedTime": "0:56",
      "id": 3
    },
    {
      "promotion": 0,
      "nthOrderOfDay": 4,
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 6,
        "customerName": "Sally Brown",
        "phone": "555-777-1212"
      },
      "cart": [
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 3
        },
        {
          "id": 4,
          "name": "Vegetable curry with rice",
          "price": 9,
          "quantity": 3
        },
        {
          "id": 5,
          "name": "Grilled chicken Caesar salad",
          "price": 8,
          "quantity": 4
        },
        {
          "id": 1,
          "name": "Orange chicken bowl",
          "price": 12,
          "quantity": 4
        },
        {
          "id": 10,
          "name": "Grilled vegetable sandwich",
          "price": 7,
          "quantity": 1
        }
      ],
      "total": 144,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "completedTime": "0:56",
      "id": 4
    },
    {
      "promotion": 0,
      "nthOrderOfDay": 5,
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 1,
        "customerName": "John Doe",
        "phone": "123-456-7890"
      },
      "cart": [
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 3
        },
        {
          "id": 4,
          "name": "Vegetable curry with rice",
          "price": 9,
          "quantity": 10
        }
      ],
      "total": 120,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "completedTime": "0:56",
      "id": 5
    },
    {
      "promotion": 0,
      "nthOrderOfDay": 6,
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 4,
        "customerName": "Alice Lee",
        "phone": "987-654-3210"
      },
      "cart": [
        {
          "id": 10,
          "name": "Grilled vegetable sandwich",
          "price": 7,
          "quantity": 4
        },
        {
          "id": 8,
          "name": "Beef burrito",
          "price": 13,
          "quantity": 6
        }
      ],
      "total": 106,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "completedTime": "0:56",
      "id": 6
    },
    {
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 8,
        "customerName": "Them Dang",
        "phone": "913-215-4632"
      },
      "cart": [
        {
          "id": 1,
          "name": "Orange chicken bowl",
          "price": 12,
          "quantity": 1
        },
        {
          "id": 2,
          "name": "Spicy beef stir-fry",
          "price": 15,
          "quantity": 1
        },
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 3
        }
      ],
      "total": 57,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "promotion": 0,
      "nthOrderOfDay": 7,
      "completedTime": "1:9",
      "id": 7
    },
    {
      "orderDate": "6/8/2023",
      "deliverDate": "6/8/2023",
      "customer": {
        "customerID": 9,
        "customerName": "Johny Tom Há land",
        "phone": "766-722-7545"
      },
      "cart": [
        {
          "id": 3,
          "name": "Teriyaki salmon sushi roll",
          "price": 10,
          "quantity": 2
        },
        {
          "id": 2,
          "name": "Spicy beef stir-fry",
          "price": 15,
          "quantity": 1
        },
        {
          "id": 1,
          "name": "Orange chicken bowl",
          "price": 12,
          "quantity": 1
        },
        {
          "id": 4,
          "name": "Vegetable curry with rice",
          "price": 9,
          "quantity": 2
        },
        {
          "id": 9,
          "name": "Penne arrabbiata",
          "price": 9,
          "quantity": 1
        },
        {
          "id": 10,
          "name": "Grilled vegetable sandwich",
          "price": 7,
          "quantity": 1
        },
        {
          "id": 8,
          "name": "Beef burrito",
          "price": 13,
          "quantity": 5
        }
      ],
      "total": 146,
      "paymentType": "Cash",
      "notes": "",
      "status": true,
      "promotion": 0,
      "nthOrderOfDay": 11,
      "completedTime": "11:48",
      "id": 11
    }
  ],
  "Customers": [
    {
      "customerName": "John Doe",
      "phone": "123-456-7890",
      "orderCount": 6,
      "totalSpent": 220,
      "registerationDate": "6/8/2023",
      "lastPurchase": "6/8/2023",
      "id": 1
    },
    {
      "customerName": "Jane Smith",
      "phone": "555-123-4567",
      "orderCount": 3,
      "totalSpent": 141,
      "registerationDate": "6/8/2023",
      "lastPurchase": "6/8/2023",
      "id": 2
    },
    {
      "customerName": "Bob Johnson",
      "phone": "555-555-1212",
      "orderCount": 4,
      "totalSpent": 184,
      "registerationDate": "6/8/2023",
      "lastPurchase": "6/8/2023",
      "id": 3
    },
    {
      "customerName": "Alice Lee",
      "phone": "987-654-3210",
      "orderCount": 2,
      "totalSpent": 131,
      "registerationDate": "6/8/2023",
      "lastPurchase": "6/8/2023",
      "id": 4
    },
    {
      "customerName": "Tom Green",
      "phone": "555-888-9999",
      "orderCount": 8,
      "totalSpent": 278,
      "registerationDate": "6/8/2023",
      "lastPurchase": "6/8/2023",
      "id": 5
    },
    {
      "customerName": "Sally Brown",
      "phone": "555-777-1212",
      "orderCount": 0,
      "totalSpent": 0,
      "lastPurchase": "",
      "registerationDate": "",
      "id": 6
    },
    {
      "id": 7,
      "customerName": "Jim Black",
      "phone": "123-456-1230",
      "orderCount": 5,
      "totalSpent": 100,
      "registerationDate": "6/8/2023"
    },
    {
      "customerName": "Them Dang",
      "phone": "913-215-4632",
      "orderCount": 0,
      "totalSpent": 0,
      "lastPurchase": "",
      "registerationDate": "",
      "id": 8
    },
    {
      "customerName": "Johny Tom Há land",
      "phone": "766-722-7545",
      "orderCount": 1,
      "totalSpent": 146,
      "lastPurchase": "6/8/2023",
      "registerationDate": "6/8/2023",
      "id": 9
    }
  ],
  "IncomeUpToDate": [
    {
      "Date": "6/8/2023",
      "Total": 2804,
      "UpdateTime": 1686250114729,
      "id": 1
    }
  ],
  "ItemCount": [
    {
      "Count": 85,
      "id": "6/8/2023"
    }
  ]
}

export default serverData;