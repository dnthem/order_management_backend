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

  
  export default sampleData;
  