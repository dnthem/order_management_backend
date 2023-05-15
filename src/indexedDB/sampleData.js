const sampleData = {
    Menu: [
      {
        Title: "Bánh Tráng Trộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Bánh Tráng Cuộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Trứng Nướng",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Bắp Xào",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Sữa Bắp",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
       
      },
      {
        Title: "Xôi Xá Xíu",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
    ],
    Orders: [
      {
        Date: new Date().toLocaleDateString("en-us"),
        ItemKeys: [1, 2],
        ItemNames: ["Banh Trang Tron", "Banh Trang Nuong"],
        Prices: [12, 12],
        Quantities: [1, 1],
        Totals: [12, 12],
        IsComplete: false,
        
      },
    ],
    Income: [
      {
        Date: new Date(2022,11,31).toLocaleDateString('en-us'),
        Income: 128
      },
      {
        Date: new Date(2023,0,1).toLocaleDateString('en-us'),
        Income: 128
      },
      {
        Date: new Date(2023,0,2).toLocaleDateString('en-us'),
        Income: 80
      },
      {
        Date: new Date(2023,0,3).toLocaleDateString('en-us'),
        Income: 140
      },
      {
        Date: new Date(2023,0,4).toLocaleDateString('en-us'),
        Income: 180
      },
      {
        Date: new Date(2023,0,5).toLocaleDateString('en-us'),
        Income: 350
      },
      {
        Date: new Date(2023,0,6).toLocaleDateString('en-us'),
        Income: 145
      },
      {
        Date: new Date(2023,0,7).toLocaleDateString('en-us'),
        Income: 100
      },
      {
        Date: new Date(2023,0,8).toLocaleDateString('en-us'),
        Income: 250
      },
      {
        Date: new Date(2023,0,9).toLocaleDateString('en-us'),
        Income: 175
      },
      {
        Date: new Date(2023,0,10).toLocaleDateString('en-us'),
        Income: 270
      },
    ],
    OrdersV2: [
      {
      "orderID": 1,
      "customer": {
        "customerID": 1,
        "customerName": "John Doe",
        "phone": "123-456-7890"
      },
      "date": new Date().toLocaleDateString('en-us'),
      "order": [
        ["Item A", 1],
        ["Item B", 2],
        ["Item C", 3]
      ],
      "total": 150.25,
      "paymentType": "Credit Card",
      "notes": "Delivery address: 123 Main St, Anytown, USA",
      "status": false
    },
    {
      "orderID": 2,
      "customer": {
        "customerID": 2,
        "customerName": "Jane Smith",
        "phone": "555-123-4567"
      },
      "date": new Date().toLocaleDateString('en-us'),
      "order": [
        ["Item A", 2],
        ["Item C", 1],
        ["Item D", 4]
      ],
      "total": 225.75,
      "paymentType": "PayPal",
      "notes": "Delivery address: 456 Oak St, Anytown, USA",
      "status": false
    },
    {
      "orderID": 3,
      "customer": {
        "customerID": 3,
        "customerName": "Bob Johnson",
        "phone": "555-555-1212"
      },
      "date": new Date().toLocaleDateString('en-us'),
      "order": [
        ["Item B", 3],
        ["Item C", 2],
        ["Item E", 2],
        ["Item C", 2],
        ["Item C", 2],
      ],
      "total": 175.50,
      "paymentType": "Credit Card",
      "notes": "Delivery address: 789 Maple St, Anytown, USA",
      "status": false
    },
    {
      "orderID": 4,
      "customer": {
        "customerID": 1,
        "customerName": "Alice Smith",
        "phone": "555-555-1212"
      },
      "date": new Date().toLocaleDateString('en-us'),
      "order": [
        ["Item A", 2],
        ["Item B", 1],
        ["Item D", 1],
        ["Item F", 3]
      ],
      "total": 97.25,
      "paymentType": "Cash",
      "notes": "Delivery address: 123 Main St, Anytown, USA",
      "status": false
    },
    {
      "orderID": 5,
      "customer": {
        "customerID": 2,
        "customerName": "John Doe",
        "phone": "555-555-1212"
      },
      "date": new Date().toLocaleDateString('en-us'),
      "order": [
        ["Item C", 2],
        ["Item E", 1],
        ["Item F", 1]
      ],
      "total": 45.75,
      "paymentType": "Credit Card",
      "notes": "Delivery address: 456 Oak St, Anytown, USA",
      "status": false
    },
    {
      "orderID": 6,
      "customer": {
        "customerID": 3,
        "customerName": "Jane Smith",
        "phone": "555-555-1212"
      },
      "date": new Date().toLocaleDateString('en-us'), 
      "order": [
        ["Item A", 1],
        ["Item B", 1],
        ["Item C", 1],
        ["Item D", 1],
        ["Item E", 1],
      ],
      "total": 75.25,
      "paymentType": "PayPal",
      "notes": "Delivery address: 789 Maple St, Anytown, USA",
      "status": false

    }
  ],
    Customers : [
      {
        customerID: 1,
        customerName: "John Doe",
        phone: "123-456-7890",
        orderCount: 5,
      },
      {
        customerID: 2,
        customerName: "Jane Smith",
        phone: "555-123-4567",
        orderCount: 2,
      },
      {
        customerID: 3,
        customerName: "Bob Johnson",
        phone: "555-555-1212",
        orderCount: 3,
      },
      {
        customerID: 4,
        customerName: "Alice Lee",
        phone: "987-654-3210",
        orderCount: 1,
      },
      {
        customerID: 5,
        customerName: "Tom Green",
        phone: "555-888-9999",
        orderCount: 7,
      },
      {
        customerID: 6,
        customerName: "Sally Brown",
        phone: "555-777-1212",
        orderCount: 2,
      },
      {
        customerID: 7,
        customerName: "Jim Black",
        phone: "123-456-7890",
        orderCount: 5,
      }
    ]
  };

  
  export default sampleData;
  